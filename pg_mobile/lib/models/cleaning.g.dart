// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'cleaning.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$CleaningRequestImpl _$$CleaningRequestImplFromJson(
  Map<String, dynamic> json,
) => _$CleaningRequestImpl(
  id: json['id'] as String,
  tenantId: json['tenantId'] as String?,
  pgId: json['pgId'] as String?,
  roomId: json['roomId'] as String?,
  roomNumber: json['roomNumber'] as String?,
  tenantName: json['tenantName'] as String?,
  status: json['status'] as String?,
  createdAt: json['createdAt'] as String?,
  resolvedAt: json['resolvedAt'] as String?,
  resolvedBy: json['resolvedBy'] as String?,
);

Map<String, dynamic> _$$CleaningRequestImplToJson(
  _$CleaningRequestImpl instance,
) => <String, dynamic>{
  'id': instance.id,
  if (instance.tenantId case final value?) 'tenantId': value,
  if (instance.pgId case final value?) 'pgId': value,
  if (instance.roomId case final value?) 'roomId': value,
  if (instance.roomNumber case final value?) 'roomNumber': value,
  if (instance.tenantName case final value?) 'tenantName': value,
  if (instance.status case final value?) 'status': value,
  if (instance.createdAt case final value?) 'createdAt': value,
  if (instance.resolvedAt case final value?) 'resolvedAt': value,
  if (instance.resolvedBy case final value?) 'resolvedBy': value,
};

_$CleaningListResponseImpl _$$CleaningListResponseImplFromJson(
  Map<String, dynamic> json,
) => _$CleaningListResponseImpl(
  requests:
      (json['requests'] as List<dynamic>?)
          ?.map((e) => CleaningRequest.fromJson(e as Map<String, dynamic>))
          .toList() ??
      const [],
  pendingCount: (json['pendingCount'] as num?)?.toInt() ?? 0,
);

Map<String, dynamic> _$$CleaningListResponseImplToJson(
  _$CleaningListResponseImpl instance,
) => <String, dynamic>{
  'requests': instance.requests.map((e) => e.toJson()).toList(),
  'pendingCount': instance.pendingCount,
};
