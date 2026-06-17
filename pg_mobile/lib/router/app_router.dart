import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../models/user_profile.dart';
import '../providers/app_providers.dart';
import '../repositories/auth_repository.dart';
import '../features/auth/screens/splash_screen.dart';
import '../features/auth/screens/landing_screen.dart';
import '../features/auth/screens/login_screen.dart';
import '../features/auth/screens/register_screen.dart';
import '../features/auth/screens/admin_login_screen.dart';
import '../features/auth/screens/staff_login_screen.dart';
import '../features/auth/screens/password_reset_screen.dart';
import '../features/auth/screens/onboarding_screen.dart';
import '../features/auth/screens/owner_setup_screen.dart';
import '../features/tenant/screens/tenant_portal_screen.dart';
import '../features/tenant/screens/tenant_rent_screen.dart';
import '../features/tenant/screens/tenant_complaints_screen.dart';
import '../features/tenant/screens/tenant_documents_screen.dart';
import '../features/tenant/screens/tenant_address_screen.dart';
import '../features/owner/screens/owner_dashboard_screen.dart';
import '../features/owner/screens/owner_rooms_screen.dart';
import '../features/owner/screens/owner_room_detail_screen.dart';
import '../features/owner/screens/owner_tenants_screen.dart';
import '../features/owner/screens/owner_add_tenant_screen.dart';
import '../features/owner/screens/owner_payments_screen.dart';
import '../features/owner/screens/owner_staff_screen.dart';
import '../features/owner/screens/owner_complaints_screen.dart';
import '../features/owner/screens/owner_documents_screen.dart';
import '../features/staff/screens/staff_dashboard_screen.dart';
import '../features/staff/screens/staff_complaints_screen.dart';
import '../features/staff/screens/staff_cleaning_screen.dart';
import '../services/pg_config_service.dart';

final pgConfigServiceProvider = Provider((ref) => PgConfigService());

final routerProvider = Provider<GoRouter>((ref) {
  final authRepo = ref.watch(authRepositoryProvider);
  final refresh = GoRouterRefreshStream(authRepo.authStateChanges());

  return GoRouter(
    initialLocation: '/splash',
    refreshListenable: refresh,
    redirect: (context, state) {
      final path = state.matchedLocation;
      const publicPaths = {
        '/splash',
        '/landing',
        '/login',
        '/register',
        '/admin-login',
        '/staff-login',
        '/reset-password',
      };

      if (path == '/splash') return null;

      // Let login screens finish their multi-step auth flow without redirecting away.
      if (path == '/admin-login' || path == '/staff-login') return null;

      final user = authRepo.currentUser;
      if (user == null) {
        return publicPaths.contains(path) ? null : '/login';
      }

      final profileAsync = ref.read(profileProvider);
      if (kDebugMode) {
        debugPrint(
          '[PG_ROUTER] redirect check path=$path '
          'profileLoading=${profileAsync.isLoading} '
          'profileError=${profileAsync.hasError} '
          'profile=${profileAsync.valueOrNull?.role}',
        );
      }
      // Avoid sending users to /splash while profile is refreshing (e.g. after login).
      if (profileAsync.isLoading) return null;

      // Profile fetch failed (e.g. API unreachable on device) — don't bounce back to splash.
      if (profileAsync.hasError) {
        return publicPaths.contains(path) ? null : '/landing';
      }

      final profile = profileAsync.valueOrNull;
      if (profile == null) {
        return path == '/splash' ? null : '/splash';
      }

      if (profile.role == 'tenant' && !profile.onboarded && path != '/onboarding') {
        return '/onboarding';
      }
      if (profile.isAdmin && profile.needsPasswordSetup && path != '/owner/setup') {
        return '/owner/setup';
      }
      if (publicPaths.contains(path) && path != '/landing') {
        return homeRouteForProfile(profile);
      }

      return null;
    },
    routes: [
      GoRoute(path: '/splash', builder: (_, _) => const SplashScreen()),
      GoRoute(path: '/landing', builder: (_, _) => const LandingScreen()),
      GoRoute(path: '/login', builder: (_, _) => const LoginScreen()),
      GoRoute(path: '/register', builder: (_, _) => const RegisterScreen()),
      GoRoute(path: '/admin-login', builder: (_, _) => const AdminLoginScreen()),
      GoRoute(path: '/staff-login', builder: (_, _) => const StaffLoginScreen()),
      GoRoute(path: '/reset-password', builder: (_, _) => const PasswordResetScreen()),
      GoRoute(path: '/onboarding', builder: (_, _) => const OnboardingScreen()),
      GoRoute(path: '/owner/setup', builder: (_, _) => const OwnerSetupScreen()),
      GoRoute(path: '/tenant/portal', builder: (_, _) => const TenantPortalScreen()),
      GoRoute(path: '/tenant/rent', builder: (_, _) => const TenantRentScreen()),
      GoRoute(path: '/tenant/complaints', builder: (_, _) => const TenantComplaintsScreen()),
      GoRoute(path: '/tenant/documents', builder: (_, _) => const TenantDocumentsScreen()),
      GoRoute(path: '/tenant/address', builder: (_, _) => const TenantAddressScreen()),
      GoRoute(path: '/owner/dashboard', builder: (_, _) => const OwnerDashboardScreen()),
      GoRoute(path: '/owner/rooms', builder: (_, _) => const OwnerRoomsScreen()),
      GoRoute(
        path: '/owner/rooms/:roomId',
        builder: (_, state) => OwnerRoomDetailScreen(roomId: state.pathParameters['roomId']!),
      ),
      GoRoute(path: '/owner/tenants', builder: (_, _) => const OwnerTenantsScreen()),
      GoRoute(path: '/owner/add-tenant', builder: (_, _) => const OwnerAddTenantScreen()),
      GoRoute(path: '/owner/payments', builder: (_, _) => const OwnerPaymentsScreen()),
      GoRoute(path: '/owner/staff', builder: (_, _) => const OwnerStaffScreen()),
      GoRoute(path: '/owner/complaints', builder: (_, _) => const OwnerComplaintsScreen()),
      GoRoute(path: '/owner/documents', builder: (_, _) => const OwnerDocumentsScreen()),
      GoRoute(path: '/staff/dashboard', builder: (_, _) => const StaffDashboardScreen()),
      GoRoute(path: '/staff/complaints', builder: (_, _) => const StaffComplaintsScreen()),
      GoRoute(path: '/staff/cleaning', builder: (_, _) => const StaffCleaningScreen()),
    ],
  );
});

class GoRouterRefreshStream extends ChangeNotifier {
  GoRouterRefreshStream(Stream<dynamic> stream) {
    _sub = stream.listen((_) => notifyListeners());
  }
  late final StreamSubscription<dynamic> _sub;

  @override
  void dispose() {
    _sub.cancel();
    super.dispose();
  }
}

String homeRouteForProfile(UserProfile profile) {
  if (profile.role == 'tenant' && !profile.onboarded) return '/onboarding';
  if (profile.isAdmin && profile.needsPasswordSetup) return '/owner/setup';
  if (profile.isAdmin) return '/owner/dashboard';
  if (profile.role == 'staff') return '/staff/dashboard';
  if (profile.role == 'tenant') return '/tenant/portal';
  return '/login';
}
