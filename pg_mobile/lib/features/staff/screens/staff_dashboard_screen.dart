import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../core/widgets/app_shell.dart';
import '../../../core/widgets/async_state.dart';
import '../../../models/room.dart';
import '../../../providers/app_providers.dart';

class StaffDashboardScreen extends ConsumerWidget {
  const StaffDashboardScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final roomsAsync = ref.watch(roomsListProvider);
    final cleaningAsync = ref.watch(cleaningProvider);

    return AppShell(
      title: 'Staff dashboard',
      body: roomsAsync.when(
        loading: () => const LoadingView(),
        error: (e, _) => ErrorView(
          message: e.toString(),
          onRetry: () => ref.invalidate(roomsListProvider),
        ),
        data: (roomsRaw) {
          final rooms = roomsRaw.cast<Room>();
          final totalBeds =
              rooms.fold<int>(0, (s, r) => s + r.sharingCapacity);
          final occupied =
              rooms.fold<int>(0, (s, r) => s + r.currentOccupancy);
          final vacantRooms =
              rooms.where((r) => r.status == 'vacant').length;
          final occupancyRate =
              totalBeds > 0 ? ((occupied / totalBeds) * 100).round() : 0;
          final pendingCleaning =
              cleaningAsync.valueOrNull?.pendingCount ?? 0;

          return RefreshIndicator(
            onRefresh: () async {
              ref.invalidate(roomsListProvider);
              await ref.read(cleaningProvider.notifier).refresh();
            },
            child: ListView(
              padding: const EdgeInsets.all(16),
              children: [
                Text(
                  'Occupancy overview',
                  style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                        fontWeight: FontWeight.bold,
                      ),
                ),
                const SizedBox(height: 16),
                Row(
                  children: [
                    Expanded(
                      child: StatCard(
                        label: 'Occupied beds',
                        value: '$occupied/$totalBeds',
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: StatCard(
                        label: 'Vacant rooms',
                        value: '$vacantRooms',
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 12),
                Row(
                  children: [
                    Expanded(
                      child: StatCard(
                        label: 'Total rooms',
                        value: '${rooms.length}',
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: StatCard(
                        label: 'Occupancy rate',
                        value: '$occupancyRate%',
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 12),
                StatCard(
                  label: 'Pending cleaning',
                  value: '$pendingCleaning',
                ),
                const SizedBox(height: 24),
                Wrap(
                  spacing: 8,
                  runSpacing: 8,
                  children: [
                    ActionChip(
                      label: const Text('Complaints'),
                      onPressed: () => context.push('/staff/complaints'),
                    ),
                    ActionChip(
                      label: const Text('Cleaning'),
                      onPressed: () => context.push('/staff/cleaning'),
                    ),
                  ],
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}
