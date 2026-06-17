import 'package:freezed_annotation/freezed_annotation.dart';

part 'tenant.freezed.dart';
part 'tenant.g.dart';

@freezed
class Tenant with _$Tenant {
  const factory Tenant({
    required String uid,
    required String name,
    String? email,
    String? phone,
    String? pgId,
    String? roomId,
    String? status,
    String? moveInDate,
    @Default(false) bool noticeGiven,
    String? noticeDate,
    String? moveOutDate,
    String? roomNumber,
    num? rentAmount,
  }) = _Tenant;

  factory Tenant.fromJson(Map<String, dynamic> json) => _$TenantFromJson(json);
}

@freezed
class TenantSearchResponse with _$TenantSearchResponse {
  const factory TenantSearchResponse({
    @Default([]) List<SearchTenant> results,
    @Default(0) int totalUnassigned,
    @Default(0) int totalMatches,
  }) = _TenantSearchResponse;

  factory TenantSearchResponse.fromJson(Map<String, dynamic> json) =>
      _$TenantSearchResponseFromJson(json);
}

@freezed
class SearchTenant with _$SearchTenant {
  const factory SearchTenant({
    required String uid,
    required String name,
    String? email,
    String? phone,
    String? pgId,
    @Default(false) bool assigned,
    String? createdAt,
  }) = _SearchTenant;

  factory SearchTenant.fromJson(Map<String, dynamic> json) =>
      _$SearchTenantFromJson(json);
}
