import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:intl/intl.dart';

import '../../../core/constants/app_strings.dart';
import '../../../core/widgets/app_shell.dart';
import '../../../core/widgets/async_state.dart';
import '../../../models/room.dart';
import '../../../providers/app_providers.dart';
import '../../../repositories/data_repositories.dart';

class OwnerRoomsScreen extends ConsumerWidget {
  const OwnerRoomsScreen({super.key});

  Future<void> _showCreateDialog(BuildContext context, WidgetRef ref) async {
    final roomNumberController = TextEditingController();
    final roomTypeController = TextEditingController();
    final capacityController = TextEditingController(text: '2');
    final rentController = TextEditingController();

    final created = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Add room'),
        content: SingleChildScrollView(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              TextField(
                controller: roomNumberController,
                decoration: const InputDecoration(
                  labelText: 'Room number',
                  border: OutlineInputBorder(),
                ),
              ),
              const SizedBox(height: 12),
              TextField(
                controller: roomTypeController,
                decoration: const InputDecoration(
                  labelText: 'Room type (optional)',
                  border: OutlineInputBorder(),
                ),
              ),
              const SizedBox(height: 12),
              TextField(
                controller: capacityController,
                decoration: const InputDecoration(
                  labelText: 'Sharing capacity',
                  border: OutlineInputBorder(),
                ),
                keyboardType: TextInputType.number,
              ),
              const SizedBox(height: 12),
              TextField(
                controller: rentController,
                decoration: const InputDecoration(
                  labelText: 'Monthly rent (₹)',
                  border: OutlineInputBorder(),
                ),
                keyboardType: TextInputType.number,
              ),
            ],
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx, false),
            child: const Text('Cancel'),
          ),
          FilledButton(
            onPressed: () => Navigator.pop(ctx, true),
            child: const Text('Create'),
          ),
        ],
      ),
    );

    if (created != true) return;

    try {
      await ref.read(ownerRoomsApiProvider).createRoom(
            roomNumber: roomNumberController.text.trim(),
            roomType: roomTypeController.text.trim().isEmpty
                ? null
                : roomTypeController.text.trim(),
            sharingCapacity: int.parse(capacityController.text),
            rentAmount: num.parse(rentController.text),
          );
      ref.invalidate(roomsListProvider);
    } catch (e) {
      if (context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(e.toString())),
        );
      }
    }
  }

  Future<void> _confirmDelete(
    BuildContext context,
    WidgetRef ref,
    Room room,
  ) async {
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Delete room?'),
        content: Text('Remove room ${room.roomNumber}?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx, false),
            child: const Text('Cancel'),
          ),
          FilledButton(
            onPressed: () => Navigator.pop(ctx, true),
            child: const Text('Delete'),
          ),
        ],
      ),
    );

    if (confirmed != true) return;

    try {
      await ref.read(ownerRoomsApiProvider).deleteRoom(room.id);
      ref.invalidate(roomsListProvider);
    } catch (e) {
      if (context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(e.toString())),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final roomsAsync = ref.watch(roomsListProvider);
    final fmt = NumberFormat.decimalPattern('en_IN');

    return AppShell(
      title: 'Rooms',
      actions: [
        IconButton(
          icon: const Icon(Icons.add),
          onPressed: () => _showCreateDialog(context, ref),
        ),
      ],
      body: roomsAsync.when(
        loading: () => const LoadingView(),
        error: (e, _) => ErrorView(
          message: e.toString(),
          onRetry: () => ref.invalidate(roomsListProvider),
        ),
        data: (roomsRaw) {
          final rooms = roomsRaw.cast<Room>();
          if (rooms.isEmpty) {
            return const EmptyView(message: AppStrings.emptyRooms);
          }

          return RefreshIndicator(
            onRefresh: () async => ref.invalidate(roomsListProvider),
            child: ListView.builder(
              padding: const EdgeInsets.all(16),
              itemCount: rooms.length,
              itemBuilder: (context, index) {
                final room = rooms[index];
                return Card(
                  margin: const EdgeInsets.only(bottom: 12),
                  child: ListTile(
                    title: Text('Room ${room.roomNumber}'),
                    subtitle: Text(
                      '${room.currentOccupancy}/${room.sharingCapacity} occupied · ₹${fmt.format(room.rentAmount)}/mo',
                    ),
                    trailing: PopupMenuButton<String>(
                      onSelected: (value) {
                        if (value == 'detail') {
                          context.push('/owner/rooms/${room.id}');
                        } else if (value == 'delete') {
                          _confirmDelete(context, ref, room);
                        }
                      },
                      itemBuilder: (_) => const [
                        PopupMenuItem(value: 'detail', child: Text('Manage')),
                        PopupMenuItem(value: 'delete', child: Text('Delete')),
                      ],
                    ),
                    onTap: () => context.push('/owner/rooms/${room.id}'),
                  ),
                );
              },
            ),
          );
        },
      ),
    );
  }
}
