import 'package:dio/dio.dart';

import '../../core/network/api_client.dart';
import '../../models/document.dart';
import '../../models/json_helpers.dart';

class DocumentsApi {
  DocumentsApi(this._client, {Dio? uploadDio}) : _uploadDio = uploadDio ?? Dio();

  final ApiClient _client;
  final Dio _uploadDio;

  Future<List<Document>> listMine() => _client.getData(
        '/api/documents',
        parser: (json) => parseList(json, Document.fromJson),
      );

  Future<Document> saveMetadata({
    required String type,
    required String fileUrl,
    required String fileName,
    required String fileId,
  }) =>
      _client.postData(
        '/api/documents',
        body: {
          'type': type,
          'fileUrl': fileUrl,
          'fileName': fileName,
          'fileId': fileId,
        },
        parser: (json) => Document.fromJson(asMap(json)),
      );

  Future<ImageKitAuth> imageKitAuth() => _client.getData(
        '/api/imagekit/auth',
        parser: (json) => ImageKitAuth.fromJson(asMap(json)),
      );

  Future<ImageKitUploadResult> uploadToImageKit({
    required String filePath,
    required String fileName,
    required ImageKitAuth auth,
  }) async {
    final publicKey = auth.publicKey;
    if (publicKey == null || publicKey.isEmpty) {
      throw Exception('ImageKit public key missing from server response');
    }

    final form = FormData.fromMap({
      'file': await MultipartFile.fromFile(filePath, filename: fileName),
      'fileName': fileName,
      'publicKey': publicKey,
      'signature': auth.signature,
      'expire': auth.expire,
      'token': auth.token,
      'folder': '/pg-documents',
    });

    final response = await _uploadDio.post<Map<String, dynamic>>(
      'https://upload.imagekit.io/api/v1/files/upload',
      data: form,
    );

    final data = response.data;
    if (data == null) {
      throw Exception('ImageKit upload failed');
    }
    return ImageKitUploadResult.fromJson(data);
  }
}
