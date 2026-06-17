import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/widgets/app_shell.dart';
import '../../../core/widgets/async_state.dart';
import '../../../models/room.dart';
import '../../../providers/app_providers.dart';
import '../../../repositories/data_repositories.dart';

class OwnerRoomDetailScreen extends ConsumerStatefulWidget {
  const OwnerRoomDetailScreen({super.key, required this.roomId});

  final String roomId;

  @override
  ConsumerState<OwnerRoomDetailScreen> createState() =>
      _OwnerRoomDetailScreenState();
}

class _OwnerRoomDetailScreenState extends ConsumerState<OwnerRoomDetailScreen> {
  RoomDetailResponse? _detail;
  bool _loading = true;
  bool _saving = false;
  String? _error;

  final _roomNumberController = TextEditingController();
  final _roomTypeController = TextEditingController();
  final _capacityController = TextEditingController();
  final _rentController = TextEditingController();
  final Map<String, String> _moveTargets = {};
  String _addTenantId = '';

  @override
  void initState() {
    super.initState();
    _load();
  }

  @override
  void dispose() {
    _roomNumberController.dispose();
    _roomTypeController.dispose();
    _capacityController.dispose();
    _rentController.dispose();
    super.dispose();
  }

  Future<void> _load() async {
    setState(() {
      _loading = true;
      _error = null;
    });

    try {
      final detail =
          await ref.read(ownerRoomsApiProvider).roomDetail(widget.roomId);
      _detail = detail;
      final room = detail.room;
      _roomNumberController.text = room.roomNumber;
      _roomTypeController.text = room.roomType ?? '';
      _capacityController.text = '${room.sharingCapacity}';
      _rentController.text = '${room.rentAmount}';
    } catch (e) {
      _error = e.toString();
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  Future<void> _saveDetails() async {
    setState(() => _saving = true);
    try {
      await ref.read(ownerRoomsApiProvider).updateRoom(
            roomId: widget.roomId,
            roomNumber: _roomNumberController.text.trim(),
            roomType: _roomTypeController.text.trim().isEmpty
                ? null
                : _roomTypeController.text.trim(),
            sharingCapacity: int.parse(_capacityController.text),
            rentAmount: num.parse(_rentController.text),
          );
      ref.invalidate(roomsListProvider);
      await _load();
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Room updated')),
        );
      }
    } catch (e) {
      setState(() => _error = e.toString());
    } finally {
      if (mounted) setState(() => _saving = false);
    }
  }

  Future<void> _memberAction({
    required String action,
    String? tenantId,
    String? targetRoomId,
  }) async {
    setState(() => _saving = true);
    try {
      await ref.read(ownerRoomsApiProvider).roomMembers(
            action: action,
            roomId: widget.roomId,
            tenantId: tenantId,
            targetRoomId: targetRoomId,
          );
      ref.invalidate(roomsListProvider);
      ref.invalidate(tenantsListProvider);
      setState(() => _addTenantId = '');
      await _load();
    } catch (e) {
      setState(() => _error = e.toString());
    } finally {
      if (mounted) setState(() => _saving = false);
    }
  }

