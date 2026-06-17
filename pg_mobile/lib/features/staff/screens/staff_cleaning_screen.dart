import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/widgets/app_shell.dart';
import '../../../core/widgets/async_state.dart';
import '../../../models/cleaning.dart';
import '../../../providers/app_providers.dart';

class StaffCleaningScreen extends ConsumerWidget {
  const StaffCleaningScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final cleaningAsync = ref.watch(cleaningProvider);

    return AppShell(
      title: 'Cleaning requests',
      actions: [
        IconButton(
          icon: const Icon(Icons.refresh),
          onPressed: () => ref.read(cleaningProvider.notifier).refresh(),
        ),
      ],
      body: cleaningAsync.when(
        loading: () => const LoadingView(),
        error: (e, _) => ErrorView(
          message: e.toString(),
          onRetry: () => ref.read(cleaningProvider.notifier).refresh(),
        ),
        data: (response) {
          final pending = response.requests
              .where((r) => r.status != 'resolved')
              .toList();

          if (pending.isEmpty) {
            return const EmptyView(message: 'No pending cleaning requests');
          }

          return RefreshIndicator(
            onRefresh: () => ref.read(cleaningProvider.notifier).refresh(),
            child: ListView.builder(
              padding: const EdgeInsets.all(16),
              itemCount: pending.length,
              itemBuilder: (context, index) {
                final request = pending[index];
                return _CleaningRequestCard(request: request);
              },
            ),
          );
        },
      ),
    );
  }
}

class _CleaningRequestCard extends ConsumerWidget {
  const _CleaningRequestCard({required this.request});

  final CleaningRequest request;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Room ${request.roomNumber ?? '—'}',
              style: const TextStyle(fontWeight: FontWeight.w600),
            ),
            const SizedBox(height: 4),
            Text(request.tenantName ?? 'Tenant'),
            if (request.createdAt != null)
              Text(
                'Requested: ${request.createdAt}',
                style: Theme.of(context).textTheme.bodySmall,
              ),
            const SizedBox(height: 12),
            FilledButton(
              onPressed: () async {
                try {
                  await ref
                      .read(cleaningProvider.notifier)
                      .markDone(request.id);
                  if (context.mounted) {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('Cleaning marked done')),
                    );
                  }
                } catch (e) {
                  if (context.mounted) {
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(content: Text(e.toString())),
                    );
                  }
                }
              },
              child: const Text('Mark done'),
            ),
          ],
        ),
      ),
    );
  }
}
