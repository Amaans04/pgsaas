import 'dart:io' show Platform;

import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/foundation.dart' show kIsWeb;
import 'package:google_sign_in/google_sign_in.dart';

import '../config/firebase_secrets.dart';

class AuthService {
  AuthService({
    FirebaseAuth? auth,
    GoogleSignIn? googleSignIn,
  })  : _auth = auth ?? FirebaseAuth.instance,
        _googleSignIn = googleSignIn ??
            GoogleSignIn(
              serverClientId: FirebaseSecrets.googleWebClientId,
              clientId: (!kIsWeb && Platform.isIOS)
                  ? FirebaseSecrets.googleIosClientId
                  : null,
            );

  final FirebaseAuth _auth;
  final GoogleSignIn _googleSignIn;

  Stream<User?> authStateChanges() => _auth.authStateChanges();

  User? get currentUser => _auth.currentUser;

  Future<UserCredential> signInWithEmail(String email, String password) {
    return _auth.signInWithEmailAndPassword(email: email.trim(), password: password);
  }

  Future<UserCredential> signInWithGoogle() async {
    final googleUser = await _googleSignIn.signIn();
    if (googleUser == null) {
      throw FirebaseAuthException(code: 'sign-in-cancelled', message: 'Sign in cancelled');
    }
    final googleAuth = await googleUser.authentication;
    final credential = GoogleAuthProvider.credential(
      accessToken: googleAuth.accessToken,
      idToken: googleAuth.idToken,
    );
    return _auth.signInWithCredential(credential);
  }

  Future<void> sendPasswordReset(String email) {
    return _auth.sendPasswordResetEmail(email: email.trim());
  }

  /// After sign-in, iOS may need a short delay before a valid ID token is available.
  Future<void> ensureFreshIdToken() async {
    final user = _auth.currentUser;
    if (user == null) {
      throw FirebaseAuthException(
        code: 'no-current-user',
        message: 'No signed-in user',
      );
    }

    Object? lastError;
    for (var attempt = 0; attempt < 4; attempt++) {
      try {
        final token = await user.getIdToken(attempt > 0);
        if (token != null && token.isNotEmpty) {
          return;
        }
      } catch (e) {
        lastError = e;
      }
      if (attempt < 3) {
        await Future<void>.delayed(Duration(milliseconds: 150 * (attempt + 1)));
      }
    }

    throw FirebaseAuthException(
      code: 'token-unavailable',
      message: lastError?.toString() ?? 'Could not obtain Firebase ID token',
    );
  }

  Future<void> signOut() async {
    await Future.wait([
      _auth.signOut(),
      _googleSignIn.signOut(),
    ]);
  }

  bool get hasPasswordProvider {
    final user = _auth.currentUser;
    if (user == null) return false;
    return user.providerData.any((p) => p.providerId == 'password');
  }

  bool get hasGoogleProvider {
    final user = _auth.currentUser;
    if (user == null) return false;
    return user.providerData.any((p) => p.providerId == 'google.com');
  }

  Future<void> reauthenticateWithPassword(String email, String password) async {
    final user = _auth.currentUser;
    if (user == null) {
      throw FirebaseAuthException(code: 'no-current-user', message: 'No signed-in user');
    }
    final credential = EmailAuthProvider.credential(
      email: email.trim(),
      password: password,
    );
    await user.reauthenticateWithCredential(credential);
  }

  Future<void> reauthenticateWithGoogle() async {
    final user = _auth.currentUser;
    if (user == null) {
      throw FirebaseAuthException(code: 'no-current-user', message: 'No signed-in user');
    }
    final googleUser = await _googleSignIn.signIn();
    if (googleUser == null) {
      throw FirebaseAuthException(code: 'sign-in-cancelled', message: 'Sign in cancelled');
    }
    final googleAuth = await googleUser.authentication;
    final credential = GoogleAuthProvider.credential(
      accessToken: googleAuth.accessToken,
      idToken: googleAuth.idToken,
    );
    await user.reauthenticateWithCredential(credential);
  }

  Future<void> deleteCurrentUser() async {
    final user = _auth.currentUser;
    if (user == null) {
      throw FirebaseAuthException(code: 'no-current-user', message: 'No signed-in user');
    }
    await user.delete();
    await _googleSignIn.signOut();
  }
}
