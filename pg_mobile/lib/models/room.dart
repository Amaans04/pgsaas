import 'package:freezed_annotation/freezed_annotation.dart';

part 'room.freezed.dart';
part 'room.g.dart';

@freezed
class Room with _$Room {
  const factory Room({
    required String id,
    String? pgId,
    required String roomNumber,
    String? roomType,
    @Default(1) int sharingCapacity,
    @Default(0) int currentOccupancy,
    @Default(0) num rentAmount,
    String? status,
  }) = _Room;

  factory Room.fromJson(Map<String, dynamic> json) => _$RoomFromJson(json);
}

@freezed
class RoomMember with _$RoomMember {
  const factory RoomMember({
    required String uid,
    required String name,
    String? email,
    String? phone,
    String? status,
    String? moveInDate,
  }) = _RoomMember;

  factory RoomMember.fromJson(Map<String, dynamic> json) =>
      _$RoomMemberFromJson(json);
}

@freezed
class RoomDetail with _$RoomDetail {
  const factory RoomDetail({
    required Room room,
  }) = _RoomDetail;

  factory RoomDetail.fromJson(Map<String, dynamic> json) {
    return RoomDetail(room: Room.fromJson(json['room'] as Map<String, dynamic>));
  }
}

@freezed
class RoomDetailResponse with _$RoomDetailResponse {
  const factory RoomDetailResponse({
    required Room room,
    @Default([]) List<RoomMember> members,
    @Default([]) List<AssignableTenant> assignable,
    @Default([]) List<OtherRoom> otherRooms,
  }) = _RoomDetailResponse;

  factory RoomDetailResponse.fromJson(Map<String, dynamic> json) =>
      _$RoomDetailResponseFromJson(json);
}

@freezed
class AssignableTenant with _$AssignableTenant {
  const factory AssignableTenant({
    required String uid,
    required String name,
    String? email,
    String? phone,
  }) = _AssignableTenant;

  factory AssignableTenant.fromJson(Map<String, dynamic> json) =>
      _$AssignableTenantFromJson(json);
}

@freezed
class OtherRoom with _$OtherRoom {
  const factory OtherRoom({
    required String id,
    required String roomNumber,
    @Default(1) int sharingCapacity,
    @Default(0) int currentOccupancy,
    @Default(false) bool available,
  }) = _OtherRoom;

  factory OtherRoom.fromJson(Map<String, dynamic> json) =>
      _$OtherRoomFromJson(json);
}
