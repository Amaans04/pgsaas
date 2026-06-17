import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:intl/intl.dart';

import '../../../core/widgets/app_shell.dart';
import '../../../providers/app_providers.dart';
import '../../../repositories/data_repositories.dart';

class TenantPortalScreen extends ConsumerStatefulWidget {
  const TenantPortalScreen({super.key});

  @override
  ConsumerState<TenantPortalScreen> createState() => _TenantPortalScreenState();
}

class _TenantPortalScreenState extends ConsumerState<TenantPortalScreen> {
  final _moveOutController = TextEditingController();
  bool _submittingNotice = false;
  bool _submittingCleaning = false;
  String? _noticeError;
  String? _cleaningMessage;
  bool _cleaningSuccess = false;

  @override
  void dispose() {
    _moveOutController.dispose();
    super.dispose();
  }

  Future<void> _requestCleaning() async {
    setState(() {
      _submittingCleaning = true;
      _cleaningMessage = null;
    });

    try {
      await ref.read(tenantApiProvider).requestCleaning();
      setState(() {
        _cleaningSuccess = true;
        _cleaningMessage =
            'Cleaning request sent. Staff will be notified on their dashboard.';
      });
    } catch (e) {
      setState(() {
        _cleaningSuccess = false;
        _cleaningMessage = e.toString();
      });
    } finally {
      if (mounted) setState(() => _submittingCleaning = false);
    }
  }

