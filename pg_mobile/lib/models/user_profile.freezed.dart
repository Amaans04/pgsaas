// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'user_profile.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
  'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models',
);

TenantRecord _$TenantRecordFromJson(Map<String, dynamic> json) {
  return _TenantRecord.fromJson(json);
}

/// @nodoc
mixin _$TenantRecord {
  String? get pgId => throw _privateConstructorUsedError;
  String? get roomId => throw _privateConstructorUsedError;
  String? get moveInDate => throw _privateConstructorUsedError;
  bool get noticeGiven => throw _privateConstructorUsedError;
  String? get noticeDate => throw _privateConstructorUsedError;
  String? get moveOutDate => throw _privateConstructorUsedError;
  String? get status => throw _privateConstructorUsedError;
  String? get roomNumber => throw _privateConstructorUsedError;
  num? get rentAmount => throw _privateConstructorUsedError;

  /// Serializes this TenantRecord to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of TenantRecord
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $TenantRecordCopyWith<TenantRecord> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $TenantRecordCopyWith<$Res> {
  factory $TenantRecordCopyWith(
    TenantRecord value,
    $Res Function(TenantRecord) then,
  ) = _$TenantRecordCopyWithImpl<$Res, TenantRecord>;
  @useResult
  $Res call({
    String? pgId,
    String? roomId,
    String? moveInDate,
    bool noticeGiven,
    String? noticeDate,
    String? moveOutDate,
    String? status,
    String? roomNumber,
    num? rentAmount,
  });
}

/// @nodoc
class _$TenantRecordCopyWithImpl<$Res, $Val extends TenantRecord>
    implements $TenantRecordCopyWith<$Res> {
  _$TenantRecordCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of TenantRecord
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? pgId = freezed,
    Object? roomId = freezed,
    Object? moveInDate = freezed,
    Object? noticeGiven = null,
    Object? noticeDate = freezed,
    Object? moveOutDate = freezed,
    Object? status = freezed,
    Object? roomNumber = freezed,
    Object? rentAmount = freezed,
  }) {
    return _then(
      _value.copyWith(
            pgId: freezed == pgId
                ? _value.pgId
                : pgId // ignore: cast_nullable_to_non_nullable
                      as String?,
            roomId: freezed == roomId
                ? _value.roomId
                : roomId // ignore: cast_nullable_to_non_nullable
                      as String?,
            moveInDate: freezed == moveInDate
                ? _value.moveInDate
                : moveInDate // ignore: cast_nullable_to_non_nullable
                      as String?,
            noticeGiven: null == noticeGiven
                ? _value.noticeGiven
                : noticeGiven // ignore: cast_nullable_to_non_nullable
                      as bool,
            noticeDate: freezed == noticeDate
                ? _value.noticeDate
                : noticeDate // ignore: cast_nullable_to_non_nullable
                      as String?,
            moveOutDate: freezed == moveOutDate
                ? _value.moveOutDate
                : moveOutDate // ignore: cast_nullable_to_non_nullable
                      as String?,
            status: freezed == status
                ? _value.status
                : status // ignore: cast_nullable_to_non_nullable
                      as String?,
            roomNumber: freezed == roomNumber
                ? _value.roomNumber
                : roomNumber // ignore: cast_nullable_to_non_nullable
                      as String?,
            rentAmount: freezed == rentAmount
                ? _value.rentAmount
                : rentAmount // ignore: cast_nullable_to_non_nullable
                      as num?,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$TenantRecordImplCopyWith<$Res>
    implements $TenantRecordCopyWith<$Res> {
  factory _$$TenantRecordImplCopyWith(
    _$TenantRecordImpl value,
    $Res Function(_$TenantRecordImpl) then,
  ) = __$$TenantRecordImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    String? pgId,
    String? roomId,
    String? moveInDate,
    bool noticeGiven,
    String? noticeDate,
    String? moveOutDate,
    String? status,
    String? roomNumber,
    num? rentAmount,
  });
}

/// @nodoc
class __$$TenantRecordImplCopyWithImpl<$Res>
    extends _$TenantRecordCopyWithImpl<$Res, _$TenantRecordImpl>
    implements _$$TenantRecordImplCopyWith<$Res> {
  __$$TenantRecordImplCopyWithImpl(
    _$TenantRecordImpl _value,
    $Res Function(_$TenantRecordImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of TenantRecord
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? pgId = freezed,
    Object? roomId = freezed,
    Object? moveInDate = freezed,
    Object? noticeGiven = null,
    Object? noticeDate = freezed,
    Object? moveOutDate = freezed,
    Object? status = freezed,
    Object? roomNumber = freezed,
    Object? rentAmount = freezed,
  }) {
    return _then(
      _$TenantRecordImpl(
        pgId: freezed == pgId
            ? _value.pgId
            : pgId // ignore: cast_nullable_to_non_nullable
                  as String?,
        roomId: freezed == roomId
            ? _value.roomId
            : roomId // ignore: cast_nullable_to_non_nullable
                  as String?,
        moveInDate: freezed == moveInDate
            ? _value.moveInDate
            : moveInDate // ignore: cast_nullable_to_non_nullable
                  as String?,
        noticeGiven: null == noticeGiven
            ? _value.noticeGiven
            : noticeGiven // ignore: cast_nullable_to_non_nullable
                  as bool,
        noticeDate: freezed == noticeDate
            ? _value.noticeDate
            : noticeDate // ignore: cast_nullable_to_non_nullable
                  as String?,
        moveOutDate: freezed == moveOutDate
            ? _value.moveOutDate
            : moveOutDate // ignore: cast_nullable_to_non_nullable
                  as String?,
        status: freezed == status
            ? _value.status
            : status // ignore: cast_nullable_to_non_nullable
                  as String?,
        roomNumber: freezed == roomNumber
            ? _value.roomNumber
            : roomNumber // ignore: cast_nullable_to_non_nullable
                  as String?,
        rentAmount: freezed == rentAmount
            ? _value.rentAmount
            : rentAmount // ignore: cast_nullable_to_non_nullable
                  as num?,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$TenantRecordImpl implements _TenantRecord {
  const _$TenantRecordImpl({
    this.pgId,
    this.roomId,
    this.moveInDate,
    this.noticeGiven = false,
    this.noticeDate,
    this.moveOutDate,
    this.status,
    this.roomNumber,
    this.rentAmount,
  });

  factory _$TenantRecordImpl.fromJson(Map<String, dynamic> json) =>
      _$$TenantRecordImplFromJson(json);

  @override
  final String? pgId;
  @override
  final String? roomId;
  @override
  final String? moveInDate;
  @override
  @JsonKey()
  final bool noticeGiven;
  @override
  final String? noticeDate;
  @override
  final String? moveOutDate;
  @override
  final String? status;
  @override
  final String? roomNumber;
  @override
  final num? rentAmount;

  @override
  String toString() {
    return 'TenantRecord(pgId: $pgId, roomId: $roomId, moveInDate: $moveInDate, noticeGiven: $noticeGiven, noticeDate: $noticeDate, moveOutDate: $moveOutDate, status: $status, roomNumber: $roomNumber, rentAmount: $rentAmount)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$TenantRecordImpl &&
            (identical(other.pgId, pgId) || other.pgId == pgId) &&
            (identical(other.roomId, roomId) || other.roomId == roomId) &&
            (identical(other.moveInDate, moveInDate) ||
                other.moveInDate == moveInDate) &&
            (identical(other.noticeGiven, noticeGiven) ||
                other.noticeGiven == noticeGiven) &&
            (identical(other.noticeDate, noticeDate) ||
                other.noticeDate == noticeDate) &&
            (identical(other.moveOutDate, moveOutDate) ||
                other.moveOutDate == moveOutDate) &&
            (identical(other.status, status) || other.status == status) &&
            (identical(other.roomNumber, roomNumber) ||
                other.roomNumber == roomNumber) &&
            (identical(other.rentAmount, rentAmount) ||
                other.rentAmount == rentAmount));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
    runtimeType,
    pgId,
    roomId,
    moveInDate,
    noticeGiven,
    noticeDate,
    moveOutDate,
    status,
    roomNumber,
    rentAmount,
  );

  /// Create a copy of TenantRecord
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$TenantRecordImplCopyWith<_$TenantRecordImpl> get copyWith =>
      __$$TenantRecordImplCopyWithImpl<_$TenantRecordImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$TenantRecordImplToJson(this);
  }
}

abstract class _TenantRecord implements TenantRecord {
  const factory _TenantRecord({
    final String? pgId,
    final String? roomId,
    final String? moveInDate,
    final bool noticeGiven,
    final String? noticeDate,
    final String? moveOutDate,
    final String? status,
    final String? roomNumber,
    final num? rentAmount,
  }) = _$TenantRecordImpl;

  factory _TenantRecord.fromJson(Map<String, dynamic> json) =
      _$TenantRecordImpl.fromJson;

  @override
  String? get pgId;
  @override
  String? get roomId;
  @override
  String? get moveInDate;
  @override
  bool get noticeGiven;
  @override
  String? get noticeDate;
  @override
  String? get moveOutDate;
  @override
  String? get status;
  @override
  String? get roomNumber;
  @override
  num? get rentAmount;

  /// Create a copy of TenantRecord
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$TenantRecordImplCopyWith<_$TenantRecordImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

UserProfile _$UserProfileFromJson(Map<String, dynamic> json) {
  return _UserProfile.fromJson(json);
}

/// @nodoc
mixin _$UserProfile {
  String get uid => throw _privateConstructorUsedError;
  String? get email => throw _privateConstructorUsedError;
  String? get role => throw _privateConstructorUsedError;
  String? get name => throw _privateConstructorUsedError;
  String? get phone => throw _privateConstructorUsedError;
  String? get photoURL => throw _privateConstructorUsedError;
  String? get pgId => throw _privateConstructorUsedError;
  bool get onboarded => throw _privateConstructorUsedError;
  bool get hasPhone => throw _privateConstructorUsedError;
  bool get isAdmin => throw _privateConstructorUsedError;
  bool get needsPasswordSetup => throw _privateConstructorUsedError;
  Pg? get pg => throw _privateConstructorUsedError;
  TenantRecord? get tenant => throw _privateConstructorUsedError;
  String? get createdAt => throw _privateConstructorUsedError;

  /// Serializes this UserProfile to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of UserProfile
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $UserProfileCopyWith<UserProfile> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $UserProfileCopyWith<$Res> {
  factory $UserProfileCopyWith(
    UserProfile value,
    $Res Function(UserProfile) then,
  ) = _$UserProfileCopyWithImpl<$Res, UserProfile>;
  @useResult
  $Res call({
    String uid,
    String? email,
    String? role,
    String? name,
    String? phone,
    String? photoURL,
    String? pgId,
    bool onboarded,
    bool hasPhone,
    bool isAdmin,
    bool needsPasswordSetup,
    Pg? pg,
    TenantRecord? tenant,
    String? createdAt,
  });

  $PgCopyWith<$Res>? get pg;
  $TenantRecordCopyWith<$Res>? get tenant;
}

/// @nodoc
class _$UserProfileCopyWithImpl<$Res, $Val extends UserProfile>
    implements $UserProfileCopyWith<$Res> {
  _$UserProfileCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of UserProfile
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? uid = null,
    Object? email = freezed,
    Object? role = freezed,
    Object? name = freezed,
    Object? phone = freezed,
    Object? photoURL = freezed,
    Object? pgId = freezed,
    Object? onboarded = null,
    Object? hasPhone = null,
    Object? isAdmin = null,
    Object? needsPasswordSetup = null,
    Object? pg = freezed,
    Object? tenant = freezed,
    Object? createdAt = freezed,
  }) {
    return _then(
      _value.copyWith(
            uid: null == uid
                ? _value.uid
                : uid // ignore: cast_nullable_to_non_nullable
                      as String,
            email: freezed == email
                ? _value.email
                : email // ignore: cast_nullable_to_non_nullable
                      as String?,
            role: freezed == role
                ? _value.role
                : role // ignore: cast_nullable_to_non_nullable
                      as String?,
            name: freezed == name
                ? _value.name
                : name // ignore: cast_nullable_to_non_nullable
                      as String?,
            phone: freezed == phone
                ? _value.phone
                : phone // ignore: cast_nullable_to_non_nullable
                      as String?,
            photoURL: freezed == photoURL
                ? _value.photoURL
                : photoURL // ignore: cast_nullable_to_non_nullable
                      as String?,
            pgId: freezed == pgId
                ? _value.pgId
                : pgId // ignore: cast_nullable_to_non_nullable
                      as String?,
            onboarded: null == onboarded
                ? _value.onboarded
                : onboarded // ignore: cast_nullable_to_non_nullable
                      as bool,
            hasPhone: null == hasPhone
                ? _value.hasPhone
                : hasPhone // ignore: cast_nullable_to_non_nullable
                      as bool,
            isAdmin: null == isAdmin
                ? _value.isAdmin
                : isAdmin // ignore: cast_nullable_to_non_nullable
                      as bool,
            needsPasswordSetup: null == needsPasswordSetup
                ? _value.needsPasswordSetup
                : needsPasswordSetup // ignore: cast_nullable_to_non_nullable
                      as bool,
            pg: freezed == pg
                ? _value.pg
                : pg // ignore: cast_nullable_to_non_nullable
                      as Pg?,
            tenant: freezed == tenant
                ? _value.tenant
                : tenant // ignore: cast_nullable_to_non_nullable
                      as TenantRecord?,
            createdAt: freezed == createdAt
                ? _value.createdAt
                : createdAt // ignore: cast_nullable_to_non_nullable
                      as String?,
          )
          as $Val,
    );
  }

  /// Create a copy of UserProfile
  /// with the given fields replaced by the non-null parameter values.
  @override
  @pragma('vm:prefer-inline')
  $PgCopyWith<$Res>? get pg {
    if (_value.pg == null) {
      return null;
    }

    return $PgCopyWith<$Res>(_value.pg!, (value) {
      return _then(_value.copyWith(pg: value) as $Val);
    });
  }

  /// Create a copy of UserProfile
  /// with the given fields replaced by the non-null parameter values.
  @override
  @pragma('vm:prefer-inline')
  $TenantRecordCopyWith<$Res>? get tenant {
    if (_value.tenant == null) {
      return null;
    }

    return $TenantRecordCopyWith<$Res>(_value.tenant!, (value) {
      return _then(_value.copyWith(tenant: value) as $Val);
    });
  }
}

/// @nodoc
abstract class _$$UserProfileImplCopyWith<$Res>
    implements $UserProfileCopyWith<$Res> {
  factory _$$UserProfileImplCopyWith(
    _$UserProfileImpl value,
    $Res Function(_$UserProfileImpl) then,
  ) = __$$UserProfileImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    String uid,
    String? email,
    String? role,
    String? name,
    String? phone,
    String? photoURL,
    String? pgId,
    bool onboarded,
    bool hasPhone,
    bool isAdmin,
    bool needsPasswordSetup,
    Pg? pg,
    TenantRecord? tenant,
    String? createdAt,
  });

  @override
  $PgCopyWith<$Res>? get pg;
  @override
  $TenantRecordCopyWith<$Res>? get tenant;
}

/// @nodoc
class __$$UserProfileImplCopyWithImpl<$Res>
    extends _$UserProfileCopyWithImpl<$Res, _$UserProfileImpl>
    implements _$$UserProfileImplCopyWith<$Res> {
  __$$UserProfileImplCopyWithImpl(
    _$UserProfileImpl _value,
    $Res Function(_$UserProfileImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of UserProfile
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? uid = null,
    Object? email = freezed,
    Object? role = freezed,
    Object? name = freezed,
    Object? phone = freezed,
    Object? photoURL = freezed,
    Object? pgId = freezed,
    Object? onboarded = null,
    Object? hasPhone = null,
    Object? isAdmin = null,
    Object? needsPasswordSetup = null,
    Object? pg = freezed,
    Object? tenant = freezed,
    Object? createdAt = freezed,
  }) {
    return _then(
      _$UserProfileImpl(
        uid: null == uid
            ? _value.uid
            : uid // ignore: cast_nullable_to_non_nullable
                  as String,
        email: freezed == email
            ? _value.email
            : email // ignore: cast_nullable_to_non_nullable
                  as String?,
        role: freezed == role
            ? _value.role
            : role // ignore: cast_nullable_to_non_nullable
                  as String?,
        name: freezed == name
            ? _value.name
            : name // ignore: cast_nullable_to_non_nullable
                  as String?,
        phone: freezed == phone
            ? _value.phone
            : phone // ignore: cast_nullable_to_non_nullable
                  as String?,
        photoURL: freezed == photoURL
            ? _value.photoURL
            : photoURL // ignore: cast_nullable_to_non_nullable
                  as String?,
        pgId: freezed == pgId
            ? _value.pgId
            : pgId // ignore: cast_nullable_to_non_nullable
                  as String?,
        onboarded: null == onboarded
            ? _value.onboarded
            : onboarded // ignore: cast_nullable_to_non_nullable
                  as bool,
        hasPhone: null == hasPhone
            ? _value.hasPhone
            : hasPhone // ignore: cast_nullable_to_non_nullable
                  as bool,
        isAdmin: null == isAdmin
            ? _value.isAdmin
            : isAdmin // ignore: cast_nullable_to_non_nullable
                  as bool,
        needsPasswordSetup: null == needsPasswordSetup
            ? _value.needsPasswordSetup
            : needsPasswordSetup // ignore: cast_nullable_to_non_nullable
                  as bool,
        pg: freezed == pg
            ? _value.pg
            : pg // ignore: cast_nullable_to_non_nullable
                  as Pg?,
        tenant: freezed == tenant
            ? _value.tenant
            : tenant // ignore: cast_nullable_to_non_nullable
                  as TenantRecord?,
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
class _$UserProfileImpl implements _UserProfile {
  const _$UserProfileImpl({
    required this.uid,
    this.email,
    this.role,
    this.name,
    this.phone,
    this.photoURL,
    this.pgId,
    this.onboarded = false,
    this.hasPhone = false,
    this.isAdmin = false,
    this.needsPasswordSetup = false,
    this.pg,
    this.tenant,
    this.createdAt,
  });

  factory _$UserProfileImpl.fromJson(Map<String, dynamic> json) =>
      _$$UserProfileImplFromJson(json);

  @override
  final String uid;
  @override
  final String? email;
  @override
  final String? role;
  @override
  final String? name;
  @override
  final String? phone;
  @override
  final String? photoURL;
  @override
  final String? pgId;
  @override
  @JsonKey()
  final bool onboarded;
  @override
  @JsonKey()
  final bool hasPhone;
  @override
  @JsonKey()
  final bool isAdmin;
  @override
  @JsonKey()
  final bool needsPasswordSetup;
  @override
  final Pg? pg;
  @override
  final TenantRecord? tenant;
  @override
  final String? createdAt;

  @override
  String toString() {
    return 'UserProfile(uid: $uid, email: $email, role: $role, name: $name, phone: $phone, photoURL: $photoURL, pgId: $pgId, onboarded: $onboarded, hasPhone: $hasPhone, isAdmin: $isAdmin, needsPasswordSetup: $needsPasswordSetup, pg: $pg, tenant: $tenant, createdAt: $createdAt)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$UserProfileImpl &&
            (identical(other.uid, uid) || other.uid == uid) &&
            (identical(other.email, email) || other.email == email) &&
            (identical(other.role, role) || other.role == role) &&
            (identical(other.name, name) || other.name == name) &&
            (identical(other.phone, phone) || other.phone == phone) &&
            (identical(other.photoURL, photoURL) ||
                other.photoURL == photoURL) &&
            (identical(other.pgId, pgId) || other.pgId == pgId) &&
            (identical(other.onboarded, onboarded) ||
                other.onboarded == onboarded) &&
            (identical(other.hasPhone, hasPhone) ||
                other.hasPhone == hasPhone) &&
            (identical(other.isAdmin, isAdmin) || other.isAdmin == isAdmin) &&
            (identical(other.needsPasswordSetup, needsPasswordSetup) ||
                other.needsPasswordSetup == needsPasswordSetup) &&
            (identical(other.pg, pg) || other.pg == pg) &&
            (identical(other.tenant, tenant) || other.tenant == tenant) &&
            (identical(other.createdAt, createdAt) ||
                other.createdAt == createdAt));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
    runtimeType,
    uid,
    email,
    role,
    name,
    phone,
    photoURL,
    pgId,
    onboarded,
    hasPhone,
    isAdmin,
    needsPasswordSetup,
    pg,
    tenant,
    createdAt,
  );

  /// Create a copy of UserProfile
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$UserProfileImplCopyWith<_$UserProfileImpl> get copyWith =>
      __$$UserProfileImplCopyWithImpl<_$UserProfileImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$UserProfileImplToJson(this);
  }
}

abstract class _UserProfile implements UserProfile {
  const factory _UserProfile({
    required final String uid,
    final String? email,
    final String? role,
    final String? name,
    final String? phone,
    final String? photoURL,
    final String? pgId,
    final bool onboarded,
    final bool hasPhone,
    final bool isAdmin,
    final bool needsPasswordSetup,
    final Pg? pg,
    final TenantRecord? tenant,
    final String? createdAt,
  }) = _$UserProfileImpl;

  factory _UserProfile.fromJson(Map<String, dynamic> json) =
      _$UserProfileImpl.fromJson;

  @override
  String get uid;
  @override
  String? get email;
  @override
  String? get role;
  @override
  String? get name;
  @override
  String? get phone;
  @override
  String? get photoURL;
  @override
  String? get pgId;
  @override
  bool get onboarded;
  @override
  bool get hasPhone;
  @override
  bool get isAdmin;
  @override
  bool get needsPasswordSetup;
  @override
  Pg? get pg;
  @override
  TenantRecord? get tenant;
  @override
  String? get createdAt;

  /// Create a copy of UserProfile
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$UserProfileImplCopyWith<_$UserProfileImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
