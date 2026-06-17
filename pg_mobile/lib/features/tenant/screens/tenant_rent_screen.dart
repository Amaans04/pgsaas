import 'dart:io';
import 'dart:typed_data';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:intl/intl.dart';
import 'package:open_filex/open_filex.dart';
import 'package:path_provider/path_provider.dart';
import 'package:razorpay_flutter/razorpay_flutter.dart';
import 'package:share_plus/share_plus.dart';

import '../../../core/constants/app_strings.dart';
import '../../../core/widgets/app_shell.dart';
import '../../../core/widgets/async_state.dart';
import '../../../models/payment.dart';
import '../../../providers/app_providers.dart';
import '../../../repositories/data_repositories.dart';

const _months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

class TenantRentScreen extends ConsumerStatefulWidget {
  const TenantRentScreen({super.key});

  @override
  ConsumerState<TenantRentScreen> createState() => _TenantRentScreenState();
}

class _TenantRentScreenState extends ConsumerState<TenantRentScreen> {
  late final Razorpay _razorpay;
  bool _paying = false;
  String? _error;
  String? _downloadingId;
  int? _pendingMonth;
  int? _pendingYear;

  @override
  void initState() {
    super.initState();
    _razorpay = Razorpay();
    _razorpay.on(Razorpay.EVENT_PAYMENT_SUCCESS, _onPaymentSuccess);
    _razorpay.on(Razorpay.EVENT_PAYMENT_ERROR, _onPaymentError);
    _razorpay.on(Razorpay.EVENT_EXTERNAL_WALLET, _onExternalWallet);
  }

  @override
  void dispose() {
    _razorpay.clear();
    super.dispose();
  }

