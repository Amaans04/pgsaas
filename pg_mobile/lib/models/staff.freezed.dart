// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'staff.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
  'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models',
);

StaffMember _$StaffMemberFromJson(Map<String, dynamic> json) {
  return _StaffMember.fromJson(json);
}

/// @nodoc
mixin _$StaffMember {
  String get uid => throw _privateConstructorUsedError;
  String get name => throw _privateConstructorUsedError;
  String? get email => throw _privateConstructorUsedError;
  String? get createdAt => throw _privateConstructorUsedError;

  /// Serializes this StaffMember to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of StaffMember
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $StaffMemberCopyWith<StaffMember> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $StaffMemberCopyWith<$Res> {
  factory $StaffMemberCopyWith(
    StaffMember value,
    $Res Function(StaffMember) then,
  ) = _$StaffMemberCopyWithImpl<$Res, StaffMember>;
  @useResult
  $Res call({String uid, String name, String? email, String? createdAt});
}

/// @nodoc
class _$StaffMemberCopyWithImpl<$Res, $Val extends StaffMember>
    implements $StaffMemberCopyWith<$Res> {
  _$StaffMemberCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of StaffMember
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? uid = null,
    Object? name = null,
    Object? email = freezed,
    Object? createdAt = freezed,
  }) {
    return _then(
      _value.copyWith(
            uid: null == uid
                ? _value.uid
                : uid // ignore: cast_nullable_to_non_nullable
                      as String,
            name: null == name
                ? _value.name
                : name // ignore: cast_nullable_to_non_nullable
                      as String,
            email: freezed == email
                ? _value.email
                : email // ignore: cast_nullable_to_non_nullable
                      as String?,
            createdAt: freezed == createdAt
                ? _value.createdAt
                : createdAt // ignore: cast_nullable_to_non_nullable
                      as String?,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$StaffMemberImplCopyWith<$Res>
    implements $StaffMemberCopyWith<$Res> {
  factory _$$StaffMemberImplCopyWith(
    _$StaffMemberImpl value,
    $Res Function(_$StaffMemberImpl) then,
  ) = __$$StaffMemberImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({String uid, String name, String? email, String? createdAt});
}

/// @nodoc
class __$$StaffMemberImplCopyWithImpl<$Res>
    extends _$StaffMemberCopyWithImpl<$Res, _$StaffMemberImpl>
    implements _$$StaffMemberImplCopyWith<$Res> {
  __$$StaffMemberImplCopyWithImpl(
    _$StaffMemberImpl _value,
    $Res Function(_$StaffMemberImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of StaffMember
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? uid = null,
    Object? name = null,
    Object? email = freezed,
    Object? createdAt = freezed,
  }) {
    return _then(
      _$StaffMemberImpl(
        uid: null == uid
            ? _value.uid
            : uid // ignore: cast_nullable_to_non_nullable
                  as String,
        name: null == name
            ? _value.name
            : name // ignore: cast_nullable_to_non_nullable
                  as String,
        email: freezed == email
            ? _value.email
            : email // ignore: cast_nullable_to_non_nullable
                  as String?,
        createdAt: freezed == createdAt
            ? _value.createdAt
            : createdAt // ignore: cast_nullable_to_non_nullable
                  as String?,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$StaffMemberImpl implements _StaffMember {
  const _$StaffMemberImpl({
    required this.uid,
    required this.name,
    this.email,
    this.createdAt,
  });

  factory _$StaffMemberImpl.fromJson(Map<String, dynamic> json) =>
      _$$StaffMemberImplFromJson(json);

  @override
  final String uid;
  @override
  final String name;
  @override
  final String? email;
  @override
  final String? createdAt;

  @override
  String toString() {
    return 'StaffMember(uid: $uid, name: $name, email: $email, createdAt: $createdAt)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$StaffMemberImpl &&
            (identical(other.uid, uid) || other.uid == uid) &&
            (identical(other.name, name) || other.name == name) &&
            (identical(other.email, email) || other.email == email) &&
            (identical(other.createdAt, createdAt) ||
                other.createdAt == createdAt));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(runtimeType, uid, name, email, createdAt);

  /// Create a copy of StaffMember
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$StaffMemberImplCopyWith<_$StaffMemberImpl> get copyWith =>
      __$$StaffMemberImplCopyWithImpl<_$StaffMemberImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$StaffMemberImplToJson(this);
  }
}

abstract class _StaffMember implements StaffMember {
  const factory _StaffMember({
    required final String uid,
    required final String name,
    final String? email,
    final String? createdAt,
  }) = _$StaffMemberImpl;

  factory _StaffMember.fromJson(Map<String, dynamic> json) =
      _$StaffMemberImpl.fromJson;

  @override
  String get uid;
  @override
  String get name;
  @override
  String? get email;
  @override
  String? get createdAt;

  /// Create a copy of StaffMember
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$StaffMemberImplCopyWith<_$StaffMemberImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

StaffCreateResponse _$StaffCreateResponseFromJson(Map<String, dynamic> json) {
  return _StaffCreateResponse.fromJson(json);
}

/// @nodoc
mixin _$StaffCreateResponse {
  String get uid => throw _privateConstructorUsedError;
  String get email => throw _privateConstructorUsedError;
  String get name => throw _privateConstructorUsedError;
  String get tempPassword => throw _privateConstructorUsedError;

  /// Serializes this StaffCreateResponse to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of StaffCreateResponse
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $StaffCreateResponseCopyWith<StaffCreateResponse> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $StaffCreateResponseCopyWith<$Res> {
  factory $StaffCreateResponseCopyWith(
    StaffCreateResponse value,
    $Res Function(StaffCreateResponse) then,
  ) = _$StaffCreateResponseCopyWithImpl<$Res, StaffCreateResponse>;
  @useResult
  $Res call({String uid, String email, String name, String tempPassword});
}

/// @nodoc
class _$StaffCreateResponseCopyWithImpl<$Res, $Val extends StaffCreateResponse>
    implements $StaffCreateResponseCopyWith<$Res> {
  _$StaffCreateResponseCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of StaffCreateResponse
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? uid = null,
    Object? email = null,
    Object? name = null,
    Object? tempPassword = null,
  }) {
    return _then(
      _value.copyWith(
            uid: null == uid
                ? _value.uid
                : uid // ignore: cast_nullable_to_non_nullable
                      as String,
            email: null == email
                ? _value.email
                : email // ignore: cast_nullable_to_non_nullable
                      as String,
            name: null == name
                ? _value.name
                : name // ignore: cast_nullable_to_non_nullable
                      as String,
            tempPassword: null == tempPassword
                ? _value.tempPassword
                : tempPassword // ignore: cast_nullable_to_non_nullable
                      as String,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$StaffCreateResponseImplCopyWith<$Res>
    implements $StaffCreateResponseCopyWith<$Res> {
  factory _$$StaffCreateResponseImplCopyWith(
    _$StaffCreateResponseImpl value,
    $Res Function(_$StaffCreateResponseImpl) then,
  ) = __$$StaffCreateResponseImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({String uid, String email, String name, String tempPassword});
}

/// @nodoc
class __$$StaffCreateResponseImplCopyWithImpl<$Res>
    extends _$StaffCreateResponseCopyWithImpl<$Res, _$StaffCreateResponseImpl>
    implements _$$StaffCreateResponseImplCopyWith<$Res> {
  __$$StaffCreateResponseImplCopyWithImpl(
    _$StaffCreateResponseImpl _value,
    $Res Function(_$StaffCreateResponseImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of StaffCreateResponse
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? uid = null,
    Object? email = null,
    Object? name = null,
    Object? tempPassword = null,
  }) {
    return _then(
      _$StaffCreateResponseImpl(
        uid: null == uid
            ? _value.uid
            : uid // ignore: cast_nullable_to_non_nullable
                  as String,
        email: null == email
            ? _value.email
            : email // ignore: cast_nullable_to_non_nullable
                  as String,
        name: null == name
            ? _value.name
            : name // ignore: cast_nullable_to_non_nullable
                  as String,
        tempPassword: null == tempPassword
            ? _value.tempPassword
            : tempPassword // ignore: cast_nullable_to_non_nullable
                  as String,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$StaffCreateResponseImpl implements _StaffCreateResponse {
  const _$StaffCreateResponseImpl({
    required this.uid,
    required this.email,
    required this.name,
    required this.tempPassword,
  });

  factory _$StaffCreateResponseImpl.fromJson(Map<String, dynamic> json) =>
      _$$StaffCreateResponseImplFromJson(json);

  @override
  final String uid;
  @override
  final String email;
  @override
  final String name;
  @override
  final String tempPassword;

  @override
  String toString() {
    return 'StaffCreateResponse(uid: $uid, email: $email, name: $name, tempPassword: $tempPassword)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$StaffCreateResponseImpl &&
            (identical(other.uid, uid) || other.uid == uid) &&
            (identical(other.email, email) || other.email == email) &&
            (identical(other.name, name) || other.name == name) &&
            (identical(other.tempPassword, tempPassword) ||
                other.tempPassword == tempPassword));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(runtimeType, uid, email, name, tempPassword);

  /// Create a copy of StaffCreateResponse
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$StaffCreateResponseImplCopyWith<_$StaffCreateResponseImpl> get copyWith =>
      __$$StaffCreateResponseImplCopyWithImpl<_$StaffCreateResponseImpl>(
        this,
        _$identity,
      );

  @override
  Map<String, dynamic> toJson() {
    return _$$StaffCreateResponseImplToJson(this);
  }
}

abstract class _StaffCreateResponse implements StaffCreateResponse {
  const factory _StaffCreateResponse({
    required final String uid,
    required final String email,
    required final String name,
    required final String tempPassword,
  }) = _$StaffCreateResponseImpl;

  factory _StaffCreateResponse.fromJson(Map<String, dynamic> json) =
      _$StaffCreateResponseImpl.fromJson;

  @override
  String get uid;
  @override
  String get email;
  @override
  String get name;
  @override
  String get tempPassword;

  /// Create a copy of StaffCreateResponse
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$StaffCreateResponseImplCopyWith<_$StaffCreateResponseImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
