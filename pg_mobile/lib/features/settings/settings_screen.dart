import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../providers/app_providers.dart';
import '../../repositories/auth_repository.dart';

class SettingsScreen extends ConsumerStatefulWidget {
  const SettingsScreen({super.key});

  @override
  ConsumerState<SettingsScreen> createState() => _SettingsScreenState();
}

class _SettingsScreenState extends ConsumerState<SettingsScreen> {
  bool _deleting = false;

  Future<void> _confirmDeleteAccount() async {
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Delete Account'),
        content: const Text(
          'Are you sure you want to delete your account? This action is permanent and '
          'cannot be undone. All your data will be erased.',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(ctx).pop(false),
            child: const Text('Cancel'),
          ),
          FilledButton(
            style: FilledButton.styleFrom(
              backgroundColor: Theme.of(ctx).colorScheme.error,
            ),
            onPressed: () => Navigator.of(ctx).pop(true),
            child: const Text('Delete'),
          ),
        ],
      ),
    );

    if (confirmed != true || !mounted) return;

    final repo = ref.read(authRepositoryProvider);
    String? password;
    var useGoogle = false;

    if (repo.hasPasswordProvider) {
      password = await _promptPassword();
      if (password == null || !mounted) return;
    } else if (repo.hasGoogleProvider) {
      useGoogle = await _promptGoogleReauth();
      if (!useGoogle || !mounted) return;
    }

    setState(() => _deleting = true);

    try {
      final profile = ref.read(profileProvider).valueOrNull;
      await repo.deleteAccount(
        email: profile?.email ?? repo.currentUser?.email,
        password: password,
        useGoogle: useGoogle,
      );
      ref.invalidate(profileProvider);
      if (mounted) context.go('/landing');
    } on FirebaseAuthException catch (e) {
      if (mounted) {
        _showError(_friendlyAuthError(e));
      }
    } catch (e) {
      if (mounted) {
        _showError('Could not delete account. Please try again later.');
      }
    } finally {
      if (mounted) setState(() => _deleting = false);
    }
  }

  Future<String?> _promptPassword() async {
    final controller = TextEditingController();
    return showDialog<String>(
      context: context,
      barrierDismissible: false,
      builder: (ctx) => AlertDialog(
        title: const Text('Confirm your password'),
        content: TextField(
          controller: controller,
          obscureText: true,
          decoration: const InputDecoration(
            labelText: 'Password',
            border: OutlineInputBorder(),
          ),
          autofocus: true,
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(ctx).pop(),
            child: const Text('Cancel'),
          ),
          FilledButton(
            onPressed: () => Navigator.of(ctx).pop(controller.text),
            child: const Text('Confirm'),
          ),
        ],
      ),
    );
  }

  Future<bool> _promptGoogleReauth() async {
    final result = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Verify your identity'),
        content: const Text(
          'For security, please sign in with Google again to confirm account deletion.',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(ctx).pop(false),
            child: const Text('Cancel'),
          ),
          FilledButton(
            onPressed: () => Navigator.of(ctx).pop(true),
            child: const Text('Continue with Google'),
          ),
        ],
      ),
    );
    return result == true;
  }

  String _friendlyAuthError(FirebaseAuthException e) {
    switch (e.code) {
      case 'wrong-password':
      case 'invalid-credential':
        return 'Incorrect password. Please try again.';
      case 'requires-recent-login':
        return 'Please sign in again and retry account deletion.';
      case 'sign-in-cancelled':
        return 'Sign-in was cancelled.';
      default:
        return 'Account deletion failed. Please try again.';
    }
  }

  void _showError(String message) {
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(message)));
  }

  @override
  Widget build(BuildContext context) {
    final profile = ref.watch(profileProvider).valueOrNull;

    return Scaffold(
      appBar: AppBar(title: const Text('Settings')),
      body: _deleting
          ? const Center(child: CircularProgressIndicator())
          : ListView(
              children: [
                if (profile != null)
                  ListTile(
                    leading: const Icon(Icons.person_outline),
                    title: Text(profile.name ?? 'Account'),
                    subtitle: Text(profile.email ?? profile.phone ?? ''),
                  ),
                const Divider(),
                const ListTile(
                  title: Text('Legal', style: TextStyle(fontWeight: FontWeight.w600)),
                ),
                ListTile(
                  leading: const Icon(Icons.privacy_tip_outlined),
                  title: const Text('Privacy Policy'),
                  trailing: const Icon(Icons.chevron_right),
                  onTap: () => context.push('/privacy'),
                ),
                ListTile(
                  leading: const Icon(Icons.description_outlined),
                  title: const Text('Terms of Service'),
                  trailing: const Icon(Icons.chevron_right),
                  onTap: () => context.push('/terms'),
                ),
                const Divider(),
                ListTile(
                  leading: Icon(Icons.delete_forever, color: Theme.of(context).colorScheme.error),
                  title: Text(
                    'Delete Account',
                    style: TextStyle(color: Theme.of(context).colorScheme.error),
                  ),
                  onTap: _confirmDeleteAccount,
                ),
                const SizedBox(height: 24),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 16),
                  child: Text(
                    'Deleting your account permanently removes your profile and associated data.',
                    style: Theme.of(context).textTheme.bodySmall,
                  ),
                ),
              ],
            ),
    );
  }
}
