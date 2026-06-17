import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:url_launcher/url_launcher.dart';

import '../../../core/constants/app_strings.dart';
import '../../../core/widgets/app_shell.dart';
import '../../../core/widgets/async_state.dart';
import '../../../models/document.dart';
import '../../../providers/app_providers.dart';

const _typeLabels = {
  'id_proof': 'ID Proof',
  'agreement': 'Agreement',
  'other': 'Other',
};

class OwnerDocumentsScreen extends ConsumerWidget {
  const OwnerDocumentsScreen({super.key});

  Future<void> _openDocument(Document doc) async {
    final url = doc.fileUrl;
    if (url == null) return;
    final uri = Uri.parse(url);
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri, mode: LaunchMode.externalApplication);
    }
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final docsAsync = ref.watch(ownerDocumentsProvider);

    return AppShell(
      title: 'Tenant documents',
      body: docsAsync.when(
        loading: () => const LoadingView(),
        error: (e, _) => ErrorView(
          message: e.toString(),
          onRetry: () => ref.invalidate(ownerDocumentsProvider),
        ),
        data: (documentsRaw) {
          final documents = documentsRaw.cast<Document>();
          if (documents.isEmpty) {
            return const EmptyView(message: AppStrings.emptyDocuments);
          }

          return RefreshIndicator(
            onRefresh: () async => ref.invalidate(ownerDocumentsProvider),
            child: ListView.builder(
              padding: const EdgeInsets.all(16),
              itemCount: documents.length,
              itemBuilder: (context, index) {
                final doc = documents[index];
                final typeLabel =
                    _typeLabels[doc.type] ?? doc.type ?? 'Document';

                return Card(
                  margin: const EdgeInsets.only(bottom: 12),
                  child: ListTile(
                    title: Text(doc.tenantName ?? 'Tenant'),
                    subtitle: Text(
                      '$typeLabel · ${doc.fileName ?? 'File'}',
                    ),
                    trailing: const Icon(Icons.open_in_new),
                    onTap: () => _openDocument(doc),
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
