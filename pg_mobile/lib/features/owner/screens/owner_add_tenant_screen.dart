import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../core/widgets/app_shell.dart';
import '../../../models/room.dart';
import '../../../models/tenant.dart';
import '../../../providers/app_providers.dart';
import '../../../repositories/data_repositories.dart';

class OwnerAddTenantScreen extends ConsumerStatefulWidget {
  const OwnerAddTenantScreen({super.key});

  @override
  ConsumerState<OwnerAddTenantScreen> createState() =>
      _OwnerAddTenantScreenState();
}

class _OwnerAddTenantScreenState extends ConsumerState<OwnerAddTenantScreen> {
  final _phoneController = TextEditingController();
  List<SearchTenant> _results = [];
  List<Room> _rooms = [];
  SearchTenant? _selectedUser;
  Room? _selectedRoom;
  bool _searching = false;
  bool _loading = false;
  String? _error;

  @override
  void initState() {
    super.initState();
    _loadRooms();
  }

  @override
  void dispose() {
    _phoneController.dispose();
    super.dispose();
  }

  Future<void> _loadRooms() async {
    try {
      final rooms = await ref.read(ownerRoomsApiProvider).listRooms();
      setState(() {
        _rooms = rooms.where((r) => r.status != 'full').toList();
      });
    } catch (_) {}
  }

  Future<void> _search() async {
    final q = _phoneController.text.replaceAll(RegExp(r'\D'), '');
    if (q.length < 3) {
      setState(() => _error = 'Enter at least 3 digits to search');
      return;
    }

    setState(() {
      _searching = true;
      _error = null;
    });

    try {
      final response = await ref.read(ownerTenantsApiProvider).searchTenants(
            query: _phoneController.text,
          );
      setState(() => _results = response.results);
    } catch (e) {
      setState(() => _error = e.toString());
    } finally {
      if (mounted) setState(() => _searching = false);
    }
  }

  Future<void> _assign() async {
    if (_selectedUser == null || _selectedRoom == null) {
      setState(() => _error = 'Select a tenant and room');
      return;
    }

    setState(() {
      _loading = true;
      _error = null;
    });

    try {
      await ref.read(ownerTenantsApiProvider).addTenant(
            userId: _selectedUser!.uid,
            roomId: _selectedRoom!.id,
          );
      await ref.read(tenantsRepositoryProvider).clearCache();
      ref.invalidate(tenantsListProvider);
      ref.invalidate(roomsListProvider);
      if (mounted) context.pop();
    } catch (e) {
      setState(() => _error = e.toString());
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return AppShell(
      title: 'Assign tenant',
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            TextField(
              controller: _phoneController,
              decoration: InputDecoration(
                labelText: 'Search by phone',
                border: const OutlineInputBorder(),
                suffixIcon: IconButton(
                  icon: const Icon(Icons.search),
                  onPressed: _searching ? null : _search,
                ),
              ),
              keyboardType: TextInputType.phone,
            ),
            if (_searching) const LinearProgressIndicator(),
            const SizedBox(height: 12),
            ..._results.map(
              (user) => ListTile(
                title: Text(user.name),
                subtitle: Text(user.phone ?? user.email ?? ''),
                selected: _selectedUser?.uid == user.uid,
                onTap: () => setState(() => _selectedUser = user),
                tileColor: _selectedUser?.uid == user.uid
                    ? Theme.of(context).colorScheme.primaryContainer
                    : null,
              ),
            ),
            const SizedBox(height: 16),
            Text(
              'Select room',
              style: Theme.of(context).textTheme.titleSmall,
            ),
            const SizedBox(height: 8),
            Wrap(
              spacing: 8,
              runSpacing: 8,
              children: _rooms.map((room) {
                final selected = _selectedRoom?.id == room.id;
                return FilterChip(
                  label: Text(room.roomNumber),
                  selected: selected,
                  onSelected: (_) => setState(() => _selectedRoom = room),
                );
              }).toList(),
            ),
            if (_error != null) ...[
              const SizedBox(height: 12),
              Text(
                _error!,
                style: TextStyle(color: Theme.of(context).colorScheme.error),
              ),
            ],
            const SizedBox(height: 24),
            FilledButton(
              onPressed: _loading ? null : _assign,
              child: _loading
                  ? const SizedBox(
                      height: 20,
                      width: 20,
                      child: CircularProgressIndicator(strokeWidth: 2),
                    )
                  : const Text('Assign to room'),
            ),
          ],
        ),
      ),
    );
  }
}
