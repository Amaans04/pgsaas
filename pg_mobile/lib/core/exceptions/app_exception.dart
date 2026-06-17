sealed class AppException implements Exception {
  const AppException(this.message);
  final String message;

  @override
  String toString() => message;
}

final class ApiException extends AppException {
  const ApiException(super.message, {this.statusCode});
  final int? statusCode;
}

final class AuthException extends AppException {
  const AuthException(super.message);
}

final class CacheException extends AppException {
  const CacheException(super.message);
}
