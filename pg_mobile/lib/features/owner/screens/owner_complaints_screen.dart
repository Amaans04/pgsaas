import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/constants/app_strings.dart';
import '../../../core/widgets/app_shell.dart';
import '../../../core/widgets/async_state.dart';
import '../../../models/complaint.dart';
import '../../../providers/app_providers.dart';
import '../../../repositories/data_repositories.dart';

const _filters = ['all', 'open', 'in_progress', 'resolved'];

class OwnerComplaintsScreen extends ConsumerStatefulWidget {
  const OwnerComplaintsScreen({super.key});

  @override
  ConsumerState<OwnerComplaintsScreen> createState() =>
      _OwnerComplaintsScreenState();
}

class _OwnerComplaintsScreenState extends ConsumerState<OwnerComplaintsScreen> {
  String _filter = 'all';
  String? _resolvingId;

  Future<void> _resolve(Complaint complaint, String status) async {
    setState(() => _resolvingId = complaint.id);
    try {
      await ref.read(ownerOpsApiProvider).resolveComplaint(
            complaintId: complaint.id,
            status: status,
          );
      ref.invalidate(ownerComplaintsProvider);
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(e.toString())),
        );
      }
    } finally {
      if (mounted) setState(() => _resolvingId = null);
    }
  }

  @override
  Widget build(BuildContext context) {
    final complaintsAsync = ref.watch(ownerComplaintsProvider);

    return AppShell(
      title: 'Complaints',
      body: complaintsAsync.when(
        loading: () => const LoadingView(),
        error: (e, _) => ErrorView(
          message: e.toString(),
          onRetry: () => ref.invalidate(ownerComplaintsProvider),
        ),
        data: (complaintsRaw) {
          final complaints = complaintsRaw.cast<Complaint>();
          final filtered = _filter == 'all'
              ? complaints
              : complaints.where((c) => c.status == _filter).toList();

          return Column(
            children: [
              SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                padding: const EdgeInsets.all(16),
                child: Row(
                  children: _filters.map((f) {
                    return Padding(
                      padding: const EdgeInsets.only(right: 8),
                      child: FilterChip(
                        label: Text(f.replaceAll('_', ' ')),
                        selected: _filter == f,
                        onSelected: (_) => setState(() => _filter = f),
                      ),
                    );
                  }).toList(),
                ),
              ),
              Expanded(
                child: filtered.isEmpty
                    ? const EmptyView(message: AppStrings.emptyComplaints)
                    : RefreshIndicator(
                        onRefresh: () async =>
                            ref.invalidate(ownerComplaintsProvider),
                        child: ListView.builder(
                          padding: const EdgeInsets.symmetric(horizontal: 16),
                          itemCount: filtered.length,
                          itemBuilder: (context, index) {
                            final complaint = filtered[index];
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
                                          child: Text(
                                            complaint.type ?? 'Complaint',
                                            style: const TextStyle(
                                              fontWeight: FontWeight.w600,
                                            ),
                                          ),
                                        ),
                                        Chip(
                                          label: Text(complaint.status ?? 'open'),
                                        ),
                                      ],
                                    ),
                                    const SizedBox(height: 4),
                                    Text(complaint.tenantName ?? ''),
                                    Text(complaint.description ?? ''),
                                    if (complaint.status != 'resolved') ...[
                                      const SizedBox(height: 12),
                                      Wrap(
                                        spacing: 8,
                                        children: [
                                          OutlinedButton(
                                            onPressed: _resolvingId ==
                                                    complaint.id
                                                ? null
                                                : () => _resolve(
                                                      complaint,
                                                      'in_progress',
                                                    ),
                                            child: const Text('In progress'),
                                          ),
                                          FilledButton(
                                            onPressed: _resolvingId ==
                                                    complaint.id
                                                ? null
                                                : () => _resolve(
                                                      complaint,
                                                      'resolved',
                                                    ),
                                            child: Text(
                                              _resolvingId == complaint.id
                                                  ? 'Saving...'
                                                  : 'Resolve',
                                            ),
                                          ),
                                        ],
                                      ),
                                    ],
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
      ),
    );
  }
}
