import '../../core/network/api_client.dart';
import '../../models/json_helpers.dart';
import '../../models/room.dart';

class OwnerRoomsApi {
  OwnerRoomsApi(this._client);
  final ApiClient _client;

  Future<List<Room>> listRooms() => _client.getData(
        '/api/owner/rooms',
        parser: (json) => parseList(json, Room.fromJson),
      );

  Future<Room> createRoom({
    required String roomNumber,
    String? roomType,
    required int sharingCapacity,
    required num rentAmount,
  }) =>
      _client.postData(
        '/api/owner/rooms',
        body: {
          'roomNumber': roomNumber,
          'roomType': roomType,
          'sharingCapacity': sharingCapacity,
          'rentAmount': rentAmount,
        },
        parser: (json) => Room.fromJson(asMap(json)),
      );

  Future<Room> updateRoom({
    required String roomId,
    required String roomNumber,
    String? roomType,
    required int sharingCapacity,
    required num rentAmount,
  }) =>
      _client.putData(
        '/api/owner/rooms',
        queryParameters: {'roomId': roomId},
        body: {
          'roomNumber': roomNumber,
          'roomType': roomType,
          'sharingCapacity': sharingCapacity,
          'rentAmount': rentAmount,
        },
        parser: (json) => Room.fromJson({...asMap(json), 'id': roomId}),
      );

  Future<void> deleteRoom(String roomId) => _client.deleteData<void>(
        '/api/owner/rooms',
        queryParameters: {'roomId': roomId},
        parser: (_) {},
      );

  Future<RoomDetailResponse> roomDetail(String roomId) => _client.getData(
        '/api/owner/rooms/detail',
        queryParameters: {'roomId': roomId},
        parser: (json) => RoomDetailResponse.fromJson(asMap(json)),
      );

  Future<void> roomMembers({
    required String action,
    required String roomId,
    String? tenantId,
    String? targetRoomId,
  }) =>
      _client.postData<void>(
        '/api/owner/rooms/members',
        body: {
          'action': action,
          'roomId': roomId,
          'tenantId': ?tenantId,
          'targetRoomId': ?targetRoomId,
        },
        parser: (_) {},
      );
}
