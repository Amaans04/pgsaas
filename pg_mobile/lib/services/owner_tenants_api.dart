import '../../core/network/api_client.dart';
import '../../models/json_helpers.dart';
import '../../models/tenant.dart';

class OwnerTenantsApi {
  OwnerTenantsApi(this._client);
  final ApiClient _client;

  Future<List<Tenant>> listTenants() => _client.getData(
        '/api/owner/tenants',
        parser: (json) => parseList(json, parseTenant),
      );

  Future<TenantSearchResponse> searchTenants({String? query, int? limit}) =>
      _client.getData(
        '/api/owner/tenants/search',
        queryParameters: {
          if (query != null && query.isNotEmpty) 'q': query,
          'limit': ?limit,
        },
        parser: (json) => TenantSearchResponse.fromJson(asMap(json)),
      );

  Future<void> addTenant({
    required String userId,
    required String roomId,
  }) =>
      _client.postData<void>(
        '/api/owner/tenants/add',
        body: {'userId': userId, 'roomId': roomId},
        parser: (_) {},
      );

  Future<void> removeTenant(String uid) => _client.deleteData<void>(
        '/api/owner/tenants/$uid',
        parser: (_) {},
      );

  Future<void> confirmMoveout(String tenantId) => _client.postData<void>(
        '/api/owner/confirm-moveout',
        body: {'tenantId': tenantId},
        parser: (_) {},
      );

  Future<void> giveNotice({
    required String tenantId,
    required String moveOutDate,
  }) =>
      _client.postData<void>(
        '/api/tenant/notice',
        body: {'tenantId': tenantId, 'moveOutDate': moveOutDate},
        parser: (_) {},
      );
}
