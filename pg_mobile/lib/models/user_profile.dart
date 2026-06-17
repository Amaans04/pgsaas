import 'package:freezed_annotation/freezed_annotation.dart';

import 'pg.dart';

part 'user_profile.freezed.dart';
part 'user_profile.g.dart';

@freezed
class TenantRecord with _$TenantRecord {
  const factory TenantRecord({
    String? pgId,
    String? roomId,
    String? moveInDate,
    @Default(false) bool noticeGiven,
    String? noticeDate,
    String? moveOutDate,
    String? status,
    String? roomNumber,
    num? rentAmount,
  }) = _TenantRecord;

  factory TenantRecord.fromJson(Map<String, dynamic> json) =>
      _$TenantRecordFromJson(json);
}

@freezed
class UserProfile with _$UserProfile {
  const factory UserProfile({
    required String uid,
    String? email,
    String? role,
    String? name,
    String? phone,
    String? photoURL,
    String? pgId,
    @Default(false) bool onboarded,
    @Default(false) bool hasPhone,
    @Default(false) bool isAdmin,
    @Default(false) bool needsPasswordSetup,
    Pg? pg,
    TenantRecord? tenant,
    String? createdAt,
  }) = _UserProfile;

  factory UserProfile.fromJson(Map<String, dynamic> json) =>
      _$UserProfileFromJson(json);
}
