// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'tenant.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
  'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models',
);

Tenant _$TenantFromJson(Map<String, dynamic> json) {
  return _Tenant.fromJson(json);
}

/// @nodoc
mixin _$Tenant {
  String get uid => throw _privateConstructorUsedError;
  String get name => throw _privateConstructorUsedError;
  String? get email => throw _privateConstructorUsedError;
  String? get phone => throw _privateConstructorUsedError;
  String? get pgId => throw _privateConstructorUsedError;
  String? get roomId => throw _privateConstructorUsedError;
  String? get status => throw _privateConstructorUsedError;
  String? get moveInDate => throw _privateConstructorUsedError;
  bool get noticeGiven => throw _privateConstructorUsedError;
  String? get noticeDate => throw _privateConstructorUsedError;
  String? get moveOutDate => throw _privateConstructorUsedError;
  String? get roomNumber => throw _privateConstructorUsedError;
  num? get rentAmount => throw _privateConstructorUsedError;

  /// Serializes this Tenant to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of Tenant
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $TenantCopyWith<Tenant> get copyWith => throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $TenantCopyWith<$Res> {
  factory $TenantCopyWith(Tenant value, $Res Function(Tenant) then) =
      _$TenantCopyWithImpl<$Res, Tenant>;
  @useResult
  $Res call({
    String uid,
    String name,
    String? email,
    String? phone,
    String? pgId,
    String? roomId,
    String? status,
    String? moveInDate,
    bool noticeGiven,
    String? noticeDate,
    String? moveOutDate,
    String? roomNumber,
    num? rentAmount,
  });
}

/// @nodoc
class _$TenantCopyWithImpl<$Res, $Val extends Tenant>
    implements $TenantCopyWith<$Res> {
  _$TenantCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of Tenant
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? uid = null,
    Object? name = null,
    Object? email = freezed,
    Object? phone = freezed,
    Object? pgId = freezed,
    Object? roomId = freezed,
    Object? status = freezed,
    Object? moveInDate = freezed,
    Object? noticeGiven = null,
    Object? noticeDate = freezed,
    Object? moveOutDate = freezed,
    Object? roomNumber = freezed,
    Object? rentAmount = freezed,
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
            phone: freezed == phone
                ? _value.phone
                : phone // ignore: cast_nullable_to_non_nullable
                      as String?,
            pgId: freezed == pgId
                ? _value.pgId
                : pgId // ignore: cast_nullable_to_non_nullable
                      as String?,
            roomId: freezed == roomId
                ? _value.roomId
                : roomId // ignore: cast_nullable_to_non_nullable
                      as String?,
            status: freezed == status
                ? _value.status
                : status // ignore: cast_nullable_to_non_nullable
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
abstract class _$$TenantImplCopyWith<$Res> implements $TenantCopyWith<$Res> {
  factory _$$TenantImplCopyWith(
    _$TenantImpl value,
    $Res Function(_$TenantImpl) then,
  ) = __$$TenantImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    String uid,
    String name,
    String? email,
    String? phone,
    String? pgId,
    String? roomId,
    String? status,
    String? moveInDate,
    bool noticeGiven,
    String? noticeDate,
    String? moveOutDate,
    String? roomNumber,
    num? rentAmount,
  });
}

