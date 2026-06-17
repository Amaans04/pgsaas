// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'staff.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$StaffMemberImpl _$$StaffMemberImplFromJson(Map<String, dynamic> json) =>
    _$StaffMemberImpl(
      uid: json['uid'] as String,
      name: json['name'] as String,
      email: json['email'] as String?,
      createdAt: json['createdAt'] as String?,
    );

Map<String, dynamic> _$$StaffMemberImplToJson(_$StaffMemberImpl instance) =>
    <String, dynamic>{
      'uid': instance.uid,
      'name': instance.name,
      if (instance.email case final value?) 'email': value,
      if (instance.createdAt case final value?) 'createdAt': value,
    };

_$StaffCreateResponseImpl _$$StaffCreateResponseImplFromJson(
  Map<String, dynamic> json,
) => _$StaffCreateResponseImpl(
  uid: json['uid'] as String,
  email: json['email'] as String,
  name: json['name'] as String,
  tempPassword: json['tempPassword'] as String,
);

Map<String, dynamic> _$$StaffCreateResponseImplToJson(
  _$StaffCreateResponseImpl instance,
) => <String, dynamic>{
  'uid': instance.uid,
  'email': instance.email,
  'name': instance.name,
  'tempPassword': instance.tempPassword,
};
