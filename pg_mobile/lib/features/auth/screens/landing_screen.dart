import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../core/constants/app_strings.dart';
import '../../legal/legal_screens.dart';

class LandingScreen extends ConsumerWidget {
  const LandingScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const Spacer(),
              Text(
                AppStrings.appName,
                textAlign: TextAlign.center,
                style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                      fontWeight: FontWeight.bold,
                    ),
              ),
              const SizedBox(height: 8),
              Text(
                'Smart PG management for owners, tenants, and staff',
                textAlign: TextAlign.center,
                style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                      color: Theme.of(context).colorScheme.onSurfaceVariant,
                    ),
              ),
              const Spacer(),
              FilledButton(
                onPressed: () => context.push('/login'),
                child: const Text('Tenant login'),
              ),
              const SizedBox(height: 12),
              OutlinedButton(
                onPressed: () => context.push('/register'),
                child: const Text('Create account'),
              ),
              const SizedBox(height: 12),
              OutlinedButton(
                onPressed: () => context.push('/admin-login'),
                child: const Text('Owner / admin login'),
              ),
              const SizedBox(height: 12),
              TextButton(
                onPressed: () => context.push('/staff-login'),
                child: const Text('Staff login'),
              ),
              const SizedBox(height: 16),
              const Center(child: LegalLinksRow(prefix: '')),
              const SizedBox(height: 24),
            ],
          ),
        ),
      ),
    );
  }
}
