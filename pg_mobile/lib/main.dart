import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import 'core/storage/cache_service.dart';
import 'core/theme/app_theme.dart';
import 'providers/cache_provider.dart';
import 'router/app_router.dart';
import 'services/firebase_bootstrap.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  if (kDebugMode) debugPrint('[PG_BOOTSTRAP] main() start');
  await initializeFirebase();
  if (kDebugMode) debugPrint('[PG_BOOTSTRAP] Firebase initialized');
  final cache = CacheService();
  await cache.init();
  if (kDebugMode) debugPrint('[PG_BOOTSTRAP] cache initialized, launching app');

  runApp(
    ProviderScope(
      overrides: [
        cacheServiceProvider.overrideWithValue(cache),
      ],
      child: const PgMobileApp(),
    ),
  );
}

class PgMobileApp extends ConsumerWidget {
  const PgMobileApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final router = ref.watch(routerProvider);

    return MaterialApp.router(
      title: 'PG SaaS',
      theme: AppTheme.light(),
      routerConfig: router,
      debugShowCheckedModeBanner: false,
    );
  }
}
