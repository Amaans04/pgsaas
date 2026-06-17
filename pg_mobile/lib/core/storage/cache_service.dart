import 'dart:convert';

import 'package:hive_flutter/hive_flutter.dart';

class CacheService {
  static const _boxName = 'pg_cache';

  final Map<String, DateTime> _lastRevalidated = {};

  Future<void> init() async {
    await Hive.initFlutter();
    await Hive.openBox<String>(_boxName);
  }

  Box<String> get _box => Hive.box<String>(_boxName);

  /// Returns true when a background refresh is allowed (stale-while-revalidate throttle).
  bool shouldRevalidate(String key, Duration minInterval) {
    final last = _lastRevalidated[key];
    if (last == null) return true;
    return DateTime.now().difference(last) >= minInterval;
  }

  void markRevalidated(String key) {
    _lastRevalidated[key] = DateTime.now();
  }

  Future<void> putJson(String key, Object value) async {
    await _box.put(key, jsonEncode(value));
  }

  T? getJson<T>(String key, T Function(Object? json) fromJson) {
    final raw = _box.get(key);
    if (raw == null) return null;
    try {
      return fromJson(jsonDecode(raw));
    } catch (_) {
      return null;
    }
  }

  List<T>? getJsonList<T>(String key, T Function(Map<String, dynamic> json) fromJson) {
    final raw = _box.get(key);
    if (raw == null) return null;
    try {
      final list = jsonDecode(raw) as List<dynamic>;
      return list.map((e) => fromJson(e as Map<String, dynamic>)).toList();
    } catch (_) {
      return null;
    }
  }

  Future<void> putJsonList(String key, List<Object> values) async {
    await _box.put(key, jsonEncode(values));
  }

  Future<void> remove(String key) => _box.delete(key);
}