  Future<void> _giveNotice() async {
    final date = _moveOutController.text.trim();
    if (date.isEmpty) {
      setState(() => _noticeError = 'Pick a move-out date');
      return;
    }

    setState(() {
      _submittingNotice = true;
      _noticeError = null;
    });

    try {
      await ref.read(tenantApiProvider).giveNotice(date);
      await ref.read(profileProvider.notifier).refresh();
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Notice submitted')),
        );
      }
    } catch (e) {
      setState(() => _noticeError = e.toString());
    } finally {
      if (mounted) setState(() => _submittingNotice = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final profileAsync = ref.watch(profileProvider);

    return AppShell(
      title: 'Tenant portal',
      body: profileAsync.when(
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (e, _) => Center(child: Text(e.toString())),
        data: (profile) {
          if (profile == null) {
            return const Center(child: Text('Not signed in'));
          }

          final tenant = profile.tenant;
          final isAssigned = profile.pgId != null && profile.pgId!.isNotEmpty;

          return RefreshIndicator(
            onRefresh: () => ref.read(profileProvider.notifier).refresh(),
            child: ListView(
              padding: const EdgeInsets.all(16),
              children: [
                Text(
                  'Hi, ${profile.name?.split(' ').first ?? 'there'}',
                  style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                        fontWeight: FontWeight.bold,
                      ),
                ),
                const SizedBox(height: 16),
                if (!isAssigned)
                  Card(
                    color: Theme.of(context).colorScheme.tertiaryContainer,
                    child: Padding(
                      padding: const EdgeInsets.all(16),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text(
                            'Waiting for room assignment',
                            style: TextStyle(fontWeight: FontWeight.w600),
                          ),
                          const SizedBox(height: 4),
                          Text(
                            'Share your phone${profile.phone != null ? ' (${profile.phone})' : ''} with the owner.',
                          ),
                        ],
                      ),
                    ),
                  ),
                if (isAssigned) ...[
                  Card(
                    child: ListTile(
                      leading: const Icon(Icons.cleaning_services),
                      title: Text(
                        _submittingCleaning
                            ? 'Sending request...'
                            : 'Request room cleaning',
                      ),
                      subtitle: const Text('Notify staff — not a complaint'),
                      onTap: _submittingCleaning ? null : _requestCleaning,
                    ),
                  ),
                  if (_cleaningMessage != null) ...[
                    const SizedBox(height: 8),
                    Text(
                      _cleaningMessage!,
                      style: TextStyle(
                        color: _cleaningSuccess
                            ? Theme.of(context).colorScheme.primary
                            : Theme.of(context).colorScheme.error,
                      ),
                    ),
                  ],
                ],
                const SizedBox(height: 16),
                _PortalNavCard(
                  title: 'Rent & payments',
                  subtitle: 'History, dues & receipts',
                  icon: Icons.receipt_long,
                  onTap: () => context.push('/tenant/rent'),
                ),
                _PortalNavCard(
                  title: 'Complaints',
                  subtitle: 'Maintenance & issues',
                  icon: Icons.report_problem_outlined,
                  onTap: () => context.push('/tenant/complaints'),
                ),
                _PortalNavCard(
                  title: 'Documents',
                  subtitle: 'ID proof & agreements',
                  icon: Icons.folder_outlined,
                  onTap: () => context.push('/tenant/documents'),
                ),
                _PortalNavCard(
                  title: 'Address',
                  subtitle: 'For deliveries',
                  icon: Icons.location_on_outlined,
                  onTap: () => context.push('/tenant/address'),
                ),
                if (isAssigned && tenant != null) ...[
                  const SizedBox(height: 16),
                  Card(
                    child: Padding(
                      padding: const EdgeInsets.all(16),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Your stay',
                            style: Theme.of(context).textTheme.titleMedium,
                          ),
                          const SizedBox(height: 12),
                          _InfoRow(
                            label: 'Room',
                            value: tenant.roomNumber ?? 'Not assigned',
                          ),
                          if (tenant.rentAmount != null)
                            _InfoRow(
                              label: 'Rent',
                              value:
                                  '₹${NumberFormat.decimalPattern('en_IN').format(tenant.rentAmount)}/mo',
                            ),
                          if (tenant.moveInDate != null)
                            _InfoRow(
                              label: 'Moved in',
                              value: tenant.moveInDate!,
                            ),
                          const Divider(height: 24),
                          if (tenant.status == 'active') ...[
                            Text(
                              'Move-out notice',
                              style: Theme.of(context).textTheme.titleSmall,
                            ),
                            const SizedBox(height: 8),
                            TextField(
                              controller: _moveOutController,
                              decoration: const InputDecoration(
                                labelText: 'Move-out date (YYYY-MM-DD)',
                                border: OutlineInputBorder(),
                              ),
                            ),
                            if (_noticeError != null) ...[
                              const SizedBox(height: 8),
                              Text(
                                _noticeError!,
                                style: TextStyle(
                                  color: Theme.of(context).colorScheme.error,
                                ),
                              ),
                            ],
                            const SizedBox(height: 8),
                            FilledButton.tonal(
                              onPressed: _submittingNotice ? null : _giveNotice,
                              child: Text(
                                _submittingNotice ? 'Submitting...' : 'Give notice',
                              ),
                            ),
                          ],
                          if (tenant.status == 'notice_period')
                            Card(
                              color: Theme.of(context).colorScheme.secondaryContainer,
                              child: Padding(
                                padding: const EdgeInsets.all(12),
                                child: Text(
                                  'Notice submitted. Move-out: ${tenant.moveOutDate ?? '—'}',
                                ),
                              ),
                            ),
                        ],
                      ),
                    ),
                  ),
                ],
              ],
            ),
          );
        },
      ),
    );
  }
}

class _PortalNavCard extends StatelessWidget {
  const _PortalNavCard({
    required this.title,
    required this.subtitle,
    required this.icon,
    required this.onTap,
  });

  final String title;
  final String subtitle;
  final IconData icon;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      child: ListTile(
        leading: Icon(icon),
        title: Text(title, style: const TextStyle(fontWeight: FontWeight.w600)),
        subtitle: Text(subtitle),
        trailing: const Icon(Icons.chevron_right),
        onTap: onTap,
      ),
    );
  }
}

class _InfoRow extends StatelessWidget {
  const _InfoRow({required this.label, required this.value});

  final String label;
  final String value;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label, style: Theme.of(context).textTheme.bodySmall),
          Text(value, style: const TextStyle(fontWeight: FontWeight.w500)),
        ],
      ),
    );
  }
}