/// @nodoc
class __$$TenantImplCopyWithImpl<$Res>
    extends _$TenantCopyWithImpl<$Res, _$TenantImpl>
    implements _$$TenantImplCopyWith<$Res> {
  __$$TenantImplCopyWithImpl(
    _$TenantImpl _value,
    $Res Function(_$TenantImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of Tenant
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? uid = null,
    Object? name = null,
    Object? email = freezed,
    Object? phone = freezed,
    Object? pgId = freezed,
    Object? roomId = freezed,
    Object? status = freezed,
    Object? moveInDate = freezed,
    Object? noticeGiven = null,
    Object? noticeDate = freezed,
    Object? moveOutDate = freezed,
    Object? roomNumber = freezed,
    Object? rentAmount = freezed,
  }) {
    return _then(
      _$TenantImpl(
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
        phone: freezed == phone
            ? _value.phone
            : phone // ignore: cast_nullable_to_non_nullable
                  as String?,
        pgId: freezed == pgId
            ? _value.pgId
            : pgId // ignore: cast_nullable_to_non_nullable
                  as String?,
        roomId: freezed == roomId
            ? _value.roomId
            : roomId // ignore: cast_nullable_to_non_nullable
                  as String?,
        status: freezed == status
            ? _value.status
            : status // ignore: cast_nullable_to_non_nullable
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
class _$TenantImpl implements _Tenant {
  const _$TenantImpl({
    required this.uid,
    required this.name,
    this.email,
    this.phone,
    this.pgId,
    this.roomId,
    this.status,
    this.moveInDate,
    this.noticeGiven = false,
    this.noticeDate,
    this.moveOutDate,
    this.roomNumber,
    this.rentAmount,
  });

  factory _$TenantImpl.fromJson(Map<String, dynamic> json) =>
      _$$TenantImplFromJson(json);

  @override
  final String uid;
  @override
  final String name;
  @override
  final String? email;
  @override
  final String? phone;
  @override
  final String? pgId;
  @override
  final String? roomId;
  @override
  final String? status;
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
  final String? roomNumber;
  @override
  final num? rentAmount;

  @override
  String toString() {
    return 'Tenant(uid: $uid, name: $name, email: $email, phone: $phone, pgId: $pgId, roomId: $roomId, status: $status, moveInDate: $moveInDate, noticeGiven: $noticeGiven, noticeDate: $noticeDate, moveOutDate: $moveOutDate, roomNumber: $roomNumber, rentAmount: $rentAmount)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$TenantImpl &&
            (identical(other.uid, uid) || other.uid == uid) &&
            (identical(other.name, name) || other.name == name) &&
            (identical(other.email, email) || other.email == email) &&
            (identical(other.phone, phone) || other.phone == phone) &&
            (identical(other.pgId, pgId) || other.pgId == pgId) &&
            (identical(other.roomId, roomId) || other.roomId == roomId) &&
            (identical(other.status, status) || other.status == status) &&
            (identical(other.moveInDate, moveInDate) ||
                other.moveInDate == moveInDate) &&
            (identical(other.noticeGiven, noticeGiven) ||
                other.noticeGiven == noticeGiven) &&
            (identical(other.noticeDate, noticeDate) ||
                other.noticeDate == noticeDate) &&
            (identical(other.moveOutDate, moveOutDate) ||
                other.moveOutDate == moveOutDate) &&
            (identical(other.roomNumber, roomNumber) ||
                other.roomNumber == roomNumber) &&
            (identical(other.rentAmount, rentAmount) ||
                other.rentAmount == rentAmount));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
    runtimeType,
    uid,
    name,
    email,
    phone,
    pgId,
    roomId,
    status,
    moveInDate,
    noticeGiven,
    noticeDate,
    moveOutDate,
    roomNumber,
    rentAmount,
  );

  /// Create a copy of Tenant
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$TenantImplCopyWith<_$TenantImpl> get copyWith =>
      __$$TenantImplCopyWithImpl<_$TenantImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$TenantImplToJson(this);
  }
}

abstract class _Tenant implements Tenant {
  const factory _Tenant({
    required final String uid,
    required final String name,
    final String? email,
    final String? phone,
    final String? pgId,
    final String? roomId,
    final String? status,
    final String? moveInDate,
    final bool noticeGiven,
    final String? noticeDate,
    final String? moveOutDate,
    final String? roomNumber,
    final num? rentAmount,
  }) = _$TenantImpl;

  factory _Tenant.fromJson(Map<String, dynamic> json) = _$TenantImpl.fromJson;

  @override
  String get uid;
  @override
  String get name;
  @override
  String? get email;
  @override
  String? get phone;
  @override
  String? get pgId;
  @override
  String? get roomId;
  @override
  String? get status;
  @override
  String? get moveInDate;
  @override
  bool get noticeGiven;
  @override
  String? get noticeDate;
  @override
  String? get moveOutDate;
  @override
  String? get roomNumber;
  @override
  num? get rentAmount;

  /// Create a copy of Tenant
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$TenantImplCopyWith<_$TenantImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

TenantSearchResponse _$TenantSearchResponseFromJson(Map<String, dynamic> json) {
  return _TenantSearchResponse.fromJson(json);
}

/// @nodoc
mixin _$TenantSearchResponse {
  List<SearchTenant> get results => throw _privateConstructorUsedError;
  int get totalUnassigned => throw _privateConstructorUsedError;
  int get totalMatches => throw _privateConstructorUsedError;

  /// Serializes this TenantSearchResponse to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of TenantSearchResponse
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $TenantSearchResponseCopyWith<TenantSearchResponse> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $TenantSearchResponseCopyWith<$Res> {
  factory $TenantSearchResponseCopyWith(
    TenantSearchResponse value,
    $Res Function(TenantSearchResponse) then,
  ) = _$TenantSearchResponseCopyWithImpl<$Res, TenantSearchResponse>;
  @useResult
  $Res call({
    List<SearchTenant> results,
    int totalUnassigned,
    int totalMatches,
  });
}

/// @nodoc
class _$TenantSearchResponseCopyWithImpl<
  $Res,
  $Val extends TenantSearchResponse
>
    implements $TenantSearchResponseCopyWith<$Res> {
  _$TenantSearchResponseCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of TenantSearchResponse
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? results = null,
    Object? totalUnassigned = null,
    Object? totalMatches = null,
  }) {
    return _then(
      _value.copyWith(
            results: null == results
                ? _value.results
                : results // ignore: cast_nullable_to_non_nullable
                      as List<SearchTenant>,
            totalUnassigned: null == totalUnassigned
                ? _value.totalUnassigned
                : totalUnassigned // ignore: cast_nullable_to_non_nullable
                      as int,
            totalMatches: null == totalMatches
                ? _value.totalMatches
                : totalMatches // ignore: cast_nullable_to_non_nullable
                      as int,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$TenantSearchResponseImplCopyWith<$Res>
    implements $TenantSearchResponseCopyWith<$Res> {
  factory _$$TenantSearchResponseImplCopyWith(
    _$TenantSearchResponseImpl value,
    $Res Function(_$TenantSearchResponseImpl) then,
  ) = __$$TenantSearchResponseImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    List<SearchTenant> results,
    int totalUnassigned,
    int totalMatches,
  });
}

/// @nodoc
class __$$TenantSearchResponseImplCopyWithImpl<$Res>
    extends _$TenantSearchResponseCopyWithImpl<$Res, _$TenantSearchResponseImpl>
    implements _$$TenantSearchResponseImplCopyWith<$Res> {
  __$$TenantSearchResponseImplCopyWithImpl(
    _$TenantSearchResponseImpl _value,
    $Res Function(_$TenantSearchResponseImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of TenantSearchResponse
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? results = null,
    Object? totalUnassigned = null,
    Object? totalMatches = null,
  }) {
    return _then(
      _$TenantSearchResponseImpl(
        results: null == results
            ? _value._results
            : results // ignore: cast_nullable_to_non_nullable
                  as List<SearchTenant>,
        totalUnassigned: null == totalUnassigned
            ? _value.totalUnassigned
            : totalUnassigned // ignore: cast_nullable_to_non_nullable
                  as int,
        totalMatches: null == totalMatches
            ? _value.totalMatches
            : totalMatches // ignore: cast_nullable_to_non_nullable
                  as int,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$TenantSearchResponseImpl implements _TenantSearchResponse {
  const _$TenantSearchResponseImpl({
    final List<SearchTenant> results = const [],
    this.totalUnassigned = 0,
    this.totalMatches = 0,
  }) : _results = results;

  factory _$TenantSearchResponseImpl.fromJson(Map<String, dynamic> json) =>
      _$$TenantSearchResponseImplFromJson(json);

  final List<SearchTenant> _results;
  @override
  @JsonKey()
  List<SearchTenant> get results {
    if (_results is EqualUnmodifiableListView) return _results;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_results);
  }

  @override
  @JsonKey()
  final int totalUnassigned;
  @override
  @JsonKey()
  final int totalMatches;

  @override
  String toString() {
    return 'TenantSearchResponse(results: $results, totalUnassigned: $totalUnassigned, totalMatches: $totalMatches)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$TenantSearchResponseImpl &&
            const DeepCollectionEquality().equals(other._results, _results) &&
            (identical(other.totalUnassigned, totalUnassigned) ||
                other.totalUnassigned == totalUnassigned) &&
            (identical(other.totalMatches, totalMatches) ||
                other.totalMatches == totalMatches));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
    runtimeType,
    const DeepCollectionEquality().hash(_results),
    totalUnassigned,
    totalMatches,
  );

  /// Create a copy of TenantSearchResponse
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$TenantSearchResponseImplCopyWith<_$TenantSearchResponseImpl>
  get copyWith =>
      __$$TenantSearchResponseImplCopyWithImpl<_$TenantSearchResponseImpl>(
        this,
        _$identity,
      );

  @override
  Map<String, dynamic> toJson() {
    return _$$TenantSearchResponseImplToJson(this);
  }
}

abstract class _TenantSearchResponse implements TenantSearchResponse {
  const factory _TenantSearchResponse({
    final List<SearchTenant> results,
    final int totalUnassigned,
    final int totalMatches,
  }) = _$TenantSearchResponseImpl;

  factory _TenantSearchResponse.fromJson(Map<String, dynamic> json) =
      _$TenantSearchResponseImpl.fromJson;

  @override
  List<SearchTenant> get results;
  @override
  int get totalUnassigned;
  @override
  int get totalMatches;

  /// Create a copy of TenantSearchResponse
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$TenantSearchResponseImplCopyWith<_$TenantSearchResponseImpl>
  get copyWith => throw _privateConstructorUsedError;
}

SearchTenant _$SearchTenantFromJson(Map<String, dynamic> json) {
  return _SearchTenant.fromJson(json);
}

/// @nodoc
mixin _$SearchTenant {
  String get uid => throw _privateConstructorUsedError;
  String get name => throw _privateConstructorUsedError;
  String? get email => throw _privateConstructorUsedError;
  String? get phone => throw _privateConstructorUsedError;
  String? get pgId => throw _privateConstructorUsedError;
  bool get assigned => throw _privateConstructorUsedError;
  String? get createdAt => throw _privateConstructorUsedError;

  /// Serializes this SearchTenant to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of SearchTenant
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $SearchTenantCopyWith<SearchTenant> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $SearchTenantCopyWith<$Res> {
  factory $SearchTenantCopyWith(
    SearchTenant value,
    $Res Function(SearchTenant) then,
  ) = _$SearchTenantCopyWithImpl<$Res, SearchTenant>;
  @useResult
  $Res call({
    String uid,
    String name,
    String? email,
    String? phone,
    String? pgId,
    bool assigned,
    String? createdAt,
  });
}

/// @nodoc
class _$SearchTenantCopyWithImpl<$Res, $Val extends SearchTenant>
    implements $SearchTenantCopyWith<$Res> {
  _$SearchTenantCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of SearchTenant
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? uid = null,
    Object? name = null,
    Object? email = freezed,
    Object? phone = freezed,
    Object? pgId = freezed,
    Object? assigned = null,
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
            phone: freezed == phone
                ? _value.phone
                : phone // ignore: cast_nullable_to_non_nullable
                      as String?,
            pgId: freezed == pgId
                ? _value.pgId
                : pgId // ignore: cast_nullable_to_non_nullable
                      as String?,
            assigned: null == assigned
                ? _value.assigned
                : assigned // ignore: cast_nullable_to_non_nullable
                      as bool,
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
abstract class _$$SearchTenantImplCopyWith<$Res>
    implements $SearchTenantCopyWith<$Res> {
  factory _$$SearchTenantImplCopyWith(
    _$SearchTenantImpl value,
    $Res Function(_$SearchTenantImpl) then,
  ) = __$$SearchTenantImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    String uid,
    String name,
    String? email,
    String? phone,
    String? pgId,
    bool assigned,
    String? createdAt,
  });
}

/// @nodoc
class __$$SearchTenantImplCopyWithImpl<$Res>
    extends _$SearchTenantCopyWithImpl<$Res, _$SearchTenantImpl>
    implements _$$SearchTenantImplCopyWith<$Res> {
  __$$SearchTenantImplCopyWithImpl(
    _$SearchTenantImpl _value,
    $Res Function(_$SearchTenantImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of SearchTenant
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? uid = null,
    Object? name = null,
    Object? email = freezed,
    Object? phone = freezed,
    Object? pgId = freezed,
    Object? assigned = null,
    Object? createdAt = freezed,
  }) {
    return _then(
      _$SearchTenantImpl(
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
        phone: freezed == phone
            ? _value.phone
            : phone // ignore: cast_nullable_to_non_nullable
                  as String?,
        pgId: freezed == pgId
            ? _value.pgId
            : pgId // ignore: cast_nullable_to_non_nullable
                  as String?,
        assigned: null == assigned
            ? _value.assigned
            : assigned // ignore: cast_nullable_to_non_nullable
                  as bool,
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
class _$SearchTenantImpl implements _SearchTenant {
  const _$SearchTenantImpl({
    required this.uid,
    required this.name,
    this.email,
    this.phone,
    this.pgId,
    this.assigned = false,
    this.createdAt,
  });

  factory _$SearchTenantImpl.fromJson(Map<String, dynamic> json) =>
      _$$SearchTenantImplFromJson(json);

  @override
  final String uid;
  @override
  final String name;
  @override
  final String? email;
  @override
  final String? phone;
  @override
  final String? pgId;
  @override
  @JsonKey()
  final bool assigned;
  @override
  final String? createdAt;

  @override
  String toString() {
    return 'SearchTenant(uid: $uid, name: $name, email: $email, phone: $phone, pgId: $pgId, assigned: $assigned, createdAt: $createdAt)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$SearchTenantImpl &&
            (identical(other.uid, uid) || other.uid == uid) &&
            (identical(other.name, name) || other.name == name) &&
            (identical(other.email, email) || other.email == email) &&
            (identical(other.phone, phone) || other.phone == phone) &&
            (identical(other.pgId, pgId) || other.pgId == pgId) &&
            (identical(other.assigned, assigned) ||
                other.assigned == assigned) &&
            (identical(other.createdAt, createdAt) ||
                other.createdAt == createdAt));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
    runtimeType,
    uid,
    name,
    email,
    phone,
    pgId,
    assigned,
    createdAt,
  );

  /// Create a copy of SearchTenant
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$SearchTenantImplCopyWith<_$SearchTenantImpl> get copyWith =>
      __$$SearchTenantImplCopyWithImpl<_$SearchTenantImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$SearchTenantImplToJson(this);
  }
}

abstract class _SearchTenant implements SearchTenant {
  const factory _SearchTenant({
    required final String uid,
    required final String name,
    final String? email,
    final String? phone,
    final String? pgId,
    final bool assigned,
    final String? createdAt,
  }) = _$SearchTenantImpl;

  factory _SearchTenant.fromJson(Map<String, dynamic> json) =
      _$SearchTenantImpl.fromJson;

  @override
  String get uid;
  @override
  String get name;
  @override
  String? get email;
  @override
  String? get phone;
  @override
  String? get pgId;
  @override
  bool get assigned;
  @override
  String? get createdAt;

  /// Create a copy of SearchTenant
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$SearchTenantImplCopyWith<_$SearchTenantImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
