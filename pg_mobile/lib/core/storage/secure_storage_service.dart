import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class SecureStorageService {
  SecureStorageService({FlutterSecureStorage? storage})
      : _storage = storage ?? const FlutterSecureStorage();

  final FlutterSecureStorage _storage;
  static const _pgIdKey = 'selected_pg_id';

  Future<void> savePgId(String pgId) => _storage.write(key: _pgIdKey, value: pgId);

  Future<String?> readPgId() => _storage.read(key: _pgIdKey);

  Future<void> clearAll() => _storage.deleteAll();
}
