// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'document.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$DocumentImpl _$$DocumentImplFromJson(Map<String, dynamic> json) =>
    _$DocumentImpl(
      id: json['id'] as String,
      userId: json['userId'] as String?,
      pgId: json['pgId'] as String?,
      type: json['type'] as String?,
      fileUrl: json['fileUrl'] as String?,
      fileName: json['fileName'] as String?,
      fileId: json['fileId'] as String?,
      uploadedAt: json['uploadedAt'] as String?,
      tenantName: json['tenantName'] as String?,
    );

Map<String, dynamic> _$$DocumentImplToJson(_$DocumentImpl instance) =>
    <String, dynamic>{
      'id': instance.id,
      if (instance.userId case final value?) 'userId': value,
      if (instance.pgId case final value?) 'pgId': value,
      if (instance.type case final value?) 'type': value,
      if (instance.fileUrl case final value?) 'fileUrl': value,
      if (instance.fileName case final value?) 'fileName': value,
      if (instance.fileId case final value?) 'fileId': value,
      if (instance.uploadedAt case final value?) 'uploadedAt': value,
      if (instance.tenantName case final value?) 'tenantName': value,
    };

_$ImageKitAuthImpl _$$ImageKitAuthImplFromJson(Map<String, dynamic> json) =>
    _$ImageKitAuthImpl(
      token: json['token'] as String,
      expire: json['expire'] as String,
      signature: json['signature'] as String,
      publicKey: json['publicKey'] as String?,
    );

Map<String, dynamic> _$$ImageKitAuthImplToJson(_$ImageKitAuthImpl instance) =>
    <String, dynamic>{
      'token': instance.token,
      'expire': instance.expire,
      'signature': instance.signature,
      if (instance.publicKey case final value?) 'publicKey': value,
    };

_$ImageKitUploadResultImpl _$$ImageKitUploadResultImplFromJson(
  Map<String, dynamic> json,
) => _$ImageKitUploadResultImpl(
  url: json['url'] as String,
  name: json['name'] as String,
  fileId: json['fileId'] as String,
);

Map<String, dynamic> _$$ImageKitUploadResultImplToJson(
  _$ImageKitUploadResultImpl instance,
) => <String, dynamic>{
  'url': instance.url,
  'name': instance.name,
  'fileId': instance.fileId,
};
