import 'package:flutter/foundation.dart';

/// Runtime configuration via --dart-define (no secrets in source).
abstract final class Env {
  static const _apiBaseUrlOverride = String.fromEnvironment('API_BASE_URL');

  /// Production API — override with --dart-define=API_BASE_URL=... if needed.
  static const productionApiBaseUrl = 'https://pgsaas.vercel.app';

  /// Local dev server — pass --dart-define=API_BASE_URL=http://YOUR_IP:3001
  static const localDevApiBaseUrl = String.fromEnvironment(
    'LOCAL_API_BASE_URL',
    defaultValue: 'http://127.0.0.1:3001',
  );

  static String get apiBaseUrl {
    if (_apiBaseUrlOverride.isNotEmpty) {
      return _apiBaseUrlOverride;
    }
    if (kReleaseMode) {
      return productionApiBaseUrl;
    }
    return localDevApiBaseUrl;
  }

  static const defaultPgId = String.fromEnvironment(
    'DEFAULT_PG_ID',
    defaultValue: 'sample-pg',
  );

  static const firebaseApiKey = String.fromEnvironment('FIREBASE_API_KEY');
  static const firebaseAuthDomain = String.fromEnvironment('FIREBASE_AUTH_DOMAIN');
  static const firebaseProjectId = String.fromEnvironment('FIREBASE_PROJECT_ID');
  static const firebaseStorageBucket = String.fromEnvironment('FIREBASE_STORAGE_BUCKET');
  static const firebaseMessagingSenderId = String.fromEnvironment('FIREBASE_MESSAGING_SENDER_ID');
  static const firebaseAppId = String.fromEnvironment('FIREBASE_APP_ID');

  static bool get isFirebaseConfigured =>
      firebaseApiKey.isNotEmpty &&
      firebaseProjectId.isNotEmpty &&
      firebaseAppId.isNotEmpty;
}
