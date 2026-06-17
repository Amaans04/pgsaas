// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'document.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
  'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models',
);

Document _$DocumentFromJson(Map<String, dynamic> json) {
  return _Document.fromJson(json);
}

/// @nodoc
mixin _$Document {
  String get id => throw _privateConstructorUsedError;
  String? get userId => throw _privateConstructorUsedError;
  String? get pgId => throw _privateConstructorUsedError;
  String? get type => throw _privateConstructorUsedError;
  String? get fileUrl => throw _privateConstructorUsedError;
  String? get fileName => throw _privateConstructorUsedError;
  String? get fileId => throw _privateConstructorUsedError;
  String? get uploadedAt => throw _privateConstructorUsedError;
  String? get tenantName => throw _privateConstructorUsedError;

  /// Serializes this Document to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of Document
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $DocumentCopyWith<Document> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $DocumentCopyWith<$Res> {
  factory $DocumentCopyWith(Document value, $Res Function(Document) then) =
      _$DocumentCopyWithImpl<$Res, Document>;
  @useResult
  $Res call({
    String id,
    String? userId,
    String? pgId,
    String? type,
    String? fileUrl,
    String? fileName,
    String? fileId,
    String? uploadedAt,
    String? tenantName,
  });
}

/// @nodoc
class _$DocumentCopyWithImpl<$Res, $Val extends Document>
    implements $DocumentCopyWith<$Res> {
  _$DocumentCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of Document
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? userId = freezed,
    Object? pgId = freezed,
    Object? type = freezed,
    Object? fileUrl = freezed,
    Object? fileName = freezed,
    Object? fileId = freezed,
    Object? uploadedAt = freezed,
    Object? tenantName = freezed,
  }) {
    return _then(
      _value.copyWith(
            id: null == id
                ? _value.id
                : id // ignore: cast_nullable_to_non_nullable
                      as String,
            userId: freezed == userId
                ? _value.userId
                : userId // ignore: cast_nullable_to_non_nullable
                      as String?,
            pgId: freezed == pgId
                ? _value.pgId
                : pgId // ignore: cast_nullable_to_non_nullable
                      as String?,
            type: freezed == type
                ? _value.type
                : type // ignore: cast_nullable_to_non_nullable
                      as String?,
            fileUrl: freezed == fileUrl
                ? _value.fileUrl
                : fileUrl // ignore: cast_nullable_to_non_nullable
                      as String?,
            fileName: freezed == fileName
                ? _value.fileName
                : fileName // ignore: cast_nullable_to_non_nullable
                      as String?,
            fileId: freezed == fileId
                ? _value.fileId
                : fileId // ignore: cast_nullable_to_non_nullable
                      as String?,
            uploadedAt: freezed == uploadedAt
                ? _value.uploadedAt
                : uploadedAt // ignore: cast_nullable_to_non_nullable
                      as String?,
            tenantName: freezed == tenantName
                ? _value.tenantName
                : tenantName // ignore: cast_nullable_to_non_nullable
                      as String?,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$DocumentImplCopyWith<$Res>
    implements $DocumentCopyWith<$Res> {
  factory _$$DocumentImplCopyWith(
    _$DocumentImpl value,
    $Res Function(_$DocumentImpl) then,
  ) = __$$DocumentImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    String id,
    String? userId,
    String? pgId,
    String? type,
    String? fileUrl,
    String? fileName,
    String? fileId,
    String? uploadedAt,
    String? tenantName,
  });
}

/// @nodoc
class __$$DocumentImplCopyWithImpl<$Res>
    extends _$DocumentCopyWithImpl<$Res, _$DocumentImpl>
    implements _$$DocumentImplCopyWith<$Res> {
  __$$DocumentImplCopyWithImpl(
    _$DocumentImpl _value,
    $Res Function(_$DocumentImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of Document
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? userId = freezed,
    Object? pgId = freezed,
    Object? type = freezed,
    Object? fileUrl = freezed,
    Object? fileName = freezed,
    Object? fileId = freezed,
    Object? uploadedAt = freezed,
    Object? tenantName = freezed,
  }) {
    return _then(
      _$DocumentImpl(
        id: null == id
            ? _value.id
            : id // ignore: cast_nullable_to_non_nullable
                  as String,
        userId: freezed == userId
            ? _value.userId
            : userId // ignore: cast_nullable_to_non_nullable
                  as String?,
        pgId: freezed == pgId
            ? _value.pgId
            : pgId // ignore: cast_nullable_to_non_nullable
                  as String?,
        type: freezed == type
            ? _value.type
            : type // ignore: cast_nullable_to_non_nullable
                  as String?,
        fileUrl: freezed == fileUrl
            ? _value.fileUrl
            : fileUrl // ignore: cast_nullable_to_non_nullable
                  as String?,
        fileName: freezed == fileName
            ? _value.fileName
            : fileName // ignore: cast_nullable_to_non_nullable
                  as String?,
        fileId: freezed == fileId
            ? _value.fileId
            : fileId // ignore: cast_nullable_to_non_nullable
                  as String?,
        uploadedAt: freezed == uploadedAt
            ? _value.uploadedAt
            : uploadedAt // ignore: cast_nullable_to_non_nullable
                  as String?,
        tenantName: freezed == tenantName
            ? _value.tenantName
            : tenantName // ignore: cast_nullable_to_non_nullable
                  as String?,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$DocumentImpl implements _Document {
  const _$DocumentImpl({
    required this.id,
    this.userId,
    this.pgId,
    this.type,
    this.fileUrl,
    this.fileName,
    this.fileId,
    this.uploadedAt,
    this.tenantName,
  });

  factory _$DocumentImpl.fromJson(Map<String, dynamic> json) =>
      _$$DocumentImplFromJson(json);

  @override
  final String id;
  @override
  final String? userId;
  @override
  final String? pgId;
  @override
  final String? type;
  @override
  final String? fileUrl;
  @override
  final String? fileName;
  @override
  final String? fileId;
  @override
  final String? uploadedAt;
  @override
  final String? tenantName;

  @override
  String toString() {
    return 'Document(id: $id, userId: $userId, pgId: $pgId, type: $type, fileUrl: $fileUrl, fileName: $fileName, fileId: $fileId, uploadedAt: $uploadedAt, tenantName: $tenantName)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$DocumentImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.userId, userId) || other.userId == userId) &&
            (identical(other.pgId, pgId) || other.pgId == pgId) &&
            (identical(other.type, type) || other.type == type) &&
            (identical(other.fileUrl, fileUrl) || other.fileUrl == fileUrl) &&
            (identical(other.fileName, fileName) ||
                other.fileName == fileName) &&
            (identical(other.fileId, fileId) || other.fileId == fileId) &&
            (identical(other.uploadedAt, uploadedAt) ||
                other.uploadedAt == uploadedAt) &&
            (identical(other.tenantName, tenantName) ||
                other.tenantName == tenantName));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
    runtimeType,
    id,
    userId,
    pgId,
    type,
    fileUrl,
    fileName,
    fileId,
    uploadedAt,
    tenantName,
  );

  /// Create a copy of Document
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$DocumentImplCopyWith<_$DocumentImpl> get copyWith =>
      __$$DocumentImplCopyWithImpl<_$DocumentImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$DocumentImplToJson(this);
  }
}

abstract class _Document implements Document {
  const factory _Document({
    required final String id,
    final String? userId,
    final String? pgId,
    final String? type,
    final String? fileUrl,
    final String? fileName,
    final String? fileId,
    final String? uploadedAt,
    final String? tenantName,
  }) = _$DocumentImpl;

  factory _Document.fromJson(Map<String, dynamic> json) =
      _$DocumentImpl.fromJson;

  @override
  String get id;
  @override
  String? get userId;
  @override
  String? get pgId;
  @override
  String? get type;
  @override
  String? get fileUrl;
  @override
  String? get fileName;
  @override
  String? get fileId;
  @override
  String? get uploadedAt;
  @override
  String? get tenantName;

  /// Create a copy of Document
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$DocumentImplCopyWith<_$DocumentImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

ImageKitAuth _$ImageKitAuthFromJson(Map<String, dynamic> json) {
  return _ImageKitAuth.fromJson(json);
}

/// @nodoc
mixin _$ImageKitAuth {
  String get token => throw _privateConstructorUsedError;
  String get expire => throw _privateConstructorUsedError;
  String get signature => throw _privateConstructorUsedError;
  String? get publicKey => throw _privateConstructorUsedError;

  /// Serializes this ImageKitAuth to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of ImageKitAuth
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $ImageKitAuthCopyWith<ImageKitAuth> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $ImageKitAuthCopyWith<$Res> {
  factory $ImageKitAuthCopyWith(
    ImageKitAuth value,
    $Res Function(ImageKitAuth) then,
  ) = _$ImageKitAuthCopyWithImpl<$Res, ImageKitAuth>;
  @useResult
  $Res call({String token, String expire, String signature, String? publicKey});
}

/// @nodoc
class _$ImageKitAuthCopyWithImpl<$Res, $Val extends ImageKitAuth>
    implements $ImageKitAuthCopyWith<$Res> {
  _$ImageKitAuthCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of ImageKitAuth
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? token = null,
    Object? expire = null,
    Object? signature = null,
    Object? publicKey = freezed,
  }) {
    return _then(
      _value.copyWith(
            token: null == token
                ? _value.token
                : token // ignore: cast_nullable_to_non_nullable
                      as String,
            expire: null == expire
                ? _value.expire
                : expire // ignore: cast_nullable_to_non_nullable
                      as String,
            signature: null == signature
                ? _value.signature
                : signature // ignore: cast_nullable_to_non_nullable
                      as String,
            publicKey: freezed == publicKey
                ? _value.publicKey
                : publicKey // ignore: cast_nullable_to_non_nullable
                      as String?,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$ImageKitAuthImplCopyWith<$Res>
    implements $ImageKitAuthCopyWith<$Res> {
  factory _$$ImageKitAuthImplCopyWith(
    _$ImageKitAuthImpl value,
    $Res Function(_$ImageKitAuthImpl) then,
  ) = __$$ImageKitAuthImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({String token, String expire, String signature, String? publicKey});
}

/// @nodoc
class __$$ImageKitAuthImplCopyWithImpl<$Res>
    extends _$ImageKitAuthCopyWithImpl<$Res, _$ImageKitAuthImpl>
    implements _$$ImageKitAuthImplCopyWith<$Res> {
  __$$ImageKitAuthImplCopyWithImpl(
    _$ImageKitAuthImpl _value,
    $Res Function(_$ImageKitAuthImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of ImageKitAuth
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? token = null,
    Object? expire = null,
    Object? signature = null,
    Object? publicKey = freezed,
  }) {
    return _then(
      _$ImageKitAuthImpl(
        token: null == token
            ? _value.token
            : token // ignore: cast_nullable_to_non_nullable
                  as String,
        expire: null == expire
            ? _value.expire
            : expire // ignore: cast_nullable_to_non_nullable
                  as String,
        signature: null == signature
            ? _value.signature
            : signature // ignore: cast_nullable_to_non_nullable
                  as String,
        publicKey: freezed == publicKey
            ? _value.publicKey
            : publicKey // ignore: cast_nullable_to_non_nullable
                  as String?,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$ImageKitAuthImpl implements _ImageKitAuth {
  const _$ImageKitAuthImpl({
    required this.token,
    required this.expire,
    required this.signature,
    this.publicKey,
  });

  factory _$ImageKitAuthImpl.fromJson(Map<String, dynamic> json) =>
      _$$ImageKitAuthImplFromJson(json);

  @override
  final String token;
  @override
  final String expire;
  @override
  final String signature;
  @override
  final String? publicKey;

  @override
  String toString() {
    return 'ImageKitAuth(token: $token, expire: $expire, signature: $signature, publicKey: $publicKey)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$ImageKitAuthImpl &&
            (identical(other.token, token) || other.token == token) &&
            (identical(other.expire, expire) || other.expire == expire) &&
            (identical(other.signature, signature) ||
                other.signature == signature) &&
            (identical(other.publicKey, publicKey) ||
                other.publicKey == publicKey));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode =>
      Object.hash(runtimeType, token, expire, signature, publicKey);

  /// Create a copy of ImageKitAuth
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$ImageKitAuthImplCopyWith<_$ImageKitAuthImpl> get copyWith =>
      __$$ImageKitAuthImplCopyWithImpl<_$ImageKitAuthImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$ImageKitAuthImplToJson(this);
  }
}

abstract class _ImageKitAuth implements ImageKitAuth {
  const factory _ImageKitAuth({
    required final String token,
    required final String expire,
    required final String signature,
    final String? publicKey,
  }) = _$ImageKitAuthImpl;

  factory _ImageKitAuth.fromJson(Map<String, dynamic> json) =
      _$ImageKitAuthImpl.fromJson;

  @override
  String get token;
  @override
  String get expire;
  @override
  String get signature;
  @override
  String? get publicKey;

  /// Create a copy of ImageKitAuth
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$ImageKitAuthImplCopyWith<_$ImageKitAuthImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

ImageKitUploadResult _$ImageKitUploadResultFromJson(Map<String, dynamic> json) {
  return _ImageKitUploadResult.fromJson(json);
}

/// @nodoc
mixin _$ImageKitUploadResult {
  String get url => throw _privateConstructorUsedError;
  String get name => throw _privateConstructorUsedError;
  @JsonKey(name: 'fileId')
  String get fileId => throw _privateConstructorUsedError;

  /// Serializes this ImageKitUploadResult to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of ImageKitUploadResult
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $ImageKitUploadResultCopyWith<ImageKitUploadResult> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $ImageKitUploadResultCopyWith<$Res> {
  factory $ImageKitUploadResultCopyWith(
    ImageKitUploadResult value,
    $Res Function(ImageKitUploadResult) then,
  ) = _$ImageKitUploadResultCopyWithImpl<$Res, ImageKitUploadResult>;
  @useResult
  $Res call({String url, String name, @JsonKey(name: 'fileId') String fileId});
}

/// @nodoc
class _$ImageKitUploadResultCopyWithImpl<
  $Res,
  $Val extends ImageKitUploadResult
>
    implements $ImageKitUploadResultCopyWith<$Res> {
  _$ImageKitUploadResultCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of ImageKitUploadResult
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({Object? url = null, Object? name = null, Object? fileId = null}) {
    return _then(
      _value.copyWith(
            url: null == url
                ? _value.url
                : url // ignore: cast_nullable_to_non_nullable
                      as String,
            name: null == name
                ? _value.name
                : name // ignore: cast_nullable_to_non_nullable
                      as String,
            fileId: null == fileId
                ? _value.fileId
                : fileId // ignore: cast_nullable_to_non_nullable
                      as String,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$ImageKitUploadResultImplCopyWith<$Res>
    implements $ImageKitUploadResultCopyWith<$Res> {
  factory _$$ImageKitUploadResultImplCopyWith(
    _$ImageKitUploadResultImpl value,
    $Res Function(_$ImageKitUploadResultImpl) then,
  ) = __$$ImageKitUploadResultImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({String url, String name, @JsonKey(name: 'fileId') String fileId});
}

/// @nodoc
class __$$ImageKitUploadResultImplCopyWithImpl<$Res>
    extends _$ImageKitUploadResultCopyWithImpl<$Res, _$ImageKitUploadResultImpl>
    implements _$$ImageKitUploadResultImplCopyWith<$Res> {
  __$$ImageKitUploadResultImplCopyWithImpl(
    _$ImageKitUploadResultImpl _value,
    $Res Function(_$ImageKitUploadResultImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of ImageKitUploadResult
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({Object? url = null, Object? name = null, Object? fileId = null}) {
    return _then(
      _$ImageKitUploadResultImpl(
        url: null == url
            ? _value.url
            : url // ignore: cast_nullable_to_non_nullable
                  as String,
        name: null == name
            ? _value.name
            : name // ignore: cast_nullable_to_non_nullable
                  as String,
        fileId: null == fileId
            ? _value.fileId
            : fileId // ignore: cast_nullable_to_non_nullable
                  as String,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$ImageKitUploadResultImpl implements _ImageKitUploadResult {
  const _$ImageKitUploadResultImpl({
    required this.url,
    required this.name,
    @JsonKey(name: 'fileId') required this.fileId,
  });

  factory _$ImageKitUploadResultImpl.fromJson(Map<String, dynamic> json) =>
      _$$ImageKitUploadResultImplFromJson(json);

  @override
  final String url;
  @override
  final String name;
  @override
  @JsonKey(name: 'fileId')
  final String fileId;

  @override
  String toString() {
    return 'ImageKitUploadResult(url: $url, name: $name, fileId: $fileId)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$ImageKitUploadResultImpl &&
            (identical(other.url, url) || other.url == url) &&
            (identical(other.name, name) || other.name == name) &&
            (identical(other.fileId, fileId) || other.fileId == fileId));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(runtimeType, url, name, fileId);

  /// Create a copy of ImageKitUploadResult
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$ImageKitUploadResultImplCopyWith<_$ImageKitUploadResultImpl>
  get copyWith =>
      __$$ImageKitUploadResultImplCopyWithImpl<_$ImageKitUploadResultImpl>(
        this,
        _$identity,
      );

  @override
  Map<String, dynamic> toJson() {
    return _$$ImageKitUploadResultImplToJson(this);
  }
}

abstract class _ImageKitUploadResult implements ImageKitUploadResult {
  const factory _ImageKitUploadResult({
    required final String url,
    required final String name,
    @JsonKey(name: 'fileId') required final String fileId,
  }) = _$ImageKitUploadResultImpl;

  factory _ImageKitUploadResult.fromJson(Map<String, dynamic> json) =
      _$ImageKitUploadResultImpl.fromJson;

  @override
  String get url;
  @override
  String get name;
  @override
  @JsonKey(name: 'fileId')
  String get fileId;

  /// Create a copy of ImageKitUploadResult
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$ImageKitUploadResultImplCopyWith<_$ImageKitUploadResultImpl>
  get copyWith => throw _privateConstructorUsedError;
}
