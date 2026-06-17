import 'package:freezed_annotation/freezed_annotation.dart';

part 'cleaning.freezed.dart';
part 'cleaning.g.dart';

@freezed
class CleaningRequest with _$CleaningRequest {
  const factory CleaningRequest({
    required String id,
    String? tenantId,
    String? pgId,
    String? roomId,
    String? roomNumber,
    String? tenantName,
    String? status,
    String? createdAt,
    String? resolvedAt,
    String? resolvedBy,
  }) = _CleaningRequest;

  factory CleaningRequest.fromJson(Map<String, dynamic> json) =>
      _$CleaningRequestFromJson(json);
}

@freezed
class CleaningListResponse with _$CleaningListResponse {
  const factory CleaningListResponse({
    @Default([]) List<CleaningRequest> requests,
    @Default(0) int pendingCount,
  }) = _CleaningListResponse;

  factory CleaningListResponse.fromJson(Map<String, dynamic> json) =>
      _$CleaningListResponseFromJson(json);
}
