import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:intl/intl.dart';

import '../../../core/constants/app_strings.dart';
import '../../../core/widgets/app_shell.dart';
import '../../../core/widgets/async_state.dart';
import '../../../models/tenant.dart';
import '../../../providers/app_providers.dart';
import '../../../repositories/data_repositories.dart';

class OwnerTenantsScreen extends ConsumerStatefulWidget {
  const OwnerTenantsScreen({super.key});

  @override
  ConsumerState<OwnerTenantsScreen> createState() => _OwnerTenantsScreenState();
}

class _OwnerTenantsScreenState extends ConsumerState<OwnerTenantsScreen> {
  final _searchController = TextEditingController();
  final Map<String, String> _noticeDates = {};

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  Future<void> _giveNotice(Tenant tenant) async {
    final date = _noticeDates[tenant.uid];
    if (date == null || date.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Pick a move-out date first')),
      );
      return;
    }

    try {
      await ref.read(ownerTenantsApiProvider).giveNotice(
            tenantId: tenant.uid,
            moveOutDate: date,
          );
      ref.invalidate(tenantsListProvider);
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Notice recorded')),
        );
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(e.toString())),
        );
      }
    }
  }

  Future<void> _confirmMoveout(Tenant tenant) async {
    try {
      await ref.read(ownerTenantsApiProvider).confirmMoveout(tenant.uid);
      ref.invalidate(tenantsListProvider);
      ref.invalidate(roomsListProvider);
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Move-out confirmed')),
        );
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(e.toString())),
        );
      }
    }
  }

  Future<void> _deleteTenant(Tenant tenant) async {
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Remove tenant?'),
        content: Text(
          'Remove ${tenant.name} from your PG? Their account stays — they can be added again later.',
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

    if (confirmed != true) return;

    try {
      await ref.read(ownerTenantsApiProvider).removeTenant(tenant.uid);
      ref.invalidate(tenantsListProvider);
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('${tenant.name} removed')),
        );
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(e.toString())),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final tenantsAsync = ref.watch(tenantsListProvider);
    final query = _searchController.text.toLowerCase();
    final fmt = NumberFormat.decimalPattern('en_IN');

    return AppShell(
      title: 'Tenants',
      actions: [
        IconButton(
          icon: const Icon(Icons.person_add),
          onPressed: () => context.push('/owner/add-tenant'),
        ),
      ],
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(16),
            child: TextField(
              controller: _searchController,
              decoration: const InputDecoration(
                labelText: 'Search by name or phone',
                prefixIcon: Icon(Icons.search),
                border: OutlineInputBorder(),
              ),
              onChanged: (_) => setState(() {}),
            ),
          ),
          Expanded(
            child: tenantsAsync.when(
              loading: () => const LoadingView(),
              error: (e, _) => ErrorView(
                message: e.toString(),
                onRetry: () => ref.invalidate(tenantsListProvider),
              ),
              data: (tenantsRaw) {
                final tenants = tenantsRaw
                    .cast<Tenant>()
                    .where((t) => t.status != 'moved_out')
                    .where((t) {
                      if (query.isEmpty) return true;
                      return (t.name.toLowerCase().contains(query)) ||
                          (t.phone ?? '').contains(query.replaceAll(' ', ''));
                    })
                    .toList();

                if (tenants.isEmpty) {
                  return const EmptyView(message: AppStrings.emptyTenants);
                }

                return RefreshIndicator(
                  onRefresh: () async => ref.invalidate(tenantsListProvider),
                  child: ListView.builder(
                    padding: const EdgeInsets.symmetric(horizontal: 16),
                    itemCount: tenants.length,
                    itemBuilder: (context, index) {
                      final tenant = tenants[index];
                      return Card(
                        margin: const EdgeInsets.only(bottom: 12),
                        child: Padding(
                          padding: const EdgeInsets.all(16),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Row(
                                children: [
                                  Expanded(
                                    child: Column(
                                      crossAxisAlignment:
                                          CrossAxisAlignment.start,
                                      children: [
                                        Text(
                                          tenant.name,
                                          style: const TextStyle(
                                            fontWeight: FontWeight.w600,
                                          ),
                                        ),
                                        Text(tenant.email ?? ''),
                                        Text(tenant.phone ?? ''),
                                      ],
                                    ),
                                  ),
                                  Chip(label: Text(tenant.status ?? 'unknown')),
                                ],
                              ),
                              const SizedBox(height: 8),
                              Text('Room: ${tenant.roomNumber ?? 'Unassigned'}'),
                              if (tenant.rentAmount != null)
                                Text(
                                  'Rent: ₹${fmt.format(tenant.rentAmount)}/month',
                                ),
                              if (tenant.noticeGiven && tenant.moveOutDate != null)
                                Text('Move-out: ${tenant.moveOutDate}'),
                              if (tenant.status == 'active') ...[
                                const SizedBox(height: 12),
                                TextField(
                                  decoration: const InputDecoration(
                                    labelText: 'Move-out date (YYYY-MM-DD)',
                                    border: OutlineInputBorder(),
                                    isDense: true,
                                  ),
                                  onChanged: (v) =>
                                      _noticeDates[tenant.uid] = v,
                                ),
                                const SizedBox(height: 8),
                                FilledButton.tonal(
                                  onPressed: () => _giveNotice(tenant),
                                  child: const Text('Give notice'),
                                ),
                              ],
                              if (tenant.status == 'notice_period') ...[
                                const SizedBox(height: 12),
                                FilledButton(
                                  onPressed: () => _confirmMoveout(tenant),
                                  child: const Text('Confirm move-out'),
                                ),
                              ],
                              const SizedBox(height: 8),
                              TextButton(
                                onPressed: () => _deleteTenant(tenant),
                                child: const Text('Remove tenant'),
                              ),
                            ],
                          ),
                        ),
                      );
                    },
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
