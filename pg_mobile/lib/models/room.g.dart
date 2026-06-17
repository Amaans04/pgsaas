// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'room.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$RoomImpl _$$RoomImplFromJson(Map<String, dynamic> json) => _$RoomImpl(
  id: json['id'] as String,
  pgId: json['pgId'] as String?,
  roomNumber: json['roomNumber'] as String,
  roomType: json['roomType'] as String?,
  sharingCapacity: (json['sharingCapacity'] as num?)?.toInt() ?? 1,
  currentOccupancy: (json['currentOccupancy'] as num?)?.toInt() ?? 0,
  rentAmount: json['rentAmount'] as num? ?? 0,
  status: json['status'] as String?,
);

Map<String, dynamic> _$$RoomImplToJson(_$RoomImpl instance) =>
    <String, dynamic>{
      'id': instance.id,
      if (instance.pgId case final value?) 'pgId': value,
      'roomNumber': instance.roomNumber,
      if (instance.roomType case final value?) 'roomType': value,
      'sharingCapacity': instance.sharingCapacity,
      'currentOccupancy': instance.currentOccupancy,
      'rentAmount': instance.rentAmount,
      if (instance.status case final value?) 'status': value,
    };

_$RoomMemberImpl _$$RoomMemberImplFromJson(Map<String, dynamic> json) =>
    _$RoomMemberImpl(
      uid: json['uid'] as String,
      name: json['name'] as String,
      email: json['email'] as String?,
      phone: json['phone'] as String?,
      status: json['status'] as String?,
      moveInDate: json['moveInDate'] as String?,
    );

Map<String, dynamic> _$$RoomMemberImplToJson(_$RoomMemberImpl instance) =>
    <String, dynamic>{
      'uid': instance.uid,
      'name': instance.name,
      if (instance.email case final value?) 'email': value,
      if (instance.phone case final value?) 'phone': value,
      if (instance.status case final value?) 'status': value,
      if (instance.moveInDate case final value?) 'moveInDate': value,
    };

_$RoomDetailResponseImpl _$$RoomDetailResponseImplFromJson(
  Map<String, dynamic> json,
) => _$RoomDetailResponseImpl(
  room: Room.fromJson(json['room'] as Map<String, dynamic>),
  members:
      (json['members'] as List<dynamic>?)
          ?.map((e) => RoomMember.fromJson(e as Map<String, dynamic>))
          .toList() ??
      const [],
  assignable:
      (json['assignable'] as List<dynamic>?)
          ?.map((e) => AssignableTenant.fromJson(e as Map<String, dynamic>))
          .toList() ??
      const [],
  otherRooms:
      (json['otherRooms'] as List<dynamic>?)
          ?.map((e) => OtherRoom.fromJson(e as Map<String, dynamic>))
          .toList() ??
      const [],
);

Map<String, dynamic> _$$RoomDetailResponseImplToJson(
  _$RoomDetailResponseImpl instance,
) => <String, dynamic>{
  'room': instance.room.toJson(),
  'members': instance.members.map((e) => e.toJson()).toList(),
  'assignable': instance.assignable.map((e) => e.toJson()).toList(),
  'otherRooms': instance.otherRooms.map((e) => e.toJson()).toList(),
};

_$AssignableTenantImpl _$$AssignableTenantImplFromJson(
  Map<String, dynamic> json,
) => _$AssignableTenantImpl(
  uid: json['uid'] as String,
  name: json['name'] as String,
  email: json['email'] as String?,
  phone: json['phone'] as String?,
);

Map<String, dynamic> _$$AssignableTenantImplToJson(
  _$AssignableTenantImpl instance,
) => <String, dynamic>{
  'uid': instance.uid,
  'name': instance.name,
  if (instance.email case final value?) 'email': value,
  if (instance.phone case final value?) 'phone': value,
};

_$OtherRoomImpl _$$OtherRoomImplFromJson(Map<String, dynamic> json) =>
    _$OtherRoomImpl(
      id: json['id'] as String,
      roomNumber: json['roomNumber'] as String,
      sharingCapacity: (json['sharingCapacity'] as num?)?.toInt() ?? 1,
      currentOccupancy: (json['currentOccupancy'] as num?)?.toInt() ?? 0,
      available: json['available'] as bool? ?? false,
    );

Map<String, dynamic> _$$OtherRoomImplToJson(_$OtherRoomImpl instance) =>
    <String, dynamic>{
      'id': instance.id,
      'roomNumber': instance.roomNumber,
      'sharingCapacity': instance.sharingCapacity,
      'currentOccupancy': instance.currentOccupancy,
      'available': instance.available,
    };
