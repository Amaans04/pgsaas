import 'package:freezed_annotation/freezed_annotation.dart';

part 'complaint.freezed.dart';
part 'complaint.g.dart';

@freezed
class Complaint with _$Complaint {
  const factory Complaint({
    required String id,
    String? tenantId,
    String? pgId,
    String? roomId,
    String? type,
    String? description,
    String? status,
    String? createdAt,
    String? resolvedAt,
    String? tenantName,
  }) = _Complaint;

  factory Complaint.fromJson(Map<String, dynamic> json) =>
      _$ComplaintFromJson(json);
}
