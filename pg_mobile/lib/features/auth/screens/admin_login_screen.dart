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
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  bool _loading = false;
  String? _error;

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  Future<void> _completeOwnerLogin() async {
    final repo = ref.read(authRepositoryProvider);
    var profile = await repo.fetchProfile(forceRefresh: true);

    if (profile?.isAdmin == true) {
      ref.read(profileProvider.notifier).setProfile(profile);
      if (!mounted) return;
      context.go(homeRouteForProfile(profile!));
      return;
    }

    final pgId = ref.read(pgIdProvider);
    await repo.adminLogin(pgId);
    await ref.read(profileProvider.notifier).refresh(force: true);
    if (!mounted) return;

    profile = ref.read(profileProvider).valueOrNull;
    if (profile != null) {
      context.go(homeRouteForProfile(profile));
    }
  }

  Future<void> _signInEmail() async {
    if (!_formKey.currentState!.validate()) return;

    setState(() {
      _loading = true;
      _error = null;
    });

    try {
      final repo = ref.read(authRepositoryProvider);
      await repo.signInEmail(
        _emailController.text.trim(),
        _passwordController.text,
      );
      await _completeOwnerLogin();
    } catch (e) {
      if (mounted) setState(() => _error = e.toString());
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  Future<void> _signInGoogle() async {
    setState(() {
      _loading = true;
      _error = null;
    });

    try {
      final repo = ref.read(authRepositoryProvider);
      await repo.signInGoogle();
      await _completeOwnerLogin();
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
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24),
          child: Form(
            key: _formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Text(
                  'Sign in with your owner email and password, or use Google for first-time setup.',
                  style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                        color: Theme.of(context).colorScheme.onSurfaceVariant,
                      ),
                ),
                const SizedBox(height: 16),
                Card(
                  child: ListTile(
                    leading: const Icon(Icons.apartment),
                    title: const Text('PG site ID'),
                    subtitle: Text(pgId),
                  ),
                ),
                const SizedBox(height: 24),
                TextFormField(
                  controller: _emailController,
                  decoration: const InputDecoration(
                    labelText: 'Email',
                    border: OutlineInputBorder(),
                  ),
                  keyboardType: TextInputType.emailAddress,
                  autocorrect: false,
                  validator: (v) =>
                      v == null || !v.contains('@') ? 'Enter a valid email' : null,
                ),
                const SizedBox(height: 16),
                TextFormField(
                  controller: _passwordController,
                  decoration: const InputDecoration(
                    labelText: 'Password',
                    border: OutlineInputBorder(),
                  ),
                  obscureText: true,
                  validator: (v) =>
                      v == null || v.isEmpty ? 'Password required' : null,
                ),
                const SizedBox(height: 8),
                Align(
                  alignment: Alignment.centerRight,
                  child: TextButton(
                    onPressed: _loading ? null : () => context.push('/reset-password'),
                    child: const Text('Forgot password?'),
                  ),
                ),
                if (_error != null) ...[
                  Text(
                    _error!,
                    style: TextStyle(color: Theme.of(context).colorScheme.error),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 12),
                ],
                FilledButton(
                  onPressed: _loading ? null : _signInEmail,
                  child: _loading
                      ? const SizedBox(
                          height: 20,
                          width: 20,
                          child: CircularProgressIndicator(strokeWidth: 2),
                        )
                      : const Text('Sign in'),
                ),
                const SizedBox(height: 20),
                Row(
                  children: [
                    const Expanded(child: Divider()),
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 12),
                      child: Text(
                        'or',
                        style: Theme.of(context).textTheme.bodySmall?.copyWith(
                              color: Theme.of(context).colorScheme.onSurfaceVariant,
                            ),
                      ),
                    ),
                    const Expanded(child: Divider()),
                  ],
                ),
                const SizedBox(height: 20),
                OutlinedButton.icon(
                  onPressed: _loading ? null : _signInGoogle,
                  icon: const Icon(Icons.g_mobiledata, size: 28),
                  label: const Text('Sign in with Google'),
                ),
                const SizedBox(height: 12),
                TextButton(
                  onPressed: _loading ? null : () => context.go('/landing'),
                  child: const Text('Back'),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
