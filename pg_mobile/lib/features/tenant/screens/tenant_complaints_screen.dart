import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/constants/app_strings.dart';
import '../../../core/widgets/app_shell.dart';
import '../../../core/widgets/async_state.dart';
import '../../../models/complaint.dart';
import '../../../providers/app_providers.dart';
import '../../../repositories/data_repositories.dart';

class TenantComplaintsScreen extends ConsumerStatefulWidget {
  const TenantComplaintsScreen({super.key});

  @override
  ConsumerState<TenantComplaintsScreen> createState() =>
      _TenantComplaintsScreenState();
}

class _TenantComplaintsScreenState extends ConsumerState<TenantComplaintsScreen> {
  final _typeController = TextEditingController();
  final _descriptionController = TextEditingController();
  bool _submitting = false;

  @override
  void dispose() {
    _typeController.dispose();
    _descriptionController.dispose();
    super.dispose();
  }

  Future<void> _showCreateDialog() async {
    _typeController.clear();
    _descriptionController.clear();

    await showDialog<void>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('New complaint'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(
              controller: _typeController,
              decoration: const InputDecoration(
                labelText: 'Type (e.g. Plumbing)',
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 12),
            TextField(
              controller: _descriptionController,
              decoration: const InputDecoration(
                labelText: 'Description',
                border: OutlineInputBorder(),
              ),
              maxLines: 4,
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx),
            child: const Text('Cancel'),
          ),
          FilledButton(
            onPressed: _submitting
                ? null
                : () async {
                    final type = _typeController.text.trim();
                    final description = _descriptionController.text.trim();
                    if (type.isEmpty || description.isEmpty) {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          content: Text('Fill in type and description'),
                        ),
                      );
                      return;
                    }

                    setState(() => _submitting = true);
                    try {
                      await ref.read(tenantApiProvider).createComplaint(
                            type: type,
                            description: description,
                          );
                      ref.invalidate(tenantComplaintsProvider);
                      if (ctx.mounted) Navigator.pop(ctx);
                    } catch (e) {
                      if (mounted) {
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(content: Text(e.toString())),
                        );
                      }
                    } finally {
                      if (mounted) setState(() => _submitting = false);
                    }
                  },
            child: _submitting
                ? const SizedBox(
                    width: 20,
                    height: 20,
                    child: CircularProgressIndicator(strokeWidth: 2),
                  )
                : const Text('Submit'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final complaintsAsync = ref.watch(tenantComplaintsProvider);

    return AppShell(
      title: 'Complaints',
      actions: [
        IconButton(
          icon: const Icon(Icons.add),
          onPressed: _showCreateDialog,
        ),
      ],
      body: complaintsAsync.when(
        loading: () => const LoadingView(),
        error: (e, _) => ErrorView(
          message: e.toString(),
          onRetry: () => ref.invalidate(tenantComplaintsProvider),
        ),
        data: (complaints) {
          if (complaints.isEmpty) {
            return const EmptyView(message: AppStrings.emptyComplaints);
          }

          return RefreshIndicator(
            onRefresh: () async => ref.invalidate(tenantComplaintsProvider),
            child: ListView.builder(
              padding: const EdgeInsets.all(16),
              itemCount: complaints.length,
              itemBuilder: (context, index) {
                final complaint = complaints[index] as Complaint;
                return Card(
                  margin: const EdgeInsets.only(bottom: 12),
                  child: ListTile(
                    title: Text(complaint.type ?? 'Complaint'),
                    subtitle: Text(complaint.description ?? ''),
                    trailing: Chip(label: Text(complaint.status ?? 'open')),
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
