import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:url_launcher/url_launcher.dart';

import '../../../core/permissions/permission_service.dart';
import '../../../core/utils/error_message.dart';
import '../../../core/widgets/app_shell.dart';
import '../../../core/widgets/async_state.dart';
import '../../../models/document.dart';
import '../../../providers/app_providers.dart';
import '../../../repositories/data_repositories.dart';

class TenantDocumentsScreen extends ConsumerStatefulWidget {
  const TenantDocumentsScreen({super.key});

  @override
  ConsumerState<TenantDocumentsScreen> createState() =>
      _TenantDocumentsScreenState();
}

class _TenantDocumentsScreenState extends ConsumerState<TenantDocumentsScreen> {
  bool _uploading = false;

  Future<void> _pickAndUpload() async {
    final allowed = await PermissionService.requestStorageForDocuments(context);
    if (!allowed || !mounted) return;

    final result = await FilePicker.platform.pickFiles(withData: false);
    if (result == null || result.files.isEmpty) return;

    final file = result.files.first;
    final path = file.path;
    if (path == null) return;

    setState(() => _uploading = true);

    try {
      final api = ref.read(documentsApiProvider);
      final auth = await api.imageKitAuth();
      final upload = await api.uploadToImageKit(
        filePath: path,
        fileName: file.name,
        auth: auth,
      );
      await api.saveMetadata(
        type: 'other',
        fileUrl: upload.url,
        fileName: upload.name,
        fileId: upload.fileId,
      );
      ref.invalidate(documentsProvider);
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Document uploaded')),
        );
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(userFacingError(e))),
        );
      }
    } finally {
      if (mounted) setState(() => _uploading = false);
    }
  }

  Future<void> _openDocument(Document doc) async {
    final url = doc.fileUrl;
    if (url == null) return;
    final uri = Uri.parse(url);
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri, mode: LaunchMode.externalApplication);
    }
  }

  @override
  Widget build(BuildContext context) {
    final docsAsync = ref.watch(documentsProvider);

    return AppShell(
      title: 'Documents',
      actions: [
        IconButton(
          icon: _uploading
              ? const SizedBox(
                  width: 20,
                  height: 20,
                  child: CircularProgressIndicator(strokeWidth: 2),
                )
              : const Icon(Icons.upload_file),
          onPressed: _uploading ? null : _pickAndUpload,
        ),
      ],
      body: docsAsync.when(
        loading: () => const LoadingView(),
        error: (e, _) => ErrorView(
          message: e.toString(),
          onRetry: () => ref.invalidate(documentsProvider),
        ),
        data: (documents) {
          if (documents.isEmpty) {
            return const EmptyView(message: AppStrings.emptyDocuments);
          }

          return RefreshIndicator(
            onRefresh: () async => ref.invalidate(documentsProvider),
            child: ListView.builder(
              padding: const EdgeInsets.all(16),
              itemCount: documents.length,
              itemBuilder: (context, index) {
                final doc = documents[index] as Document;
                return Card(
                  margin: const EdgeInsets.only(bottom: 12),
                  child: ListTile(
                    leading: const Icon(Icons.description_outlined),
                    title: Text(doc.fileName ?? 'Document'),
                    subtitle: Text(doc.type ?? 'other'),
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
