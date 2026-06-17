import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../core/storage/cache_service.dart';

final cacheServiceProvider = Provider<CacheService>((ref) => CacheService());
