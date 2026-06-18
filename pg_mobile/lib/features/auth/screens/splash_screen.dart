import 'dart:async';

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../core/exceptions/app_exception.dart';
import '../../../core/constants/app_strings.dart';
import '../../../core/constants/env.dart';
import '../../../core/widgets/async_state.dart';
import '../../../models/user_profile.dart';
import '../../../providers/app_providers.dart';
import '../../../repositories/auth_repository.dart';
import '../../../router/app_router.dart';
import '../../../services/push_notification_service.dart';

class SplashScreen extends ConsumerStatefulWidget {
  const SplashScreen({super.key});

  @override
  ConsumerState<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends ConsumerState<SplashScreen> {
  void _log(String message) {
    if (kDebugMode) {
      debugPrint('[PG_BOOTSTRAP] $message');
    }
  }

  @override
  void initState() {
    super.initState();
    _log('SplashScreen initState');
    WidgetsBinding.instance.addPostFrameCallback((_) => _bootstrap());
  }

  Future<void> _bootstrap() async {
    _log('bootstrap started');
    try {
      await _bootstrapInner().timeout(const Duration(seconds: 40));
      _log('bootstrap finished');
    } catch (e, st) {
      _log('bootstrap timeout/error: $e\n$st');
      if (mounted) context.go('/landing');
    }
  }

  Future<void> _bootstrapInner() async {
    final authRepo = ref.read(authRepositoryProvider);

    _log('waiting for Firebase auth state...');
    final user = await authRepo.authStateChanges().first;
    _log('auth state resolved: user=${user?.uid ?? 'null'}');
    if (user == null) {
      ref.read(profileProvider.notifier).setProfile(null);
      if (mounted) context.go('/landing');
      return;
    }

    _log('refreshing Firebase ID token before API call...');
    await authRepo.ensureFreshIdToken();

    _log('fetching profile from API (${Env.apiBaseUrl})...');
    try {
      final profile = await authRepo.fetchProfile(forceRefresh: true);
      if (profile == null) {
        _log('profile is null after fetch — signing out');
        await authRepo.signOut();
        ref.read(profileProvider.notifier).setProfile(null);
        if (mounted) context.go('/landing');
        return;
      }
      ref.read(profileProvider.notifier).setProfile(profile);
      _log('profile ok (${profile.role}) — navigating home');
      unawaited(ref.read(pushNotificationServiceProvider).initialize(context));
      if (!mounted) return;
      context.go(homeRouteForProfile(profile));
    } catch (e, st) {
      _log('fetchProfile failed: $e\n$st');
      final isAuthError = e is ApiException && e.statusCode == 401;
      if (isAuthError) {
        await authRepo.signOut();
        ref.read(profileProvider.notifier).setProfile(null);
        _log('auth error — signOut complete, going to landing');
      } else {
        _log('server/network error — keeping Firebase session, going to landing');
      }
      if (mounted) context.go('/landing');
    }
  }

  Future<void> _navigateForProfile(AsyncValue<UserProfile?> profileAsync) async {
    if (!mounted) return;

    await profileAsync.when(
      loading: () async {
        _log('navigate skipped: profile still loading');
      },
      error: (error, _) async {
        _log('profile error: $error');
        final isAuthError = error is ApiException && error.statusCode == 401;
        if (isAuthError) {
          await ref.read(authRepositoryProvider).signOut();
          ref.read(profileProvider.notifier).setProfile(null);
          _log('auth error — signOut complete');
        }
        if (mounted) context.go('/landing');
      },
      data: (profile) async {
        if (profile == null) {
          _log('profile data is null — signing out');
          await ref.read(authRepositoryProvider).signOut();
          if (mounted) context.go('/landing');
          return;
        }
        _log('profile ok (${profile.role}) — navigating home');
        unawaited(ref.read(pushNotificationServiceProvider).initialize(context));
        if (!mounted) return;
        context.go(homeRouteForProfile(profile));
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    ref.listen<AsyncValue<UserProfile?>>(profileProvider, (prev, next) {
      if (prev?.isLoading != true) return;
      if (next.hasValue || next.hasError) {
        _navigateForProfile(next);
      }
    });

    return Scaffold(
      body: Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(
              AppStrings.appName,
              style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                    fontWeight: FontWeight.bold,
                  ),
            ),
            const SizedBox(height: 24),
            const LoadingView(),
          ],
        ),
      ),
    );
  }
}
