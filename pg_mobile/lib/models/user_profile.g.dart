// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'user_profile.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$TenantRecordImpl _$$TenantRecordImplFromJson(Map<String, dynamic> json) =>
    _$TenantRecordImpl(
      pgId: json['pgId'] as String?,
      roomId: json['roomId'] as String?,
      moveInDate: json['moveInDate'] as String?,
      noticeGiven: json['noticeGiven'] as bool? ?? false,
      noticeDate: json['noticeDate'] as String?,
      moveOutDate: json['moveOutDate'] as String?,
      status: json['status'] as String?,
      roomNumber: json['roomNumber'] as String?,
      rentAmount: json['rentAmount'] as num?,
    );

Map<String, dynamic> _$$TenantRecordImplToJson(_$TenantRecordImpl instance) =>
    <String, dynamic>{
      if (instance.pgId case final value?) 'pgId': value,
      if (instance.roomId case final value?) 'roomId': value,
      if (instance.moveInDate case final value?) 'moveInDate': value,
      'noticeGiven': instance.noticeGiven,
      if (instance.noticeDate case final value?) 'noticeDate': value,
      if (instance.moveOutDate case final value?) 'moveOutDate': value,
      if (instance.status case final value?) 'status': value,
      if (instance.roomNumber case final value?) 'roomNumber': value,
      if (instance.rentAmount case final value?) 'rentAmount': value,
    };

_$UserProfileImpl _$$UserProfileImplFromJson(Map<String, dynamic> json) =>
    _$UserProfileImpl(
      uid: json['uid'] as String,
      email: json['email'] as String?,
      role: json['role'] as String?,
      name: json['name'] as String?,
      phone: json['phone'] as String?,
      photoURL: json['photoURL'] as String?,
      pgId: json['pgId'] as String?,
      onboarded: json['onboarded'] as bool? ?? false,
      hasPhone: json['hasPhone'] as bool? ?? false,
      isAdmin: json['isAdmin'] as bool? ?? false,
      needsPasswordSetup: json['needsPasswordSetup'] as bool? ?? false,
      pg: json['pg'] == null
          ? null
          : Pg.fromJson(json['pg'] as Map<String, dynamic>),
      tenant: json['tenant'] == null
          ? null
          : TenantRecord.fromJson(json['tenant'] as Map<String, dynamic>),
      createdAt: json['createdAt'] as String?,
    );

Map<String, dynamic> _$$UserProfileImplToJson(_$UserProfileImpl instance) =>
    <String, dynamic>{
      'uid': instance.uid,
      if (instance.email case final value?) 'email': value,
      if (instance.role case final value?) 'role': value,
      if (instance.name case final value?) 'name': value,
      if (instance.phone case final value?) 'phone': value,
      if (instance.photoURL case final value?) 'photoURL': value,
      if (instance.pgId case final value?) 'pgId': value,
      'onboarded': instance.onboarded,
      'hasPhone': instance.hasPhone,
      'isAdmin': instance.isAdmin,
      'needsPasswordSetup': instance.needsPasswordSetup,
      if (instance.pg?.toJson() case final value?) 'pg': value,
      if (instance.tenant?.toJson() case final value?) 'tenant': value,
      if (instance.createdAt case final value?) 'createdAt': value,
    };
