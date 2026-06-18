import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../core/permissions/permission_service.dart';
import '../repositories/auth_repository.dart';
import 'auth_api.dart';

class PushNotificationService {
  PushNotificationService(this._messaging, this._authApi);

  final FirebaseMessaging _messaging;
  final AuthApi _authApi;

  Future<void> initialize(BuildContext context) async {
    try {
      final granted = await PermissionService.requestNotificationPermission(context);
      if (!granted) return;

      final token = await _messaging.getToken();
      if (token != null) {
        await _authApi.updatePushToken(token);
      }
      _messaging.onTokenRefresh.listen((newToken) async {
        try {
          await _authApi.updatePushToken(newToken);
        } catch (_) {
          // Non-fatal — token will retry on next refresh.
        }
      });
    } catch (_) {
      // Push setup is optional; never block app startup.
    }
  }
}

final pushNotificationServiceProvider = Provider<PushNotificationService>((ref) {
  return PushNotificationService(
    FirebaseMessaging.instance,
    ref.watch(authApiProvider),
  );
});
