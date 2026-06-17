/// Copy to `firebase_secrets.dart` and fill in from Firebase Console / GoogleService-Info.plist.
///
///   cp lib/config/firebase_secrets.example.dart lib/config/firebase_secrets.dart
///
/// Or run: `./scripts/setup_firebase_secrets.sh`
abstract final class FirebaseSecrets {
  /// Web OAuth client (client_type 3) — Google Sign-In on Android + Firebase Auth.
  static const googleWebClientId =
      'YOUR_PROJECT_NUMBER-xxxx.apps.googleusercontent.com';

  /// iOS OAuth client — Google Sign-In on iOS.
  static const googleIosClientId =
      'YOUR_PROJECT_NUMBER-xxxx.apps.googleusercontent.com';
}
