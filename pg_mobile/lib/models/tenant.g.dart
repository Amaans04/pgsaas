// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'tenant.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$TenantImpl _$$TenantImplFromJson(Map<String, dynamic> json) => _$TenantImpl(
  uid: json['uid'] as String,
  name: json['name'] as String,
  email: json['email'] as String?,
  phone: json['phone'] as String?,
  pgId: json['pgId'] as String?,
  roomId: json['roomId'] as String?,
  status: json['status'] as String?,
  moveInDate: json['moveInDate'] as String?,
  noticeGiven: json['noticeGiven'] as bool? ?? false,
  noticeDate: json['noticeDate'] as String?,
  moveOutDate: json['moveOutDate'] as String?,
  roomNumber: json['roomNumber'] as String?,
  rentAmount: json['rentAmount'] as num?,
);

Map<String, dynamic> _$$TenantImplToJson(_$TenantImpl instance) =>
    <String, dynamic>{
      'uid': instance.uid,
      'name': instance.name,
      if (instance.email case final value?) 'email': value,
      if (instance.phone case final value?) 'phone': value,
      if (instance.pgId case final value?) 'pgId': value,
      if (instance.roomId case final value?) 'roomId': value,
      if (instance.status case final value?) 'status': value,
      if (instance.moveInDate case final value?) 'moveInDate': value,
      'noticeGiven': instance.noticeGiven,
      if (instance.noticeDate case final value?) 'noticeDate': value,
      if (instance.moveOutDate case final value?) 'moveOutDate': value,
      if (instance.roomNumber case final value?) 'roomNumber': value,
      if (instance.rentAmount case final value?) 'rentAmount': value,
    };

_$TenantSearchResponseImpl _$$TenantSearchResponseImplFromJson(
  Map<String, dynamic> json,
) => _$TenantSearchResponseImpl(
  results:
      (json['results'] as List<dynamic>?)
          ?.map((e) => SearchTenant.fromJson(e as Map<String, dynamic>))
          .toList() ??
      const [],
  totalUnassigned: (json['totalUnassigned'] as num?)?.toInt() ?? 0,
  totalMatches: (json['totalMatches'] as num?)?.toInt() ?? 0,
);

Map<String, dynamic> _$$TenantSearchResponseImplToJson(
  _$TenantSearchResponseImpl instance,
) => <String, dynamic>{
  'results': instance.results.map((e) => e.toJson()).toList(),
  'totalUnassigned': instance.totalUnassigned,
  'totalMatches': instance.totalMatches,
};

_$SearchTenantImpl _$$SearchTenantImplFromJson(Map<String, dynamic> json) =>
    _$SearchTenantImpl(
      uid: json['uid'] as String,
      name: json['name'] as String,
      email: json['email'] as String?,
      phone: json['phone'] as String?,
      pgId: json['pgId'] as String?,
      assigned: json['assigned'] as bool? ?? false,
      createdAt: json['createdAt'] as String?,
    );

Map<String, dynamic> _$$SearchTenantImplToJson(_$SearchTenantImpl instance) =>
    <String, dynamic>{
      'uid': instance.uid,
      'name': instance.name,
      if (instance.email case final value?) 'email': value,
      if (instance.phone case final value?) 'phone': value,
      if (instance.pgId case final value?) 'pgId': value,
      'assigned': instance.assigned,
      if (instance.createdAt case final value?) 'createdAt': value,
    };
