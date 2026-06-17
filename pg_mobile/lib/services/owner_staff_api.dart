import '../../core/network/api_client.dart';
import '../../models/json_helpers.dart';
import '../../models/staff.dart';

class OwnerStaffApi {
  OwnerStaffApi(this._client);
  final ApiClient _client;

  Future<List<StaffMember>> listStaff() => _client.getData(
        '/api/owner/staff',
        parser: (json) => parseList(json, StaffMember.fromJson),
      );

  Future<StaffCreateResponse> createStaff({
    required String email,
    required String name,
  }) =>
      _client.postData(
        '/api/owner/staff/create',
        body: {'email': email, 'name': name},
        parser: (json) => StaffCreateResponse.fromJson(asMap(json)),
      );

  Future<void> deleteStaff(String uid) => _client.deleteData<void>(
        '/api/owner/staff/$uid',
        parser: (_) {},
      );
}
