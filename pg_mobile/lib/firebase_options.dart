// Generated from google-services.json and GoogleService-Info.plist (pg-prototype).
import 'package:firebase_core/firebase_core.dart' show FirebaseOptions;
import 'package:flutter/foundation.dart'
    show defaultTargetPlatform, kIsWeb, TargetPlatform;

class DefaultFirebaseOptions {
  static FirebaseOptions get currentPlatform {
    if (kIsWeb) {
      throw UnsupportedError('Web is not supported for pg_mobile.');
    }
    switch (defaultTargetPlatform) {
      case TargetPlatform.android:
        return android;
      case TargetPlatform.iOS:
        return ios;
      case TargetPlatform.macOS:
        return ios;
      default:
        throw UnsupportedError(
          'DefaultFirebaseOptions are not configured for $defaultTargetPlatform.',
        );
    }
  }

  static const FirebaseOptions android = FirebaseOptions(
    apiKey: 'AIzaSyDNHDbxSVs3V-hpUDl6xa_Ry9ajwqaLDZE',
    appId: '1:554147942686:android:0587bd565e28d815f3390f',
    messagingSenderId: '554147942686',
    projectId: 'pg-prototype',
    storageBucket: 'pg-prototype.firebasestorage.app',
  );

  static const FirebaseOptions ios = FirebaseOptions(
    apiKey: 'AIzaSyCt0qr29MWHtoz2ECe3NwQ8ZguXT12J7Q4',
    appId: '1:554147942686:ios:cbcbb7f5f4494561f3390f',
    messagingSenderId: '554147942686',
    projectId: 'pg-prototype',
    storageBucket: 'pg-prototype.firebasestorage.app',
    iosBundleId: 'pg.prototype',
  );

  /// Web OAuth client (client_type 3) — required for Google Sign-In + Firebase Auth on Android.
  static const googleWebClientId =
      '554147942686-q944qs7fdtreqnmjbonh9so1jk9jenv0.apps.googleusercontent.com';

  /// iOS OAuth client from GoogleService-Info.plist.
  static const googleIosClientId =
      '554147942686-pouj1ob3c99skajalbnfgtbvbvh1mao0.apps.googleusercontent.com';
}
