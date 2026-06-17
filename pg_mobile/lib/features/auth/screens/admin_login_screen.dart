import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../providers/app_providers.dart';
import '../../../repositories/auth_repository.dart';
import '../../../router/app_router.dart';

class AdminLoginScreen extends ConsumerStatefulWidget {
  const AdminLoginScreen({super.key});

  @override
  ConsumerState<AdminLoginScreen> createState() => _AdminLoginScreenState();
}

class _AdminLoginScreenState extends ConsumerState<AdminLoginScreen> {
  bool _loading = false;
  String? _error;

  Future<void> _adminLogin() async {
    setState(() {
      _loading = true;
      _error = null;
    });

    try {
      final repo = ref.read(authRepositoryProvider);
      await repo.signInGoogle();
      final pgId = ref.read(pgIdProvider);
      await repo.adminLogin(pgId);
      await ref.read(profileProvider.notifier).refresh();
      if (!mounted) return;

      final profile = ref.read(profileProvider).valueOrNull;
      if (profile != null) {
        context.go(homeRouteForProfile(profile));
      }
    } catch (e) {
      if (mounted) setState(() => _error = e.toString());
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final pgId = ref.watch(pgIdProvider);

    return Scaffold(
      appBar: AppBar(title: const Text('Owner / admin login')),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Text(
                'Sign in with the Google account linked to your PG site, then claim admin access.',
                style: Theme.of(context).textTheme.bodyLarge,
              ),
              const SizedBox(height: 16),
              Card(
                child: ListTile(
                  leading: const Icon(Icons.apartment),
                  title: const Text('PG site ID'),
                  subtitle: Text(pgId),
                ),
              ),
              const Spacer(),
              if (_error != null) ...[
                Text(
                  _error!,
                  style: TextStyle(color: Theme.of(context).colorScheme.error),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 12),
              ],
              FilledButton.icon(
                onPressed: _loading ? null : _adminLogin,
                icon: const Icon(Icons.g_mobiledata, size: 28),
                label: _loading
                    ? const SizedBox(
                        height: 20,
                        width: 20,
                        child: CircularProgressIndicator(strokeWidth: 2),
                      )
                    : const Text('Sign in with Google'),
              ),
              const SizedBox(height: 12),
              TextButton(
                onPressed: () => context.go('/landing'),
                child: const Text('Back'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
