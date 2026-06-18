import '../../core/network/api_client.dart';
import '../../models/json_helpers.dart';
import '../../models/user_profile.dart';

class AuthApi {
  AuthApi(this._client);
  final ApiClient _client;

  Future<UserProfile> me() => _client.getData(
        '/api/auth/me',
        parser: (json) => UserProfile.fromJson(asMap(json)),
      );

  Future<UserProfile> onboard({
    required String phone,
    String? name,
  }) =>
      _client.postData(
        '/api/auth/onboard',
        body: {'role': 'tenant', 'phone': phone, 'name': ?name},
        parser: (json) {
          final map = asMap(json);
          final profile = map['profile'];
          if (profile is Map<String, dynamic>) {
            return UserProfile.fromJson(profile);
          }
          throw const FormatException('Missing profile in onboard response');
        },
      );

  Future<Map<String, dynamic>> adminLogin({required String sitePgId}) =>
      _client.postData(
        '/api/auth/admin-login',
        body: {'sitePgId': sitePgId},
        parser: (json) => asMap(json),
      );

  Future<void> setPassword(String password) => _client.postData<void>(
        '/api/auth/set-password',
        body: {'password': password},
        parser: (_) {},
      );

  Future<void> register({
    required String name,
    required String email,
    required String password,
    required String phone,
  }) =>
      _client.postData<void>(
        '/api/auth/register',
        body: {
          'name': name,
          'email': email,
          'password': password,
          'phone': phone,
        },
        parser: (_) {},
      );

  Future<void> updatePushToken(String pushToken) => _client.postData<void>(
        '/api/auth/update-push-token',
        body: {'pushToken': pushToken},
        parser: (_) {},
      );

  Future<void> deleteAccountData() => _client.deleteData<void>(
        '/api/auth/delete-account',
        parser: (_) {},
      );
}
