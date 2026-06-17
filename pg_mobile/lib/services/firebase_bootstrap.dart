import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/foundation.dart';

import '../core/constants/env.dart';
import '../firebase_options.dart';

Future<void> initializeFirebase() async {
  if (Firebase.apps.isNotEmpty) return;

  if (Env.isFirebaseConfigured) {
    await Firebase.initializeApp(
      options: FirebaseOptions(
        apiKey: Env.firebaseApiKey,
        authDomain: Env.firebaseAuthDomain.isNotEmpty
            ? Env.firebaseAuthDomain
            : '${Env.firebaseProjectId}.firebaseapp.com',
        projectId: Env.firebaseProjectId,
        storageBucket: Env.firebaseStorageBucket.isNotEmpty
            ? Env.firebaseStorageBucket
            : '${Env.firebaseProjectId}.firebasestorage.app',
        messagingSenderId: Env.firebaseMessagingSenderId,
        appId: Env.firebaseAppId,
      ),
    );
    return;
  }

  try {
    await Firebase.initializeApp(
      options: DefaultFirebaseOptions.currentPlatform,
    );
  } catch (e, st) {
    if (kDebugMode) {
      debugPrint('Firebase init failed: $e\n$st');
    }
    rethrow;
  }
}
