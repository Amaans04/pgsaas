import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../providers/cache_provider.dart';
import '../core/network/api_client.dart';
import '../core/storage/cache_service.dart';
import '../core/storage/secure_storage_service.dart';
import '../models/user_profile.dart';
import '../services/auth_api.dart';
import '../services/auth_service.dart';

class AuthRepository {
  AuthRepository({
    required AuthService authService,
    required AuthApi authApi,
    required CacheService cache,
  })  : _authService = authService,
        _authApi = authApi,
        _cache = cache;

  final AuthService _authService;
  final AuthApi _authApi;
  final CacheService _cache;

  static const _profileCacheKey = 'profile';
  static const _profileRevalidateInterval = Duration(seconds: 90);

  Stream<User?> authStateChanges() => _authService.authStateChanges();

  User? get currentUser => _authService.currentUser;

  Future<void> ensureFreshIdToken() => _authService.ensureFreshIdToken();

  Future<UserProfile?> fetchProfile({bool forceRefresh = false}) async {
    if (_authService.currentUser == null) return null;

    if (forceRefresh) {
      await _authService.ensureFreshIdToken();
    }

    if (!forceRefresh) {
      final cached = _cache.getJson(
        _profileCacheKey,
        (json) => UserProfile.fromJson(json as Map<String, dynamic>),
      );
      if (cached != null) {
        if (_cache.shouldRevalidate(_profileCacheKey, _profileRevalidateInterval)) {
          _cache.markRevalidated(_profileCacheKey);
          _fetchAndCacheProfile().ignore();
        }
        return cached;
      }
    }
    return _fetchAndCacheProfile();
  }

  Future<UserProfile> _fetchAndCacheProfile() async {
    final profile = await _authApi.me();
    _cache.markRevalidated(_profileCacheKey);
    await _cache.putJson(_profileCacheKey, profile.toJson());
    return profile;
  }

  Future<UserProfile> onboard({required String phone, String? name}) async {
    final profile = await _authApi.onboard(phone: phone, name: name);
    await _cache.putJson(_profileCacheKey, profile.toJson());
    return profile;
  }

  Future<void> signInEmail(String email, String password) async {
    await _authService.signInWithEmail(email, password);
    await _authService.ensureFreshIdToken();
  }

  Future<void> signInGoogle() async {
    await _authService.signInWithGoogle();
    await _authService.ensureFreshIdToken();
  }

  Future<void> register({
    required String name,
    required String email,
    required String password,
    required String phone,
  }) async {
    await _authApi.register(
      name: name,
      email: email,
      password: password,
      phone: phone,
    );
    await signInEmail(email, password);
  }

  Future<void> adminLogin(String sitePgId) async {
    await _authApi.adminLogin(sitePgId: sitePgId);
  }

  Future<void> setPassword(String password) => _authApi.setPassword(password);

  Future<void> signOut() async {
    await _authService.signOut();
    await _clearLocalState();
  }

  Future<void> _clearLocalState() async {
    await _cache.clearAll();
    await SecureStorageService().clearAll();
  }

  bool get hasPasswordProvider => _authService.hasPasswordProvider;
  bool get hasGoogleProvider => _authService.hasGoogleProvider;

  Future<void> reauthenticateForDeletion({
    String? email,
    String? password,
    bool useGoogle = false,
  }) async {
    if (useGoogle) {
      await _authService.reauthenticateWithGoogle();
      return;
    }
    if (email == null || password == null || password.isEmpty) {
      throw FirebaseAuthException(
        code: 'missing-password',
        message: 'Password is required to confirm account deletion',
      );
    }
    await _authService.reauthenticateWithPassword(email, password);
  }

  /// Deletes server data, Firebase Auth user, and all local cache.
  Future<void> deleteAccount({
    String? email,
    String? password,
    bool useGoogle = false,
  }) async {
    await _authApi.deleteAccountData();

    Future<void> deleteAuthUser() => _authService.deleteCurrentUser();

    try {
      await deleteAuthUser();
    } on FirebaseAuthException catch (e) {
      if (e.code != 'requires-recent-login') rethrow;
      await reauthenticateForDeletion(
        email: email,
        password: password,
        useGoogle: useGoogle,
      );
      await deleteAuthUser();
    }

    await _clearLocalState();
  }

  Future<void> resetPassword(String email) => _authService.sendPasswordReset(email);
}

final authServiceProvider = Provider<AuthService>((ref) => AuthService());

final authApiProvider = Provider<AuthApi>((ref) => AuthApi(ref.watch(apiClientProvider)));

final authRepositoryProvider = Provider<AuthRepository>((ref) {
  return AuthRepository(
    authService: ref.watch(authServiceProvider),
    authApi: ref.watch(authApiProvider),
    cache: ref.watch(cacheServiceProvider),
  );
});