  Future<void> _removeMember(RoomMember member) async {
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Remove tenant?'),
        content: Text(
          'Remove ${member.name} from this room? They stay in your PG and can be reassigned.',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx, false),
            child: const Text('Cancel'),
          ),
          FilledButton(
            onPressed: () => Navigator.pop(ctx, true),
            child: const Text('Remove'),
          ),
        ],
      ),
    );

    if (confirmed == true) {
      await _memberAction(action: 'remove', tenantId: member.uid);
    }
  }

  @override
  Widget build(BuildContext context) {
    final detail = _detail;

    return AppShell(
      title: detail != null ? 'Room ${detail.room.roomNumber}' : 'Room',
      body: _loading
          ? const LoadingView()
          : _error != null && detail == null
              ? ErrorView(message: _error!, onRetry: _load)
              : detail == null
                  ? const EmptyView(message: 'Room not found')
                  : RefreshIndicator(
                      onRefresh: _load,
                      child: ListView(
                        padding: const EdgeInsets.all(16),
                        children: [
                          if (_error != null)
                            Padding(
                              padding: const EdgeInsets.only(bottom: 12),
                              child: Text(
                                _error!,
                                style: TextStyle(
                                  color: Theme.of(context).colorScheme.error,
                                ),
                              ),
                            ),
                          Card(
                            child: Padding(
                              padding: const EdgeInsets.all(16),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.stretch,
                                children: [
                                  Text(
                                    'Room details',
                                    style:
                                        Theme.of(context).textTheme.titleMedium,
                                  ),
                                  const SizedBox(height: 12),
                                  TextField(
                                    controller: _roomNumberController,
                                    decoration: const InputDecoration(
                                      labelText: 'Room number',
                                      border: OutlineInputBorder(),
                                    ),
                                  ),
                                  const SizedBox(height: 12),
                                  TextField(
                                    controller: _roomTypeController,
                                    decoration: const InputDecoration(
                                      labelText: 'Room type',
                                      border: OutlineInputBorder(),
                                    ),
                                  ),
                                  const SizedBox(height: 12),
                                  TextField(
                                    controller: _capacityController,
                                    decoration: InputDecoration(
                                      labelText: 'Sharing capacity',
                                      helperText:
                                          'Min ${detail.members.length} (current members)',
                                      border: const OutlineInputBorder(),
                                    ),
                                    keyboardType: TextInputType.number,
                                  ),
                                  const SizedBox(height: 12),
                                  TextField(
                                    controller: _rentController,
                                    decoration: const InputDecoration(
                                      labelText: 'Rent per tenant (₹)',
                                      border: OutlineInputBorder(),
                                    ),
                                    keyboardType: TextInputType.number,
                                  ),
                                  const SizedBox(height: 16),
                                  FilledButton(
                                    onPressed: _saving ? null : _saveDetails,
                                    child: Text(
                                      _saving ? 'Saving...' : 'Save details',
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                          const SizedBox(height: 16),
                          Text(
                            'Members (${detail.members.length}/${detail.room.sharingCapacity})',
                            style: Theme.of(context).textTheme.titleMedium,
                          ),
                          const SizedBox(height: 8),
                          if (detail.members.isEmpty)
                            const Text('No tenants in this room yet.'),
                          ...detail.members.map((member) {
                            return Card(
                              margin: const EdgeInsets.only(bottom: 12),
                              child: Padding(
                                padding: const EdgeInsets.all(12),
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      member.name,
                                      style: const TextStyle(
                                        fontWeight: FontWeight.w600,
                                      ),
                                    ),
                                    Text(
                                      '${member.phone ?? ''} · ${member.email ?? ''}',
                                      style:
                                          Theme.of(context).textTheme.bodySmall,
                                    ),
                                    const SizedBox(height: 8),
                                    DropdownMenu<String>(
                                      label: const Text('Move to'),
                                      dropdownMenuEntries: detail.otherRooms
                                          .where((r) => r.available)
                                          .map(
                                            (r) => DropdownMenuEntry(
                                              value: r.id,
                                              label:
                                                  'Room ${r.roomNumber} (${r.currentOccupancy}/${r.sharingCapacity})',
                                            ),
                                          )
                                          .toList(),
                                      onSelected: (value) {
                                        if (value != null) {
                                          _moveTargets[member.uid] = value;
                                        }
                                      },
                                    ),
                                    const SizedBox(height: 8),
                                    Row(
                                      children: [
                                        OutlinedButton(
                                          onPressed: _saving
                                              ? null
                                              : () {
                                                  final target =
                                                      _moveTargets[member.uid];
                                                  if (target == null) {
                                                    ScaffoldMessenger.of(
                                                      context,
                                                    ).showSnackBar(
                                                      const SnackBar(
                                                        content: Text(
                                                          'Select a target room',
                                                        ),
                                                      ),
                                                    );
                                                    return;
                                                  }
                                                  _memberAction(
                                                    action: 'move',
                                                    tenantId: member.uid,
                                                    targetRoomId: target,
                                                  );
                                                },
                                          child: const Text('Move'),
                                        ),
                                        const SizedBox(width: 8),
                                        TextButton(
                                          onPressed: _saving
                                              ? null
                                              : () => _removeMember(member),
                                          child: const Text('Remove'),
                                        ),
                                      ],
                                    ),
                                  ],
                                ),
                              ),
                            );
                          }),
                          if (detail.members.length <
                              detail.room.sharingCapacity) ...[
                            const SizedBox(height: 8),
                            DropdownMenu<String>(
                              label: const Text('Add tenant'),
                              dropdownMenuEntries: detail.assignable
                                  .map(
                                    (t) => DropdownMenuEntry(
                                      value: t.uid,
                                      label: '${t.name} — ${t.phone ?? ''}',
                                    ),
                                  )
                                  .toList(),
                              onSelected: (value) {
                                if (value != null) {
                                  setState(() => _addTenantId = value);
                                }
                              },
                            ),
                            const SizedBox(height: 8),
                            FilledButton(
                              onPressed: _saving || _addTenantId.isEmpty
                                  ? null
                                  : () => _memberAction(
                                        action: 'add',
                                        tenantId: _addTenantId,
                                      ),
                              child: const Text('Add to room'),
                            ),
                          ],
                        ],
                      ),
                    ),
    );
  }
}
