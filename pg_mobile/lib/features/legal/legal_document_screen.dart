import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class LegalDocumentScreen extends StatelessWidget {
  const LegalDocumentScreen({
    super.key,
    required this.title,
    required this.body,
  });

  final String title;
  final String body;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Scaffold(
      appBar: AppBar(
        title: Text(title),
        leading: IconButton(
          icon: const Icon(Icons.close),
          onPressed: () => context.pop(),
        ),
      ),
      body: SafeArea(
        child: Scrollbar(
          child: SingleChildScrollView(
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
            child: SelectableText(
              body,
              style: theme.textTheme.bodyLarge?.copyWith(
                height: 1.55,
                letterSpacing: 0.15,
              ),
            ),
          ),
        ),
      ),
    );
  }
}
