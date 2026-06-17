// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'pg.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$PgImpl _$$PgImplFromJson(Map<String, dynamic> json) => _$PgImpl(
  id: json['id'] as String,
  name: json['name'] as String?,
  address: json['address'] as String?,
  ownerId: json['ownerId'] as String?,
  roomCount: (json['roomCount'] as num?)?.toInt(),
  rentDueDate: (json['rentDueDate'] as num?)?.toInt(),
  createdAt: json['createdAt'] as String?,
);

Map<String, dynamic> _$$PgImplToJson(_$PgImpl instance) => <String, dynamic>{
  'id': instance.id,
  if (instance.name case final value?) 'name': value,
  if (instance.address case final value?) 'address': value,
  if (instance.ownerId case final value?) 'ownerId': value,
  if (instance.roomCount case final value?) 'roomCount': value,
  if (instance.rentDueDate case final value?) 'rentDueDate': value,
  if (instance.createdAt case final value?) 'createdAt': value,
};

_$PgConfigImpl _$$PgConfigImplFromJson(Map<String, dynamic> json) =>
    _$PgConfigImpl(
      pgId: json['pgId'] as String,
      name: json['name'] as String,
      tagline: json['tagline'] as String?,
      primaryColorHex: json['primaryColor'] as String?,
      address: json['address'] as String?,
      phone: json['phone'] as String?,
      email: json['email'] as String?,
      rentDueDate: (json['rentDueDate'] as num?)?.toInt(),
      currency: json['currency'] as String?,
      features: json['features'] == null
          ? null
          : PgFeatures.fromJson(json['features'] as Map<String, dynamic>),
    );

Map<String, dynamic> _$$PgConfigImplToJson(_$PgConfigImpl instance) =>
    <String, dynamic>{
      'pgId': instance.pgId,
      'name': instance.name,
      if (instance.tagline case final value?) 'tagline': value,
      if (instance.primaryColorHex case final value?) 'primaryColor': value,
      if (instance.address case final value?) 'address': value,
      if (instance.phone case final value?) 'phone': value,
      if (instance.email case final value?) 'email': value,
      if (instance.rentDueDate case final value?) 'rentDueDate': value,
      if (instance.currency case final value?) 'currency': value,
      if (instance.features?.toJson() case final value?) 'features': value,
    };

_$PgFeaturesImpl _$$PgFeaturesImplFromJson(Map<String, dynamic> json) =>
    _$PgFeaturesImpl(
      complaints: json['complaints'] as bool? ?? true,
      cleaning: json['cleaning'] as bool? ?? true,
      addressImport: json['addressImport'] as bool? ?? false,
      whatsappReminders: json['whatsappReminders'] as bool? ?? false,
    );

Map<String, dynamic> _$$PgFeaturesImplToJson(_$PgFeaturesImpl instance) =>
    <String, dynamic>{
      'complaints': instance.complaints,
      'cleaning': instance.cleaning,
      'addressImport': instance.addressImport,
      'whatsappReminders': instance.whatsappReminders,
    };
