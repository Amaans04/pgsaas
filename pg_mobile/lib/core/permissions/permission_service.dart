import 'dart:io';

import 'package:flutter/material.dart';
import 'package:permission_handler/permission_handler.dart';

/// Shows a rationale dialog before requesting a runtime permission.
class PermissionService {
  static Future<bool> requestWithRationale({
    required BuildContext context,
    required Permission permission,
    required String title,
    required String message,
    required String deniedMessage,
  }) async {
    final status = await permission.status;
    if (status.isGranted || status.isLimited) return true;

    if (status.isPermanentlyDenied) {
      if (!context.mounted) return false;
      await _showOpenSettingsDialog(context, title, deniedMessage);
      return false;
    }

    if (!context.mounted) return false;
    final proceed = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text(title),
        content: Text(message),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(ctx).pop(false),
            child: const Text('Not now'),
          ),
          FilledButton(
            onPressed: () => Navigator.of(ctx).pop(true),
            child: const Text('Continue'),
          ),
        ],
      ),
    );

    if (proceed != true) {
      if (context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(deniedMessage)));
      }
      return false;
    }

    final result = await permission.request();
    if (result.isGranted || result.isLimited) return true;

    if (result.isPermanentlyDenied) {
      if (context.mounted) {
        await _showOpenSettingsDialog(context, title, deniedMessage);
      }
      return false;
    }

    if (context.mounted) {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(deniedMessage)));
    }
    return false;
  }

  static Future<bool> requestNotificationPermission(BuildContext context) async {
    if (!Platform.isAndroid && !Platform.isIOS) return true;

    return requestWithRationale(
      context: context,
      permission: Permission.notification,
      title: 'Enable notifications',
      message:
          'Dwello needs notification permission to alert you about rent reminders, '
          'cleaning updates, and important messages from your PG.',
      deniedMessage: 'Notifications are off. You can enable them later in Settings.',
    );
  }

  static Future<bool> requestStorageForDocuments(BuildContext context) async {
    if (Platform.isIOS) {
      return requestWithRationale(
        context: context,
        permission: Permission.photos,
        title: 'Access your files',
        message:
            'Dwello needs access to your photos and files so you can upload documents '
            'such as ID proof or rental agreements.',
        deniedMessage: 'File access was denied. Document upload will be unavailable.',
      );
    }

    if (Platform.isAndroid) {
      final photos = await Permission.photos.status;
      if (photos.isGranted || photos.isLimited) return true;

      return requestWithRationale(
        context: context,
        permission: Permission.photos,
        title: 'Access your files',
        message:
            'Dwello needs storage access so you can upload documents such as ID proof '
            'or rental agreements.',
        deniedMessage: 'Storage access was denied. Document upload will be unavailable.',
      );
    }

    return true;
  }

  static Future<void> _showOpenSettingsDialog(
    BuildContext context,
    String title,
    String message,
  ) async {
    await showDialog<void>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text(title),
        content: Text('$message\n\nYou can enable this permission in your device Settings.'),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(ctx).pop(),
            child: const Text('Cancel'),
          ),
          FilledButton(
            onPressed: () {
              Navigator.of(ctx).pop();
              openAppSettings();
            },
            child: const Text('Open Settings'),
          ),
        ],
      ),
    );
  }
}
