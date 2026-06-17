import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/widgets/app_shell.dart';
import '../../../core/widgets/async_state.dart';
import '../../../models/complaint.dart';
import '../../../providers/app_providers.dart';
import '../../../repositories/data_repositories.dart';

class StaffComplaintsScreen extends ConsumerStatefulWidget {
  const StaffComplaintsScreen({super.key});

  @override
  ConsumerState<StaffComplaintsScreen> createState() =>
      _StaffComplaintsScreenState();
}

class _StaffComplaintsScreenState extends ConsumerState<StaffComplaintsScreen> {
  String? _resolvingId;

  Future<void> _resolve(Complaint complaint) async {
    setState(() => _resolvingId = complaint.id);
    try {
      await ref.read(ownerOpsApiProvider).resolveComplaint(
            complaintId: complaint.id,
            status: 'resolved',
          );
      ref.invalidate(ownerComplaintsProvider);
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Complaint resolved')),
        );
      }
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
          final complaints = complaintsRaw
              .cast<Complaint>()
              .where((c) => c.status != 'resolved')
              .toList();

          if (complaints.isEmpty) {
            return const EmptyView(message: 'All complaints resolved');
          }

          return RefreshIndicator(
            onRefresh: () async => ref.invalidate(ownerComplaintsProvider),
            child: ListView.builder(
              padding: const EdgeInsets.all(16),
              itemCount: complaints.length,
              itemBuilder: (context, index) {
                final complaint = complaints[index];
                return Card(
                  margin: const EdgeInsets.only(bottom: 12),
                  child: Padding(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          complaint.type ?? 'Complaint',
                          style: const TextStyle(fontWeight: FontWeight.w600),
                        ),
                        const SizedBox(height: 4),
                        Text(complaint.tenantName ?? ''),
                        Text(complaint.description ?? ''),
                        const SizedBox(height: 12),
                        FilledButton(
                          onPressed: _resolvingId == complaint.id
                              ? null
                              : () => _resolve(complaint),
                          child: Text(
                            _resolvingId == complaint.id
                                ? 'Resolving...'
                                : 'Mark resolved',
                          ),
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
    );
  }
}
