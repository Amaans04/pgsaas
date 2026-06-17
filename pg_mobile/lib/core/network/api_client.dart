import 'package:dio/dio.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../constants/app_strings.dart';
import '../constants/env.dart';
import '../exceptions/app_exception.dart';
import 'api_response.dart';

class AuthTokenProvider {
  AuthTokenProvider(this._auth);
  final FirebaseAuth _auth;

  Future<String?> getIdToken({bool forceRefresh = false}) async {
    final user = _auth.currentUser;
    if (user == null) return null;

    try {
      final token = await user.getIdToken(forceRefresh);
      if (token != null && token.isNotEmpty) {
        return token;
      }
    } catch (_) {
      if (!forceRefresh) {
        return getIdToken(forceRefresh: true);
      }
    }
    return null;
  }

  /// iOS can return a stale/empty token immediately after sign-in — force a fresh one.
  Future<void> ensureFreshToken() async {
    final user = _auth.currentUser;
    if (user == null) {
      throw const ApiException('Not signed in');
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

    throw ApiException(
      lastError?.toString() ?? 'Could not obtain Firebase auth token',
    );
  }
}

final authTokenProvider = Provider<AuthTokenProvider>((ref) {
  return AuthTokenProvider(FirebaseAuth.instance);
});

class ApiClient {
  ApiClient(this._dio);

  final Dio _dio;

  static ApiClient create(AuthTokenProvider tokenProvider) {
    final dio = Dio(
      BaseOptions(
        baseUrl: Env.apiBaseUrl,
        connectTimeout: const Duration(seconds: 30),
        receiveTimeout: const Duration(seconds: 30),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      ),
    );

    dio.interceptors.add(
      InterceptorsWrapper(
        onRequest: (options, handler) async {
          final token = await tokenProvider.getIdToken();
          if (token != null && token.isNotEmpty) {
            options.headers['Authorization'] = 'Bearer $token';
          }
          handler.next(options);
        },
        onError: (error, handler) async {
          if (error.response?.statusCode == 401 &&
              error.requestOptions.extra['_retried'] != true) {
            try {
              final newToken = await tokenProvider.getIdToken(forceRefresh: true);
              if (newToken != null) {
                final opts = error.requestOptions;
                opts.extra['_retried'] = true;
                opts.headers['Authorization'] = 'Bearer $newToken';
                final response = await dio.fetch(opts);
                handler.resolve(response);
                return;
              }
            } catch (_) {
              // fall through
            }
          }
          handler.next(error);
        },
      ),
    );

    return ApiClient(dio);
  }

  Future<T> getData<T>(
    String path, {
    Map<String, dynamic>? queryParameters,
    T Function(Object? json)? parser,
    ResponseType responseType = ResponseType.json,
  }) async {
    try {
      final response = await _dio.get<dynamic>(
        path,
        queryParameters: queryParameters,
        options: Options(responseType: responseType),
      );
      if (responseType == ResponseType.bytes) {
        return response.data as T;
      }
      return _parseEnvelope(response.data, parser);
    } on DioException catch (e) {
      throw _mapDioError(e);
    }
  }

  Future<T> postData<T>(
    String path, {
    Object? body,
    Map<String, dynamic>? queryParameters,
    T Function(Object? json)? parser,
  }) async {
    try {
      final response = await _dio.post<dynamic>(
        path,
        data: body,
        queryParameters: queryParameters,
      );
      return _parseEnvelope(response.data, parser);
    } on DioException catch (e) {
      throw _mapDioError(e);
    }
  }

  Future<T> putData<T>(
    String path, {
    Object? body,
    Map<String, dynamic>? queryParameters,
    T Function(Object? json)? parser,
  }) async {
    try {
      final response = await _dio.put<dynamic>(
        path,
        data: body,
        queryParameters: queryParameters,
      );
      return _parseEnvelope(response.data, parser);
    } on DioException catch (e) {
      throw _mapDioError(e);
    }
  }

  Future<T> deleteData<T>(
    String path, {
    Map<String, dynamic>? queryParameters,
    T Function(Object? json)? parser,
  }) async {
    try {
      final response = await _dio.delete<dynamic>(
        path,
        queryParameters: queryParameters,
      );
      return _parseEnvelope(response.data, parser);
    } on DioException catch (e) {
      throw _mapDioError(e);
    }
  }

  T _parseEnvelope<T>(dynamic data, T Function(Object? json)? parser) {
    if (data is! Map<String, dynamic>) {
      throw const ApiException('Invalid server response');
    }
    final envelope = ApiResponse<T>.fromJson(
      data,
      parser ?? (json) => json as T,
    );
    if (!envelope.success) {
      throw ApiException(
        envelope.error ?? AppStrings.genericError,
      );
    }
    return envelope.data as T;
  }

  Future<List<int>> getBytes(
    String path, {
    Map<String, dynamic>? queryParameters,
  }) async {
    try {
      final response = await _dio.get<List<int>>(
        path,
        queryParameters: queryParameters,
        options: Options(responseType: ResponseType.bytes),
      );
      return response.data ?? [];
    } on DioException catch (e) {
      throw _mapDioError(e);
    }
  }

  ApiException _mapDioError(DioException e) {
    final statusCode = e.response?.statusCode;
    final data = e.response?.data;
    if (statusCode == 429) {
      return const ApiException(
        'Too many requests. Please wait a moment and try again.',
        statusCode: 429,
      );
    }
    if (data is Map<String, dynamic> && data['error'] is String) {
      return ApiException(data['error'] as String, statusCode: statusCode);
    }
    if (e.type == DioExceptionType.connectionError ||
        e.type == DioExceptionType.connectionTimeout) {
      return const ApiException(AppStrings.networkError);
    }
    return ApiException(
      e.message ?? AppStrings.genericError,
      statusCode: e.response?.statusCode,
    );
  }
}

final apiClientProvider = Provider<ApiClient>((ref) {
  final tokenProvider = ref.watch(authTokenProvider);
  return ApiClient.create(tokenProvider);
});
