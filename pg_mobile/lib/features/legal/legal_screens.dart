import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import 'legal_content.dart';
import 'legal_document_screen.dart';

class PrivacyPolicyScreen extends StatelessWidget {
  const PrivacyPolicyScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return const LegalDocumentScreen(
      title: 'Privacy Policy',
      body: kPrivacyPolicyText,
    );
  }
}

class TermsOfServiceScreen extends StatelessWidget {
  const TermsOfServiceScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return const LegalDocumentScreen(
      title: 'Terms of Service',
      body: kTermsOfServiceText,
    );
  }
}

/// Tappable legal links for registration and settings.
class LegalLinksRow extends StatelessWidget {
  const LegalLinksRow({super.key, this.prefix = 'I agree to the '});

  final String prefix;

  @override
  Widget build(BuildContext context) {
    final linkStyle = Theme.of(context).textTheme.bodyMedium?.copyWith(
          color: Theme.of(context).colorScheme.primary,
          decoration: TextDecoration.underline,
        );

    return Wrap(
      crossAxisAlignment: WrapCrossAlignment.center,
      children: [
        Text(prefix),
        GestureDetector(
          onTap: () => context.push('/terms'),
          child: Text('Terms of Service', style: linkStyle),
        ),
        const Text(' and '),
        GestureDetector(
          onTap: () => context.push('/privacy'),
          child: Text('Privacy Policy', style: linkStyle),
        ),
      ],
    );
  }
}