  Future<void> _onPaymentSuccess(PaymentSuccessResponse response) async {
    final month = _pendingMonth;
    final year = _pendingYear;
    if (month == null || year == null) return;

    try {
      await ref.read(tenantApiProvider).verifyPayment(
            razorpayOrderId: response.orderId ?? '',
            razorpayPaymentId: response.paymentId ?? '',
            razorpaySignature: response.signature ?? '',
            month: month,
            year: year,
          );
      ref.invalidate(tenantRentProvider);
      ref.invalidate(tenantCustomPaymentsProvider);
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Payment successful')),
        );
      }
    } catch (e) {
      setState(() => _error = e.toString());
    } finally {
      if (mounted) setState(() => _paying = false);
    }
  }

  void _onPaymentError(PaymentFailureResponse response) {
    setState(() {
      _paying = false;
      _error = response.message ?? 'Payment failed';
    });
  }

  void _onExternalWallet(ExternalWalletResponse response) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text('External wallet: ${response.walletName}')),
    );
  }

  Future<void> _payRent() async {
    final now = DateTime.now();
    final month = now.month;
    final year = now.year;

    setState(() {
      _paying = true;
      _error = null;
      _pendingMonth = month;
      _pendingYear = year;
    });

    try {
      final order = await ref.read(tenantApiProvider).createOrder(
            month: month,
            year: year,
          );

      if (order.devMode) {
        if (!mounted) return;
        final confirmed = await showDialog<bool>(
          context: context,
          builder: (ctx) => AlertDialog(
            title: const Text('Dev mode payment'),
            content: Text(
              'Razorpay is not configured.\n\nMark ₹${order.amount} rent for ${_months[month - 1]} $year as paid?',
            ),
            actions: [
              TextButton(
                onPressed: () => Navigator.pop(ctx, false),
                child: const Text('Cancel'),
              ),
              FilledButton(
                onPressed: () => Navigator.pop(ctx, true),
                child: const Text('Mark paid'),
              ),
            ],
          ),
        );

        if (confirmed == true) {
          await ref.read(tenantApiProvider).devPay(month: month, year: year);
          ref.invalidate(tenantRentProvider);
          ref.invalidate(tenantCustomPaymentsProvider);
        }
        if (mounted) setState(() => _paying = false);
        return;
      }

      final keyId = order.keyId;
      if (keyId == null || keyId.isEmpty) {
        setState(() => _error =
            'Online payments are not configured. Pay rent in cash to your PG owner.');
        return;
      }

      final options = {
        'key': keyId,
        'amount': ((order.amount ?? 0) * 100).round(),
        'currency': order.currency ?? 'INR',
        'name': 'PG Rent',
        'description': 'Rent for ${_months[month - 1]} $year',
        'order_id': order.orderId,
      };

      _razorpay.open(options);
    } catch (e) {
      setState(() {
        _error = e.toString();
        _paying = false;
      });
    }
  }

  Future<void> _downloadReceipt(String recordId, String type) async {
    setState(() => _downloadingId = recordId);

    try {
      final bytes = await ref.read(tenantApiProvider).downloadReceipt(
            recordId,
            type: type,
          );
      final dir = await getTemporaryDirectory();
      final file = File('${dir.path}/receipt-$recordId.pdf');
      await file.writeAsBytes(Uint8List.fromList(bytes));

      await OpenFilex.open(file.path);
      await Share.shareXFiles(
        [XFile(file.path, mimeType: 'application/pdf')],
        subject: 'Rent receipt',
      );
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Download failed: $e')),
        );
      }
    } finally {
      if (mounted) setState(() => _downloadingId = null);
    }
  }

  @override
  Widget build(BuildContext context) {
    final rentAsync = ref.watch(tenantRentProvider);
    final customAsync = ref.watch(tenantCustomPaymentsProvider);
    final now = DateTime.now();

    return AppShell(
      title: 'Rent & payments',
      actions: [
        IconButton(
          icon: const Icon(Icons.refresh),
          onPressed: () {
            ref.invalidate(tenantRentProvider);
            ref.invalidate(tenantCustomPaymentsProvider);
          },
        ),
      ],
      body: rentAsync.when(
        loading: () => const LoadingView(),
        error: (e, _) => ErrorView(
          message: e.toString(),
          onRetry: () => ref.invalidate(tenantRentProvider),
        ),
        data: (records) {
          return customAsync.when(
            loading: () => const LoadingView(),
            error: (e, _) => ErrorView(message: e.toString()),
            data: (custom) {
              final currentRecord = records.cast<RentRecord?>().firstWhere(
                    (r) => r?.month == now.month && r?.year == now.year,
                    orElse: () => null,
                  );
              final showPayButton =
                  currentRecord == null || currentRecord.status != 'paid';

              final allItems = <_RentListItem>[
                ...records.map(
                  (r) => _RentListItem(
                    id: r.id,
                    label: '${_months[(r.month ?? 1) - 1]} ${r.year}',
                    amount: r.amount ?? 0,
                    status: r.status ?? 'unpaid',
                    kind: 'rent',
                  ),
                ),
                ...custom.map(
                  (c) => _RentListItem(
                    id: c.id,
                    label: c.title ?? 'Custom payment',
                    amount: c.amount ?? 0,
                    status: c.status ?? 'unpaid',
                    kind: 'custom',
                  ),
                ),
              ];

              if (allItems.isEmpty) {
                return const EmptyView(message: AppStrings.emptyPayments);
              }

              return Column(
                children: [
                  if (_error != null)
                    Padding(
                      padding: const EdgeInsets.all(16),
                      child: Text(
                        _error!,
                        style: TextStyle(
                          color: Theme.of(context).colorScheme.error,
                        ),
                      ),
                    ),
                  if (showPayButton)
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 16),
                      child: FilledButton(
                        onPressed: _paying ? null : _payRent,
                        child: Text(_paying ? 'Processing...' : 'Pay this month'),
                      ),
                    ),
                  Expanded(
                    child: RefreshIndicator(
                      onRefresh: () async {
                        ref.invalidate(tenantRentProvider);
                        ref.invalidate(tenantCustomPaymentsProvider);
                      },
                      child: ListView.builder(
                        padding: const EdgeInsets.all(16),
                        itemCount: allItems.length,
                        itemBuilder: (context, index) {
                          final item = allItems[index];
                          final fmt = NumberFormat.decimalPattern('en_IN');

                          return Card(
                            margin: const EdgeInsets.only(bottom: 12),
                            child: Padding(
                              padding: const EdgeInsets.all(16),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Row(
                                    mainAxisAlignment:
                                        MainAxisAlignment.spaceBetween,
                                    children: [
                                      Column(
                                        crossAxisAlignment:
                                            CrossAxisAlignment.start,
                                        children: [
                                          Text(
                                            item.label,
                                            style: const TextStyle(
                                              fontWeight: FontWeight.w600,
                                            ),
                                          ),
                                          Text('₹${fmt.format(item.amount)}'),
                                        ],
                                      ),
                                      _PaymentStatusChip(status: item.status),
                                    ],
                                  ),
                                  const SizedBox(height: 12),
                                  if (item.status == 'paid')
                                    OutlinedButton(
                                      onPressed: _downloadingId == item.id
                                          ? null
                                          : () => _downloadReceipt(
                                                item.id,
                                                item.kind == 'custom'
                                                    ? 'custom'
                                                    : 'rent',
                                              ),
                                      child: Text(
                                        _downloadingId == item.id
                                            ? 'Downloading...'
                                            : 'Download receipt',
                                      ),
                                    ),
                                ],
                              ),
                            ),
                          );
                        },
                      ),
                    ),
                  ),
                ],
              );
            },
          );
        },
      ),
    );
  }
}

class _RentListItem {
  const _RentListItem({
    required this.id,
    required this.label,
    required this.amount,
    required this.status,
    required this.kind,
  });

  final String id;
  final String label;
  final num amount;
  final String status;
  final String kind;
}

class _PaymentStatusChip extends StatelessWidget {
  const _PaymentStatusChip({required this.status});

  final String status;

  @override
  Widget build(BuildContext context) {
    final isPaid = status == 'paid';
    return Chip(
      label: Text(status),
      backgroundColor: isPaid
          ? Theme.of(context).colorScheme.primaryContainer
          : Theme.of(context).colorScheme.errorContainer,
    );
  }
}
