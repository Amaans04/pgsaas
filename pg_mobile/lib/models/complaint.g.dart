// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'complaint.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$ComplaintImpl _$$ComplaintImplFromJson(Map<String, dynamic> json) =>
    _$ComplaintImpl(
      id: json['id'] as String,
      tenantId: json['tenantId'] as String?,
      pgId: json['pgId'] as String?,
      roomId: json['roomId'] as String?,
      type: json['type'] as String?,
      description: json['description'] as String?,
      status: json['status'] as String?,
      createdAt: json['createdAt'] as String?,
      resolvedAt: json['resolvedAt'] as String?,
      tenantName: json['tenantName'] as String?,
    );

Map<String, dynamic> _$$ComplaintImplToJson(_$ComplaintImpl instance) =>
    <String, dynamic>{
      'id': instance.id,
      if (instance.tenantId case final value?) 'tenantId': value,
      if (instance.pgId case final value?) 'pgId': value,
      if (instance.roomId case final value?) 'roomId': value,
      if (instance.type case final value?) 'type': value,
      if (instance.description case final value?) 'description': value,
      if (instance.status case final value?) 'status': value,
      if (instance.createdAt case final value?) 'createdAt': value,
      if (instance.resolvedAt case final value?) 'resolvedAt': value,
      if (instance.tenantName case final value?) 'tenantName': value,
    };
