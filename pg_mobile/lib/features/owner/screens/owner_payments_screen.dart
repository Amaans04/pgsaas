import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:intl/intl.dart';

import '../../../core/constants/app_strings.dart';
import '../../../core/widgets/app_shell.dart';
import '../../../core/widgets/async_state.dart';
import '../../../models/payment.dart';
import '../../../models/tenant.dart';
import '../../../providers/app_providers.dart';
import '../../../repositories/data_repositories.dart';

class OwnerPaymentsScreen extends ConsumerStatefulWidget {
  const OwnerPaymentsScreen({super.key});

  @override
  ConsumerState<OwnerPaymentsScreen> createState() =>
      _OwnerPaymentsScreenState();
}

class _OwnerPaymentsScreenState extends ConsumerState<OwnerPaymentsScreen> {
  String? _markingId;

  Future<void> _markPaid(TenantPaymentBreakdown tenant, PaymentSummary summary) async {
    setState(() => _markingId = tenant.tenantId);
    try {
      await ref.read(ownerPaymentsApiProvider).updateRent(
            tenantId: tenant.tenantId,
            month: summary.month ?? DateTime.now().month,
            year: summary.year ?? DateTime.now().year,
            amount: tenant.amount,
            dueDate: tenant.dueDate,
            status: 'paid',
            paymentMethod: 'cash',
          );
      ref.invalidate(paymentSummaryProvider);
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(e.toString())),
        );
      }
    } finally {
      if (mounted) setState(() => _markingId = null);
    }
  }

  Future<void> _showEditRentDialog(
    TenantPaymentBreakdown tenant,
    PaymentSummary summary,
  ) async {
    final amountController = TextEditingController(text: '${tenant.amount}');
    final dueDateController = TextEditingController(
      text: tenant.dueDate?.substring(0, 10) ?? '',
    );
    var status = tenant.status ?? 'unpaid';
    var paymentMethod = tenant.paymentMethod ?? 'cash';

    await showDialog<void>(
      context: context,
      builder: (ctx) => StatefulBuilder(
        builder: (ctx, setDialogState) => AlertDialog(
          title: const Text('Edit rent payment'),
          content: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Text('${tenant.name} · Room ${tenant.roomNumber ?? '—'}'),
                const SizedBox(height: 12),
                TextField(
                  controller: amountController,
                  decoration: const InputDecoration(
                    labelText: 'Amount (₹)',
                    border: OutlineInputBorder(),
                  ),
                  keyboardType: TextInputType.number,
                ),
                const SizedBox(height: 12),
                TextField(
                  controller: dueDateController,
                  decoration: const InputDecoration(
                    labelText: 'Due date (YYYY-MM-DD)',
                    border: OutlineInputBorder(),
                  ),
                ),
                const SizedBox(height: 12),
                DropdownMenu<String>(
                  initialSelection: status,
                  label: const Text('Status'),
                  dropdownMenuEntries: const [
                    DropdownMenuEntry(value: 'unpaid', label: 'Unpaid'),
                    DropdownMenuEntry(value: 'paid', label: 'Paid'),
                  ],
                  onSelected: (v) {
                    if (v != null) setDialogState(() => status = v);
                  },
                ),
                if (status == 'paid') ...[
                  const SizedBox(height: 12),
                  DropdownMenu<String>(
                    initialSelection: paymentMethod,
                    label: const Text('Payment method'),
                    dropdownMenuEntries: const [
                      DropdownMenuEntry(value: 'cash', label: 'Cash'),
                      DropdownMenuEntry(value: 'razorpay', label: 'Razorpay'),
                      DropdownMenuEntry(value: 'dev', label: 'Simulated (dev)'),
                    ],
                    onSelected: (v) {
                      if (v != null) setDialogState(() => paymentMethod = v);
                    },
                  ),
                ],
              ],
            ),
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(ctx),
              child: const Text('Cancel'),
            ),
            FilledButton(
              onPressed: () async {
                try {
                  await ref.read(ownerPaymentsApiProvider).updateRent(
                        tenantId: tenant.tenantId,
                        month: summary.month ?? DateTime.now().month,
                        year: summary.year ?? DateTime.now().year,
                        amount: num.parse(amountController.text),
                        dueDate: dueDateController.text.trim().isEmpty
                            ? null
                            : dueDateController.text.trim(),
                        status: status,
                        paymentMethod:
                            status == 'paid' ? paymentMethod : null,
                      );
                  ref.invalidate(paymentSummaryProvider);
                  if (ctx.mounted) Navigator.pop(ctx);
                } catch (e) {
                  if (mounted) {
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(content: Text(e.toString())),
                    );
                  }
                }
              },
              child: const Text('Save'),
            ),
          ],
        ),
      ),
    );
  }

  Future<void> _showCreateCustomDialog(List<Tenant> tenants) async {
    final titleController = TextEditingController();
    final amountController = TextEditingController();
    String? tenantId;

    await showDialog<void>(
      context: context,
      builder: (ctx) => StatefulBuilder(
        builder: (ctx, setDialogState) => AlertDialog(
          title: const Text('Create custom payment'),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              DropdownMenu<String>(
                label: const Text('Tenant'),
                dropdownMenuEntries: tenants
                    .map(
                      (t) => DropdownMenuEntry(
                        value: t.uid,
                        label: t.name,
                      ),
                    )
                    .toList(),
                onSelected: (v) => setDialogState(() => tenantId = v),
              ),
              const SizedBox(height: 12),
              TextField(
                controller: titleController,
                decoration: const InputDecoration(
                  labelText: 'Title',
                  border: OutlineInputBorder(),
                ),
              ),
              const SizedBox(height: 12),
              TextField(
                controller: amountController,
                decoration: const InputDecoration(
                  labelText: 'Amount (₹)',
                  border: OutlineInputBorder(),
                ),
                keyboardType: TextInputType.number,
              ),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(ctx),
              child: const Text('Cancel'),
            ),
            FilledButton(
              onPressed: () async {
                if (tenantId == null ||
                    titleController.text.trim().isEmpty ||
                    amountController.text.trim().isEmpty) {
                  return;
                }
                try {
                  await ref.read(ownerPaymentsApiProvider).createCustom(
                        tenantId: tenantId!,
                        title: titleController.text.trim(),
                        amount: num.parse(amountController.text),
                      );
                  ref.invalidate(ownerCustomPaymentsProvider);
                  if (ctx.mounted) Navigator.pop(ctx);
                } catch (e) {
                  if (mounted) {
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(content: Text(e.toString())),
                    );
                  }
                }
              },
              child: const Text('Create'),
            ),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final summaryAsync = ref.watch(paymentSummaryProvider);
    final customAsync = ref.watch(ownerCustomPaymentsProvider);
    final tenantsAsync = ref.watch(tenantsListProvider);
    final fmt = NumberFormat.decimalPattern('en_IN');

    return AppShell(
      title: 'Payments',
      actions: [
        IconButton(
          icon: const Icon(Icons.add),
          onPressed: () {
            tenantsAsync.whenData((raw) {
              final tenants = raw.cast<Tenant>().where(
                    (t) => t.status != 'moved_out',
                  );
              _showCreateCustomDialog(tenants.toList());
            });
          },
        ),
      ],
      body: summaryAsync.when(
        loading: () => const LoadingView(),
        error: (e, _) => ErrorView(
          message: e.toString(),
          onRetry: () => ref.invalidate(paymentSummaryProvider),
        ),
        data: (summaryRaw) {
          final summary = summaryRaw as PaymentSummary;
          final tenants = summary.tenantBreakdown;

          return customAsync.when(
            loading: () => const LoadingView(),
            error: (e, _) => ErrorView(message: e.toString()),
            data: (customPayments) {
              return RefreshIndicator(
                onRefresh: () async {
                  ref.invalidate(paymentSummaryProvider);
                  ref.invalidate(ownerCustomPaymentsProvider);
                },
                child: ListView(
                  padding: const EdgeInsets.all(16),
                  children: [
                    Row(
                      children: [
                        Expanded(
                          child: StatCard(
                            label: 'Due',
                            value: '₹${fmt.format(summary.totalDue)}',
                          ),
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          child: StatCard(
                            label: 'Collected',
                            value: '₹${fmt.format(summary.totalPaid)}',
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 12),
                    StatCard(
                      label: 'Pending',
                      value: '₹${fmt.format(summary.totalPending)}',
                    ),
                    const SizedBox(height: 24),
                    Text(
                      'Monthly rent',
                      style: Theme.of(context).textTheme.titleMedium,
                    ),
                    const SizedBox(height: 8),
                    if (tenants.isEmpty)
                      const EmptyView(message: AppStrings.emptyPayments),
                    ...tenants.map((tenant) {
                      return Card(
                        margin: const EdgeInsets.only(bottom: 12),
                        child: ListTile(
                          title: Text(tenant.name),
                          subtitle: Text(
                            'Room ${tenant.roomNumber ?? '—'} · ₹${fmt.format(tenant.amount)}',
                          ),
                          trailing: Chip(label: Text(tenant.status ?? 'unpaid')),
                          onTap: () => _showEditRentDialog(tenant, summary),
                        ),
                      );
                    }),
                    ...tenants.where((t) => t.status != 'paid').map((tenant) {
                      return Padding(
                        padding: const EdgeInsets.only(bottom: 8),
                        child: FilledButton.tonal(
                          onPressed: _markingId == tenant.tenantId
                              ? null
                              : () => _markPaid(tenant, summary),
                          child: Text(
                            _markingId == tenant.tenantId
                                ? 'Marking...'
                                : 'Mark ${tenant.name} cash paid',
                          ),
                        ),
                      );
                    }),
                    const SizedBox(height: 24),
                    Text(
                      'Custom payments',
                      style: Theme.of(context).textTheme.titleMedium,
                    ),
                    const SizedBox(height: 8),
                    if (customPayments.isEmpty)
                      const Text('No custom payment requests'),
                    ...customPayments.cast<CustomPayment>().map((payment) {
                      return Card(
                        margin: const EdgeInsets.only(bottom: 12),
                        child: ListTile(
                          title: Text(payment.title ?? 'Payment'),
                          subtitle: Text(
                            '${payment.tenantName ?? ''} · ₹${fmt.format(payment.amount ?? 0)}',
                          ),
                          trailing: payment.status == 'paid'
                              ? const Chip(label: Text('paid'))
                              : TextButton(
                                  onPressed: () async {
                                    await ref
                                        .read(ownerPaymentsApiProvider)
                                        .markCustomPaid(payment.id);
                                    ref.invalidate(ownerCustomPaymentsProvider);
                                  },
                                  child: const Text('Mark paid'),
                                ),
                        ),
                      );
                    }),
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
