import 'package:freezed_annotation/freezed_annotation.dart';

part 'document.freezed.dart';
part 'document.g.dart';

@freezed
class Document with _$Document {
  const factory Document({
    required String id,
    String? userId,
    String? pgId,
    String? type,
    String? fileUrl,
    String? fileName,
    String? fileId,
    String? uploadedAt,
    String? tenantName,
  }) = _Document;

  factory Document.fromJson(Map<String, dynamic> json) =>
      _$DocumentFromJson(json);
}

@freezed
class ImageKitAuth with _$ImageKitAuth {
  const factory ImageKitAuth({
    required String token,
    required String expire,
    required String signature,
    String? publicKey,
  }) = _ImageKitAuth;

  factory ImageKitAuth.fromJson(Map<String, dynamic> json) =>
      _$ImageKitAuthFromJson(json);
}

@freezed
class ImageKitUploadResult with _$ImageKitUploadResult {
  const factory ImageKitUploadResult({
    required String url,
    required String name,
    @JsonKey(name: 'fileId') required String fileId,
  }) = _ImageKitUploadResult;

  factory ImageKitUploadResult.fromJson(Map<String, dynamic> json) =>
      _$ImageKitUploadResultFromJson(json);
}
