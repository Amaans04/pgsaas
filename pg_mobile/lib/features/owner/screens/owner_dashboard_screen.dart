import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:intl/intl.dart';

import '../../../core/widgets/app_shell.dart';
import '../../../core/widgets/async_state.dart';
import '../../../models/payment.dart';
import '../../../models/room.dart';
import '../../../providers/app_providers.dart';

class OwnerDashboardScreen extends ConsumerWidget {
  const OwnerDashboardScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final summaryAsync = ref.watch(paymentSummaryProvider);
    final roomsAsync = ref.watch(roomsListProvider);
    final tenantsAsync = ref.watch(tenantsListProvider);
    final cleaningAsync = ref.watch(cleaningProvider);
    final profile = ref.watch(profileProvider).valueOrNull;

    return AppShell(
      title: profile?.pg?.name ?? 'Dashboard',
      body: summaryAsync.when(
        loading: () => const LoadingView(),
        error: (e, _) => ErrorView(
          message: e.toString(),
          onRetry: () => ref.invalidate(paymentSummaryProvider),
        ),
        data: (summary) {
          return roomsAsync.when(
            loading: () => const LoadingView(),
            error: (e, _) => ErrorView(message: e.toString()),
            data: (roomsRaw) {
              final rooms = roomsRaw.cast<Room>();
              final totalBeds =
                  rooms.fold<int>(0, (s, r) => s + r.sharingCapacity);
              final occupied =
                  rooms.fold<int>(0, (s, r) => s + r.currentOccupancy);
              final occupancyPct =
                  totalBeds > 0 ? ((occupied / totalBeds) * 100).round() : 0;

              final paymentSummary = summary as PaymentSummary;
              final unpaidCount = paymentSummary.tenantBreakdown
                  .where((t) => t.status != 'paid')
                  .length;
              final pendingCleaning =
                  cleaningAsync.valueOrNull?.pendingCount ?? 0;
              final tenantCount = tenantsAsync.valueOrNull?.length ?? 0;
              final fmt = NumberFormat.decimalPattern('en_IN');

              return RefreshIndicator(
                onRefresh: () async {
                  ref.invalidate(paymentSummaryProvider);
                  ref.invalidate(roomsListProvider);
                  ref.invalidate(tenantsListProvider);
                  await ref.read(cleaningProvider.notifier).refresh();
                },
                child: ListView(
                  padding: const EdgeInsets.all(16),
                  children: [
                    Row(
                      children: [
                        Expanded(
                          child: StatCard(
                            label: 'Collected',
                            value: '₹${fmt.format(paymentSummary.totalPaid)}',
                            color: Theme.of(context).colorScheme.primary,
                          ),
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          child: StatCard(
                            label: 'Pending',
                            value: '₹${fmt.format(paymentSummary.totalPending)}',
                            color: Theme.of(context).colorScheme.error,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 12),
                    Row(
                      children: [
                        Expanded(
                          child: StatCard(
                            label: 'Occupancy',
                            value: '$occupancyPct%',
                          ),
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          child: StatCard(
                            label: 'Unpaid tenants',
                            value: '$unpaidCount',
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 12),
                    Row(
                      children: [
                        Expanded(
                          child: StatCard(
                            label: 'Tenants',
                            value: '$tenantCount',
                          ),
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          child: StatCard(
                            label: 'Cleaning alerts',
                            value: '$pendingCleaning',
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 24),
                    Card(
                      child: Padding(
                        padding: const EdgeInsets.all(16),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'Revenue this month',
                              style: Theme.of(context).textTheme.titleMedium,
                            ),
                            const SizedBox(height: 16),
                            SizedBox(
                              height: 200,
                              child: BarChart(
                                BarChartData(
                                  alignment: BarChartAlignment.spaceAround,
                                  maxY: [
                                    paymentSummary.totalPaid.toDouble(),
                                    paymentSummary.totalPending.toDouble(),
                                  ].reduce((a, b) => a > b ? a : b) *
                                      1.2 +
                                      1,
                                  barTouchData: BarTouchData(enabled: false),
                                  titlesData: FlTitlesData(
                                    bottomTitles: AxisTitles(
                                      sideTitles: SideTitles(
                                        showTitles: true,
                                        getTitlesWidget: (value, meta) {
                                          const labels = ['Collected', 'Pending'];
                                          final index = value.toInt();
                                          if (index < 0 || index >= labels.length) {
                                            return const SizedBox.shrink();
                                          }
                                          return Padding(
                                            padding: const EdgeInsets.only(top: 8),
                                            child: Text(labels[index]),
                                          );
                                        },
                                      ),
                                    ),
                                    leftTitles: const AxisTitles(
                                      sideTitles: SideTitles(showTitles: false),
                                    ),
                                    topTitles: const AxisTitles(
                                      sideTitles: SideTitles(showTitles: false),
                                    ),
                                    rightTitles: const AxisTitles(
                                      sideTitles: SideTitles(showTitles: false),
                                    ),
                                  ),
                                  gridData: const FlGridData(show: false),
                                  borderData: FlBorderData(show: false),
                                  barGroups: [
                                    BarChartGroupData(
                                      x: 0,
                                      barRods: [
                                        BarChartRodData(
                                          toY: paymentSummary.totalPaid.toDouble(),
                                          color: Theme.of(context).colorScheme.primary,
                                          width: 40,
                                          borderRadius: const BorderRadius.vertical(
                                            top: Radius.circular(6),
                                          ),
                                        ),
                                      ],
                                    ),
                                    BarChartGroupData(
                                      x: 1,
                                      barRods: [
                                        BarChartRodData(
                                          toY: paymentSummary.totalPending.toDouble(),
                                          color: Theme.of(context).colorScheme.error,
                                          width: 40,
                                          borderRadius: const BorderRadius.vertical(
                                            top: Radius.circular(6),
                                          ),
                                        ),
                                      ],
                                    ),
                                  ],
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                    const SizedBox(height: 16),
                    Wrap(
                      spacing: 8,
                      runSpacing: 8,
                      children: [
                        _NavChip(
                          label: 'Rooms',
                          onTap: () => context.push('/owner/rooms'),
                        ),
                        _NavChip(
                          label: 'Tenants',
                          onTap: () => context.push('/owner/tenants'),
                        ),
                        _NavChip(
                          label: 'Payments',
                          onTap: () => context.push('/owner/payments'),
                        ),
                        _NavChip(
                          label: 'Staff',
                          onTap: () => context.push('/owner/staff'),
                        ),
                        _NavChip(
                          label: 'Complaints',
                          onTap: () => context.push('/owner/complaints'),
                        ),
                        _NavChip(
                          label: 'Documents',
                          onTap: () => context.push('/owner/documents'),
                        ),
                      ],
                    ),
                  ],
                ),
              );
            },
          );
        },
      ),
    );
  }
}

class _NavChip extends StatelessWidget {
  const _NavChip({required this.label, required this.onTap});

  final String label;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return ActionChip(label: Text(label), onPressed: onTap);
  }
}
