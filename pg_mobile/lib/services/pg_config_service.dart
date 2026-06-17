import 'dart:convert';

import 'package:flutter/services.dart';

import '../models/pg.dart';

class PgConfigService {
  final Map<String, PgConfig> _cache = {};

  Future<PgConfig> load(String pgId) async {
    if (_cache.containsKey(pgId)) return _cache[pgId]!;
    final raw = await rootBundle.loadString('assets/config/$pgId.json');
    final json = jsonDecode(raw) as Map<String, dynamic>;
    final config = PgConfig.fromJson(json);
    _cache[pgId] = config;
    return config;
  }
}
