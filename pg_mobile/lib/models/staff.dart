import 'package:freezed_annotation/freezed_annotation.dart';

part 'staff.freezed.dart';
part 'staff.g.dart';

@freezed
class StaffMember with _$StaffMember {
  const factory StaffMember({
    required String uid,
    required String name,
    String? email,
    String? createdAt,
  }) = _StaffMember;

  factory StaffMember.fromJson(Map<String, dynamic> json) =>
      _$StaffMemberFromJson(json);
}

@freezed
class StaffCreateResponse with _$StaffCreateResponse {
  const factory StaffCreateResponse({
    required String uid,
    required String email,
    required String name,
    required String tempPassword,
  }) = _StaffCreateResponse;

  factory StaffCreateResponse.fromJson(Map<String, dynamic> json) =>
      _$StaffCreateResponseFromJson(json);
}
