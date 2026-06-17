// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'payment.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
  'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models',
);

RentRecord _$RentRecordFromJson(Map<String, dynamic> json) {
  return _RentRecord.fromJson(json);
}

/// @nodoc
mixin _$RentRecord {
  String get id => throw _privateConstructorUsedError;
  String? get tenantId => throw _privateConstructorUsedError;
  String? get pgId => throw _privateConstructorUsedError;
  String? get roomId => throw _privateConstructorUsedError;
  int? get month => throw _privateConstructorUsedError;
  int? get year => throw _privateConstructorUsedError;
  num? get amount => throw _privateConstructorUsedError;
  String? get dueDate => throw _privateConstructorUsedError;
  String? get status => throw _privateConstructorUsedError;
  String? get paymentMethod => throw _privateConstructorUsedError;
  String? get paymentId => throw _privateConstructorUsedError;
  String? get paidAt => throw _privateConstructorUsedError;

  /// Serializes this RentRecord to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of RentRecord
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $RentRecordCopyWith<RentRecord> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $RentRecordCopyWith<$Res> {
  factory $RentRecordCopyWith(
    RentRecord value,
    $Res Function(RentRecord) then,
  ) = _$RentRecordCopyWithImpl<$Res, RentRecord>;
  @useResult
  $Res call({
    String id,
    String? tenantId,
    String? pgId,
    String? roomId,
    int? month,
    int? year,
    num? amount,
    String? dueDate,
    String? status,
    String? paymentMethod,
    String? paymentId,
    String? paidAt,
  });
}

/// @nodoc
class _$RentRecordCopyWithImpl<$Res, $Val extends RentRecord>
    implements $RentRecordCopyWith<$Res> {
  _$RentRecordCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of RentRecord
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? tenantId = freezed,
    Object? pgId = freezed,
    Object? roomId = freezed,
    Object? month = freezed,
    Object? year = freezed,
    Object? amount = freezed,
    Object? dueDate = freezed,
    Object? status = freezed,
    Object? paymentMethod = freezed,
    Object? paymentId = freezed,
    Object? paidAt = freezed,
  }) {
    return _then(
      _value.copyWith(
            id: null == id
                ? _value.id
                : id // ignore: cast_nullable_to_non_nullable
                      as String,
            tenantId: freezed == tenantId
                ? _value.tenantId
                : tenantId // ignore: cast_nullable_to_non_nullable
                      as String?,
            pgId: freezed == pgId
                ? _value.pgId
                : pgId // ignore: cast_nullable_to_non_nullable
                      as String?,
            roomId: freezed == roomId
                ? _value.roomId
                : roomId // ignore: cast_nullable_to_non_nullable
                      as String?,
            month: freezed == month
                ? _value.month
                : month // ignore: cast_nullable_to_non_nullable
                      as int?,
            year: freezed == year
                ? _value.year
                : year // ignore: cast_nullable_to_non_nullable
                      as int?,
            amount: freezed == amount
                ? _value.amount
                : amount // ignore: cast_nullable_to_non_nullable
                      as num?,
            dueDate: freezed == dueDate
                ? _value.dueDate
                : dueDate // ignore: cast_nullable_to_non_nullable
                      as String?,
            status: freezed == status
                ? _value.status
                : status // ignore: cast_nullable_to_non_nullable
                      as String?,
            paymentMethod: freezed == paymentMethod
                ? _value.paymentMethod
                : paymentMethod // ignore: cast_nullable_to_non_nullable
                      as String?,
            paymentId: freezed == paymentId
                ? _value.paymentId
                : paymentId // ignore: cast_nullable_to_non_nullable
                      as String?,
            paidAt: freezed == paidAt
                ? _value.paidAt
                : paidAt // ignore: cast_nullable_to_non_nullable
                      as String?,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$RentRecordImplCopyWith<$Res>
    implements $RentRecordCopyWith<$Res> {
  factory _$$RentRecordImplCopyWith(
    _$RentRecordImpl value,
    $Res Function(_$RentRecordImpl) then,
  ) = __$$RentRecordImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    String id,
    String? tenantId,
    String? pgId,
    String? roomId,
    int? month,
    int? year,
    num? amount,
    String? dueDate,
    String? status,
    String? paymentMethod,
    String? paymentId,
    String? paidAt,
  });
}

/// @nodoc
class __$$RentRecordImplCopyWithImpl<$Res>
    extends _$RentRecordCopyWithImpl<$Res, _$RentRecordImpl>
    implements _$$RentRecordImplCopyWith<$Res> {
  __$$RentRecordImplCopyWithImpl(
    _$RentRecordImpl _value,
    $Res Function(_$RentRecordImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of RentRecord
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? tenantId = freezed,
    Object? pgId = freezed,
    Object? roomId = freezed,
    Object? month = freezed,
    Object? year = freezed,
    Object? amount = freezed,
    Object? dueDate = freezed,
    Object? status = freezed,
    Object? paymentMethod = freezed,
    Object? paymentId = freezed,
    Object? paidAt = freezed,
  }) {
    return _then(
      _$RentRecordImpl(
        id: null == id
            ? _value.id
            : id // ignore: cast_nullable_to_non_nullable
                  as String,
        tenantId: freezed == tenantId
            ? _value.tenantId
            : tenantId // ignore: cast_nullable_to_non_nullable
                  as String?,
        pgId: freezed == pgId
            ? _value.pgId
            : pgId // ignore: cast_nullable_to_non_nullable
                  as String?,
        roomId: freezed == roomId
            ? _value.roomId
            : roomId // ignore: cast_nullable_to_non_nullable
                  as String?,
        month: freezed == month
            ? _value.month
            : month // ignore: cast_nullable_to_non_nullable
                  as int?,
        year: freezed == year
            ? _value.year
            : year // ignore: cast_nullable_to_non_nullable
                  as int?,
        amount: freezed == amount
            ? _value.amount
            : amount // ignore: cast_nullable_to_non_nullable
                  as num?,
        dueDate: freezed == dueDate
            ? _value.dueDate
            : dueDate // ignore: cast_nullable_to_non_nullable
                  as String?,
        status: freezed == status
            ? _value.status
            : status // ignore: cast_nullable_to_non_nullable
                  as String?,
        paymentMethod: freezed == paymentMethod
            ? _value.paymentMethod
            : paymentMethod // ignore: cast_nullable_to_non_nullable
                  as String?,
        paymentId: freezed == paymentId
            ? _value.paymentId
            : paymentId // ignore: cast_nullable_to_non_nullable
                  as String?,
        paidAt: freezed == paidAt
            ? _value.paidAt
            : paidAt // ignore: cast_nullable_to_non_nullable
                  as String?,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$RentRecordImpl implements _RentRecord {
  const _$RentRecordImpl({
    required this.id,
    this.tenantId,
    this.pgId,
    this.roomId,
    this.month,
    this.year,
    this.amount,
    this.dueDate,
    this.status,
    this.paymentMethod,
    this.paymentId,
    this.paidAt,
  });

  factory _$RentRecordImpl.fromJson(Map<String, dynamic> json) =>
      _$$RentRecordImplFromJson(json);

  @override
  final String id;
  @override
  final String? tenantId;
  @override
  final String? pgId;
  @override
  final String? roomId;
  @override
  final int? month;
  @override
  final int? year;
  @override
  final num? amount;
  @override
  final String? dueDate;
  @override
  final String? status;
  @override
  final String? paymentMethod;
  @override
  final String? paymentId;
  @override
  final String? paidAt;

  @override
  String toString() {
    return 'RentRecord(id: $id, tenantId: $tenantId, pgId: $pgId, roomId: $roomId, month: $month, year: $year, amount: $amount, dueDate: $dueDate, status: $status, paymentMethod: $paymentMethod, paymentId: $paymentId, paidAt: $paidAt)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$RentRecordImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.tenantId, tenantId) ||
                other.tenantId == tenantId) &&
            (identical(other.pgId, pgId) || other.pgId == pgId) &&
            (identical(other.roomId, roomId) || other.roomId == roomId) &&
            (identical(other.month, month) || other.month == month) &&
            (identical(other.year, year) || other.year == year) &&
            (identical(other.amount, amount) || other.amount == amount) &&
            (identical(other.dueDate, dueDate) || other.dueDate == dueDate) &&
            (identical(other.status, status) || other.status == status) &&
            (identical(other.paymentMethod, paymentMethod) ||
                other.paymentMethod == paymentMethod) &&
            (identical(other.paymentId, paymentId) ||
                other.paymentId == paymentId) &&
            (identical(other.paidAt, paidAt) || other.paidAt == paidAt));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
    runtimeType,
    id,
    tenantId,
    pgId,
    roomId,
    month,
    year,
    amount,
    dueDate,
    status,
    paymentMethod,
    paymentId,
    paidAt,
  );

  /// Create a copy of RentRecord
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$RentRecordImplCopyWith<_$RentRecordImpl> get copyWith =>
      __$$RentRecordImplCopyWithImpl<_$RentRecordImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$RentRecordImplToJson(this);
  }
}

abstract class _RentRecord implements RentRecord {
  const factory _RentRecord({
    required final String id,
    final String? tenantId,
    final String? pgId,
    final String? roomId,
    final int? month,
    final int? year,
    final num? amount,
    final String? dueDate,
    final String? status,
    final String? paymentMethod,
    final String? paymentId,
    final String? paidAt,
  }) = _$RentRecordImpl;

  factory _RentRecord.fromJson(Map<String, dynamic> json) =
      _$RentRecordImpl.fromJson;

  @override
  String get id;
  @override
  String? get tenantId;
  @override
  String? get pgId;
  @override
  String? get roomId;
  @override
  int? get month;
  @override
  int? get year;
  @override
  num? get amount;
  @override
  String? get dueDate;
  @override
  String? get status;
  @override
  String? get paymentMethod;
  @override
  String? get paymentId;
  @override
  String? get paidAt;

  /// Create a copy of RentRecord
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$RentRecordImplCopyWith<_$RentRecordImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

CustomPayment _$CustomPaymentFromJson(Map<String, dynamic> json) {
  return _CustomPayment.fromJson(json);
}

/// @nodoc
mixin _$CustomPayment {
  String get id => throw _privateConstructorUsedError;
  String? get tenantId => throw _privateConstructorUsedError;
  String? get pgId => throw _privateConstructorUsedError;
  String? get title => throw _privateConstructorUsedError;
  num? get amount => throw _privateConstructorUsedError;
  String? get status => throw _privateConstructorUsedError;
  String? get paymentMethod => throw _privateConstructorUsedError;
  String? get dueDate => throw _privateConstructorUsedError;
  String? get createdAt => throw _privateConstructorUsedError;
  String? get paidAt => throw _privateConstructorUsedError;
  String? get tenantName => throw _privateConstructorUsedError;

  /// Serializes this CustomPayment to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of CustomPayment
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $CustomPaymentCopyWith<CustomPayment> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $CustomPaymentCopyWith<$Res> {
  factory $CustomPaymentCopyWith(
    CustomPayment value,
    $Res Function(CustomPayment) then,
  ) = _$CustomPaymentCopyWithImpl<$Res, CustomPayment>;
  @useResult
  $Res call({
    String id,
    String? tenantId,
    String? pgId,
    String? title,
    num? amount,
    String? status,
    String? paymentMethod,
    String? dueDate,
    String? createdAt,
    String? paidAt,
    String? tenantName,
  });
}

/// @nodoc
class _$CustomPaymentCopyWithImpl<$Res, $Val extends CustomPayment>
    implements $CustomPaymentCopyWith<$Res> {
  _$CustomPaymentCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of CustomPayment
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? tenantId = freezed,
    Object? pgId = freezed,
    Object? title = freezed,
    Object? amount = freezed,
    Object? status = freezed,
    Object? paymentMethod = freezed,
    Object? dueDate = freezed,
    Object? createdAt = freezed,
    Object? paidAt = freezed,
    Object? tenantName = freezed,
  }) {
    return _then(
      _value.copyWith(
            id: null == id
                ? _value.id
                : id // ignore: cast_nullable_to_non_nullable
                      as String,
            tenantId: freezed == tenantId
                ? _value.tenantId
                : tenantId // ignore: cast_nullable_to_non_nullable
                      as String?,
            pgId: freezed == pgId
                ? _value.pgId
                : pgId // ignore: cast_nullable_to_non_nullable
                      as String?,
            title: freezed == title
                ? _value.title
                : title // ignore: cast_nullable_to_non_nullable
                      as String?,
            amount: freezed == amount
                ? _value.amount
                : amount // ignore: cast_nullable_to_non_nullable
                      as num?,
            status: freezed == status
                ? _value.status
                : status // ignore: cast_nullable_to_non_nullable
                      as String?,
            paymentMethod: freezed == paymentMethod
                ? _value.paymentMethod
                : paymentMethod // ignore: cast_nullable_to_non_nullable
                      as String?,
            dueDate: freezed == dueDate
                ? _value.dueDate
                : dueDate // ignore: cast_nullable_to_non_nullable
                      as String?,
            createdAt: freezed == createdAt
                ? _value.createdAt
                : createdAt // ignore: cast_nullable_to_non_nullable
                      as String?,
            paidAt: freezed == paidAt
                ? _value.paidAt
                : paidAt // ignore: cast_nullable_to_non_nullable
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
abstract class _$$CustomPaymentImplCopyWith<$Res>
    implements $CustomPaymentCopyWith<$Res> {
  factory _$$CustomPaymentImplCopyWith(
    _$CustomPaymentImpl value,
    $Res Function(_$CustomPaymentImpl) then,
  ) = __$$CustomPaymentImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    String id,
    String? tenantId,
    String? pgId,
    String? title,
    num? amount,
    String? status,
    String? paymentMethod,
    String? dueDate,
    String? createdAt,
    String? paidAt,
    String? tenantName,
  });
}

/// @nodoc
class __$$CustomPaymentImplCopyWithImpl<$Res>
    extends _$CustomPaymentCopyWithImpl<$Res, _$CustomPaymentImpl>
    implements _$$CustomPaymentImplCopyWith<$Res> {
  __$$CustomPaymentImplCopyWithImpl(
    _$CustomPaymentImpl _value,
    $Res Function(_$CustomPaymentImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of CustomPayment
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? tenantId = freezed,
    Object? pgId = freezed,
    Object? title = freezed,
    Object? amount = freezed,
    Object? status = freezed,
    Object? paymentMethod = freezed,
    Object? dueDate = freezed,
    Object? createdAt = freezed,
    Object? paidAt = freezed,
    Object? tenantName = freezed,
  }) {
    return _then(
      _$CustomPaymentImpl(
        id: null == id
            ? _value.id
            : id // ignore: cast_nullable_to_non_nullable
                  as String,
        tenantId: freezed == tenantId
            ? _value.tenantId
            : tenantId // ignore: cast_nullable_to_non_nullable
                  as String?,
        pgId: freezed == pgId
            ? _value.pgId
            : pgId // ignore: cast_nullable_to_non_nullable
                  as String?,
        title: freezed == title
            ? _value.title
            : title // ignore: cast_nullable_to_non_nullable
                  as String?,
        amount: freezed == amount
            ? _value.amount
            : amount // ignore: cast_nullable_to_non_nullable
                  as num?,
        status: freezed == status
            ? _value.status
            : status // ignore: cast_nullable_to_non_nullable
                  as String?,
        paymentMethod: freezed == paymentMethod
            ? _value.paymentMethod
            : paymentMethod // ignore: cast_nullable_to_non_nullable
                  as String?,
        dueDate: freezed == dueDate
            ? _value.dueDate
            : dueDate // ignore: cast_nullable_to_non_nullable
                  as String?,
        createdAt: freezed == createdAt
            ? _value.createdAt
            : createdAt // ignore: cast_nullable_to_non_nullable
                  as String?,
        paidAt: freezed == paidAt
            ? _value.paidAt
            : paidAt // ignore: cast_nullable_to_non_nullable
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
class _$CustomPaymentImpl implements _CustomPayment {
  const _$CustomPaymentImpl({
    required this.id,
    this.tenantId,
    this.pgId,
    this.title,
    this.amount,
    this.status,
    this.paymentMethod,
    this.dueDate,
    this.createdAt,
    this.paidAt,
    this.tenantName,
  });

  factory _$CustomPaymentImpl.fromJson(Map<String, dynamic> json) =>
      _$$CustomPaymentImplFromJson(json);

  @override
  final String id;
  @override
  final String? tenantId;
  @override
  final String? pgId;
  @override
  final String? title;
  @override
  final num? amount;
  @override
  final String? status;
  @override
  final String? paymentMethod;
  @override
  final String? dueDate;
  @override
  final String? createdAt;
  @override
  final String? paidAt;
  @override
  final String? tenantName;

  @override
  String toString() {
    return 'CustomPayment(id: $id, tenantId: $tenantId, pgId: $pgId, title: $title, amount: $amount, status: $status, paymentMethod: $paymentMethod, dueDate: $dueDate, createdAt: $createdAt, paidAt: $paidAt, tenantName: $tenantName)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$CustomPaymentImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.tenantId, tenantId) ||
                other.tenantId == tenantId) &&
            (identical(other.pgId, pgId) || other.pgId == pgId) &&
            (identical(other.title, title) || other.title == title) &&
            (identical(other.amount, amount) || other.amount == amount) &&
            (identical(other.status, status) || other.status == status) &&
            (identical(other.paymentMethod, paymentMethod) ||
                other.paymentMethod == paymentMethod) &&
            (identical(other.dueDate, dueDate) || other.dueDate == dueDate) &&
            (identical(other.createdAt, createdAt) ||
                other.createdAt == createdAt) &&
            (identical(other.paidAt, paidAt) || other.paidAt == paidAt) &&
            (identical(other.tenantName, tenantName) ||
                other.tenantName == tenantName));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
    runtimeType,
    id,
    tenantId,
    pgId,
    title,
    amount,
    status,
    paymentMethod,
    dueDate,
    createdAt,
    paidAt,
    tenantName,
  );

  /// Create a copy of CustomPayment
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$CustomPaymentImplCopyWith<_$CustomPaymentImpl> get copyWith =>
      __$$CustomPaymentImplCopyWithImpl<_$CustomPaymentImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$CustomPaymentImplToJson(this);
  }
}

abstract class _CustomPayment implements CustomPayment {
  const factory _CustomPayment({
    required final String id,
    final String? tenantId,
    final String? pgId,
    final String? title,
    final num? amount,
    final String? status,
    final String? paymentMethod,
    final String? dueDate,
    final String? createdAt,
    final String? paidAt,
    final String? tenantName,
  }) = _$CustomPaymentImpl;

  factory _CustomPayment.fromJson(Map<String, dynamic> json) =
      _$CustomPaymentImpl.fromJson;

  @override
  String get id;
  @override
  String? get tenantId;
  @override
  String? get pgId;
  @override
  String? get title;
  @override
  num? get amount;
  @override
  String? get status;
  @override
  String? get paymentMethod;
  @override
  String? get dueDate;
  @override
  String? get createdAt;
  @override
  String? get paidAt;
  @override
  String? get tenantName;

  /// Create a copy of CustomPayment
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$CustomPaymentImplCopyWith<_$CustomPaymentImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

TenantPaymentBreakdown _$TenantPaymentBreakdownFromJson(
  Map<String, dynamic> json,
) {
  return _TenantPaymentBreakdown.fromJson(json);
}

/// @nodoc
mixin _$TenantPaymentBreakdown {
  String? get recordId => throw _privateConstructorUsedError;
  String get tenantId => throw _privateConstructorUsedError;
  String get name => throw _privateConstructorUsedError;
  String? get roomNumber => throw _privateConstructorUsedError;
  num get amount => throw _privateConstructorUsedError;
  String? get dueDate => throw _privateConstructorUsedError;
  String? get status => throw _privateConstructorUsedError;
  String? get paymentMethod => throw _privateConstructorUsedError;
  String? get paidAt => throw _privateConstructorUsedError;

  /// Serializes this TenantPaymentBreakdown to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of TenantPaymentBreakdown
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $TenantPaymentBreakdownCopyWith<TenantPaymentBreakdown> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $TenantPaymentBreakdownCopyWith<$Res> {
  factory $TenantPaymentBreakdownCopyWith(
    TenantPaymentBreakdown value,
    $Res Function(TenantPaymentBreakdown) then,
  ) = _$TenantPaymentBreakdownCopyWithImpl<$Res, TenantPaymentBreakdown>;
  @useResult
  $Res call({
    String? recordId,
    String tenantId,
    String name,
    String? roomNumber,
    num amount,
    String? dueDate,
    String? status,
    String? paymentMethod,
    String? paidAt,
  });
}

/// @nodoc
class _$TenantPaymentBreakdownCopyWithImpl<
  $Res,
  $Val extends TenantPaymentBreakdown
>
    implements $TenantPaymentBreakdownCopyWith<$Res> {
  _$TenantPaymentBreakdownCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of TenantPaymentBreakdown
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? recordId = freezed,
    Object? tenantId = null,
    Object? name = null,
    Object? roomNumber = freezed,
    Object? amount = null,
    Object? dueDate = freezed,
    Object? status = freezed,
    Object? paymentMethod = freezed,
    Object? paidAt = freezed,
  }) {
    return _then(
      _value.copyWith(
            recordId: freezed == recordId
                ? _value.recordId
                : recordId // ignore: cast_nullable_to_non_nullable
                      as String?,
            tenantId: null == tenantId
                ? _value.tenantId
                : tenantId // ignore: cast_nullable_to_non_nullable
                      as String,
            name: null == name
                ? _value.name
                : name // ignore: cast_nullable_to_non_nullable
                      as String,
            roomNumber: freezed == roomNumber
                ? _value.roomNumber
                : roomNumber // ignore: cast_nullable_to_non_nullable
                      as String?,
            amount: null == amount
                ? _value.amount
                : amount // ignore: cast_nullable_to_non_nullable
                      as num,
            dueDate: freezed == dueDate
                ? _value.dueDate
                : dueDate // ignore: cast_nullable_to_non_nullable
                      as String?,
            status: freezed == status
                ? _value.status
                : status // ignore: cast_nullable_to_non_nullable
                      as String?,
            paymentMethod: freezed == paymentMethod
                ? _value.paymentMethod
                : paymentMethod // ignore: cast_nullable_to_non_nullable
                      as String?,
            paidAt: freezed == paidAt
                ? _value.paidAt
                : paidAt // ignore: cast_nullable_to_non_nullable
                      as String?,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$TenantPaymentBreakdownImplCopyWith<$Res>
    implements $TenantPaymentBreakdownCopyWith<$Res> {
  factory _$$TenantPaymentBreakdownImplCopyWith(
    _$TenantPaymentBreakdownImpl value,
    $Res Function(_$TenantPaymentBreakdownImpl) then,
  ) = __$$TenantPaymentBreakdownImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    String? recordId,
    String tenantId,
    String name,
    String? roomNumber,
    num amount,
    String? dueDate,
    String? status,
    String? paymentMethod,
    String? paidAt,
  });
}

/// @nodoc
class __$$TenantPaymentBreakdownImplCopyWithImpl<$Res>
    extends
        _$TenantPaymentBreakdownCopyWithImpl<$Res, _$TenantPaymentBreakdownImpl>
    implements _$$TenantPaymentBreakdownImplCopyWith<$Res> {
  __$$TenantPaymentBreakdownImplCopyWithImpl(
    _$TenantPaymentBreakdownImpl _value,
    $Res Function(_$TenantPaymentBreakdownImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of TenantPaymentBreakdown
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? recordId = freezed,
    Object? tenantId = null,
    Object? name = null,
    Object? roomNumber = freezed,
    Object? amount = null,
    Object? dueDate = freezed,
    Object? status = freezed,
    Object? paymentMethod = freezed,
    Object? paidAt = freezed,
  }) {
    return _then(
      _$TenantPaymentBreakdownImpl(
        recordId: freezed == recordId
            ? _value.recordId
            : recordId // ignore: cast_nullable_to_non_nullable
                  as String?,
        tenantId: null == tenantId
            ? _value.tenantId
            : tenantId // ignore: cast_nullable_to_non_nullable
                  as String,
        name: null == name
            ? _value.name
            : name // ignore: cast_nullable_to_non_nullable
                  as String,
        roomNumber: freezed == roomNumber
            ? _value.roomNumber
            : roomNumber // ignore: cast_nullable_to_non_nullable
                  as String?,
        amount: null == amount
            ? _value.amount
            : amount // ignore: cast_nullable_to_non_nullable
                  as num,
        dueDate: freezed == dueDate
            ? _value.dueDate
            : dueDate // ignore: cast_nullable_to_non_nullable
                  as String?,
        status: freezed == status
            ? _value.status
            : status // ignore: cast_nullable_to_non_nullable
                  as String?,
        paymentMethod: freezed == paymentMethod
            ? _value.paymentMethod
            : paymentMethod // ignore: cast_nullable_to_non_nullable
                  as String?,
        paidAt: freezed == paidAt
            ? _value.paidAt
            : paidAt // ignore: cast_nullable_to_non_nullable
                  as String?,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$TenantPaymentBreakdownImpl implements _TenantPaymentBreakdown {
  const _$TenantPaymentBreakdownImpl({
    this.recordId,
    required this.tenantId,
    required this.name,
    this.roomNumber,
    this.amount = 0,
    this.dueDate,
    this.status,
    this.paymentMethod,
    this.paidAt,
  });

  factory _$TenantPaymentBreakdownImpl.fromJson(Map<String, dynamic> json) =>
      _$$TenantPaymentBreakdownImplFromJson(json);

  @override
  final String? recordId;
  @override
  final String tenantId;
  @override
  final String name;
  @override
  final String? roomNumber;
  @override
  @JsonKey()
  final num amount;
  @override
  final String? dueDate;
  @override
  final String? status;
  @override
  final String? paymentMethod;
  @override
  final String? paidAt;

  @override
  String toString() {
    return 'TenantPaymentBreakdown(recordId: $recordId, tenantId: $tenantId, name: $name, roomNumber: $roomNumber, amount: $amount, dueDate: $dueDate, status: $status, paymentMethod: $paymentMethod, paidAt: $paidAt)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$TenantPaymentBreakdownImpl &&
            (identical(other.recordId, recordId) ||
                other.recordId == recordId) &&
            (identical(other.tenantId, tenantId) ||
                other.tenantId == tenantId) &&
            (identical(other.name, name) || other.name == name) &&
            (identical(other.roomNumber, roomNumber) ||
                other.roomNumber == roomNumber) &&
            (identical(other.amount, amount) || other.amount == amount) &&
            (identical(other.dueDate, dueDate) || other.dueDate == dueDate) &&
            (identical(other.status, status) || other.status == status) &&
            (identical(other.paymentMethod, paymentMethod) ||
                other.paymentMethod == paymentMethod) &&
            (identical(other.paidAt, paidAt) || other.paidAt == paidAt));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
    runtimeType,
    recordId,
    tenantId,
    name,
    roomNumber,
    amount,
    dueDate,
    status,
    paymentMethod,
    paidAt,
  );

  /// Create a copy of TenantPaymentBreakdown
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$TenantPaymentBreakdownImplCopyWith<_$TenantPaymentBreakdownImpl>
  get copyWith =>
      __$$TenantPaymentBreakdownImplCopyWithImpl<_$TenantPaymentBreakdownImpl>(
        this,
        _$identity,
      );

  @override
  Map<String, dynamic> toJson() {
    return _$$TenantPaymentBreakdownImplToJson(this);
  }
}

abstract class _TenantPaymentBreakdown implements TenantPaymentBreakdown {
  const factory _TenantPaymentBreakdown({
    final String? recordId,
    required final String tenantId,
    required final String name,
    final String? roomNumber,
    final num amount,
    final String? dueDate,
    final String? status,
    final String? paymentMethod,
    final String? paidAt,
  }) = _$TenantPaymentBreakdownImpl;

  factory _TenantPaymentBreakdown.fromJson(Map<String, dynamic> json) =
      _$TenantPaymentBreakdownImpl.fromJson;

  @override
  String? get recordId;
  @override
  String get tenantId;
  @override
  String get name;
  @override
  String? get roomNumber;
  @override
  num get amount;
  @override
  String? get dueDate;
  @override
  String? get status;
  @override
  String? get paymentMethod;
  @override
  String? get paidAt;

  /// Create a copy of TenantPaymentBreakdown
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$TenantPaymentBreakdownImplCopyWith<_$TenantPaymentBreakdownImpl>
  get copyWith => throw _privateConstructorUsedError;
}

PaymentSummary _$PaymentSummaryFromJson(Map<String, dynamic> json) {
  return _PaymentSummary.fromJson(json);
}

/// @nodoc
mixin _$PaymentSummary {
  int? get month => throw _privateConstructorUsedError;
  int? get year => throw _privateConstructorUsedError;
  int? get rentDueDay => throw _privateConstructorUsedError;
  num get totalDue => throw _privateConstructorUsedError;
  num get totalPaid => throw _privateConstructorUsedError;
  num get totalPending => throw _privateConstructorUsedError;
  List<TenantPaymentBreakdown> get tenantBreakdown =>
      throw _privateConstructorUsedError;

  /// Serializes this PaymentSummary to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of PaymentSummary
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $PaymentSummaryCopyWith<PaymentSummary> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $PaymentSummaryCopyWith<$Res> {
  factory $PaymentSummaryCopyWith(
    PaymentSummary value,
    $Res Function(PaymentSummary) then,
  ) = _$PaymentSummaryCopyWithImpl<$Res, PaymentSummary>;
  @useResult
  $Res call({
    int? month,
    int? year,
    int? rentDueDay,
    num totalDue,
    num totalPaid,
    num totalPending,
    List<TenantPaymentBreakdown> tenantBreakdown,
  });
}

/// @nodoc
class _$PaymentSummaryCopyWithImpl<$Res, $Val extends PaymentSummary>
    implements $PaymentSummaryCopyWith<$Res> {
  _$PaymentSummaryCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of PaymentSummary
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? month = freezed,
    Object? year = freezed,
    Object? rentDueDay = freezed,
    Object? totalDue = null,
    Object? totalPaid = null,
    Object? totalPending = null,
    Object? tenantBreakdown = null,
  }) {
    return _then(
      _value.copyWith(
            month: freezed == month
                ? _value.month
                : month // ignore: cast_nullable_to_non_nullable
                      as int?,
            year: freezed == year
                ? _value.year
                : year // ignore: cast_nullable_to_non_nullable
                      as int?,
            rentDueDay: freezed == rentDueDay
                ? _value.rentDueDay
                : rentDueDay // ignore: cast_nullable_to_non_nullable
                      as int?,
            totalDue: null == totalDue
                ? _value.totalDue
                : totalDue // ignore: cast_nullable_to_non_nullable
                      as num,
            totalPaid: null == totalPaid
                ? _value.totalPaid
                : totalPaid // ignore: cast_nullable_to_non_nullable
                      as num,
            totalPending: null == totalPending
                ? _value.totalPending
                : totalPending // ignore: cast_nullable_to_non_nullable
                      as num,
            tenantBreakdown: null == tenantBreakdown
                ? _value.tenantBreakdown
                : tenantBreakdown // ignore: cast_nullable_to_non_nullable
                      as List<TenantPaymentBreakdown>,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$PaymentSummaryImplCopyWith<$Res>
    implements $PaymentSummaryCopyWith<$Res> {
  factory _$$PaymentSummaryImplCopyWith(
    _$PaymentSummaryImpl value,
    $Res Function(_$PaymentSummaryImpl) then,
  ) = __$$PaymentSummaryImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    int? month,
    int? year,
    int? rentDueDay,
    num totalDue,
    num totalPaid,
    num totalPending,
    List<TenantPaymentBreakdown> tenantBreakdown,
  });
}

/// @nodoc
class __$$PaymentSummaryImplCopyWithImpl<$Res>
    extends _$PaymentSummaryCopyWithImpl<$Res, _$PaymentSummaryImpl>
    implements _$$PaymentSummaryImplCopyWith<$Res> {
  __$$PaymentSummaryImplCopyWithImpl(
    _$PaymentSummaryImpl _value,
    $Res Function(_$PaymentSummaryImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of PaymentSummary
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? month = freezed,
    Object? year = freezed,
    Object? rentDueDay = freezed,
    Object? totalDue = null,
    Object? totalPaid = null,
    Object? totalPending = null,
    Object? tenantBreakdown = null,
  }) {
    return _then(
      _$PaymentSummaryImpl(
        month: freezed == month
            ? _value.month
            : month // ignore: cast_nullable_to_non_nullable
                  as int?,
        year: freezed == year
            ? _value.year
            : year // ignore: cast_nullable_to_non_nullable
                  as int?,
        rentDueDay: freezed == rentDueDay
            ? _value.rentDueDay
            : rentDueDay // ignore: cast_nullable_to_non_nullable
                  as int?,
        totalDue: null == totalDue
            ? _value.totalDue
            : totalDue // ignore: cast_nullable_to_non_nullable
                  as num,
        totalPaid: null == totalPaid
            ? _value.totalPaid
            : totalPaid // ignore: cast_nullable_to_non_nullable
                  as num,
        totalPending: null == totalPending
            ? _value.totalPending
            : totalPending // ignore: cast_nullable_to_non_nullable
                  as num,
        tenantBreakdown: null == tenantBreakdown
            ? _value._tenantBreakdown
            : tenantBreakdown // ignore: cast_nullable_to_non_nullable
                  as List<TenantPaymentBreakdown>,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$PaymentSummaryImpl implements _PaymentSummary {
  const _$PaymentSummaryImpl({
    this.month,
    this.year,
    this.rentDueDay,
    this.totalDue = 0,
    this.totalPaid = 0,
    this.totalPending = 0,
    final List<TenantPaymentBreakdown> tenantBreakdown = const [],
  }) : _tenantBreakdown = tenantBreakdown;

  factory _$PaymentSummaryImpl.fromJson(Map<String, dynamic> json) =>
      _$$PaymentSummaryImplFromJson(json);

  @override
  final int? month;
  @override
  final int? year;
  @override
  final int? rentDueDay;
  @override
  @JsonKey()
  final num totalDue;
  @override
  @JsonKey()
  final num totalPaid;
  @override
  @JsonKey()
  final num totalPending;
  final List<TenantPaymentBreakdown> _tenantBreakdown;
  @override
  @JsonKey()
  List<TenantPaymentBreakdown> get tenantBreakdown {
    if (_tenantBreakdown is EqualUnmodifiableListView) return _tenantBreakdown;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_tenantBreakdown);
  }

  @override
  String toString() {
    return 'PaymentSummary(month: $month, year: $year, rentDueDay: $rentDueDay, totalDue: $totalDue, totalPaid: $totalPaid, totalPending: $totalPending, tenantBreakdown: $tenantBreakdown)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$PaymentSummaryImpl &&
            (identical(other.month, month) || other.month == month) &&
            (identical(other.year, year) || other.year == year) &&
            (identical(other.rentDueDay, rentDueDay) ||
                other.rentDueDay == rentDueDay) &&
            (identical(other.totalDue, totalDue) ||
                other.totalDue == totalDue) &&
            (identical(other.totalPaid, totalPaid) ||
                other.totalPaid == totalPaid) &&
            (identical(other.totalPending, totalPending) ||
                other.totalPending == totalPending) &&
            const DeepCollectionEquality().equals(
              other._tenantBreakdown,
              _tenantBreakdown,
            ));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
    runtimeType,
    month,
    year,
    rentDueDay,
    totalDue,
    totalPaid,
    totalPending,
    const DeepCollectionEquality().hash(_tenantBreakdown),
  );

  /// Create a copy of PaymentSummary
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$PaymentSummaryImplCopyWith<_$PaymentSummaryImpl> get copyWith =>
      __$$PaymentSummaryImplCopyWithImpl<_$PaymentSummaryImpl>(
        this,
        _$identity,
      );

  @override
  Map<String, dynamic> toJson() {
    return _$$PaymentSummaryImplToJson(this);
  }
}

abstract class _PaymentSummary implements PaymentSummary {
  const factory _PaymentSummary({
    final int? month,
    final int? year,
    final int? rentDueDay,
    final num totalDue,
    final num totalPaid,
    final num totalPending,
    final List<TenantPaymentBreakdown> tenantBreakdown,
  }) = _$PaymentSummaryImpl;

  factory _PaymentSummary.fromJson(Map<String, dynamic> json) =
      _$PaymentSummaryImpl.fromJson;

  @override
  int? get month;
  @override
  int? get year;
  @override
  int? get rentDueDay;
  @override
  num get totalDue;
  @override
  num get totalPaid;
  @override
  num get totalPending;
  @override
  List<TenantPaymentBreakdown> get tenantBreakdown;

  /// Create a copy of PaymentSummary
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$PaymentSummaryImplCopyWith<_$PaymentSummaryImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

CreateOrderResponse _$CreateOrderResponseFromJson(Map<String, dynamic> json) {
  return _CreateOrderResponse.fromJson(json);
}

/// @nodoc
mixin _$CreateOrderResponse {
  String? get orderId => throw _privateConstructorUsedError;
  num? get amount => throw _privateConstructorUsedError;
  String? get currency => throw _privateConstructorUsedError;
  String? get keyId => throw _privateConstructorUsedError;
  bool get devMode => throw _privateConstructorUsedError;
  int? get month => throw _privateConstructorUsedError;
  int? get year => throw _privateConstructorUsedError;

  /// Serializes this CreateOrderResponse to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of CreateOrderResponse
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $CreateOrderResponseCopyWith<CreateOrderResponse> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $CreateOrderResponseCopyWith<$Res> {
  factory $CreateOrderResponseCopyWith(
    CreateOrderResponse value,
    $Res Function(CreateOrderResponse) then,
  ) = _$CreateOrderResponseCopyWithImpl<$Res, CreateOrderResponse>;
  @useResult
  $Res call({
    String? orderId,
    num? amount,
    String? currency,
    String? keyId,
    bool devMode,
    int? month,
    int? year,
  });
}

/// @nodoc
class _$CreateOrderResponseCopyWithImpl<$Res, $Val extends CreateOrderResponse>
    implements $CreateOrderResponseCopyWith<$Res> {
  _$CreateOrderResponseCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of CreateOrderResponse
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? orderId = freezed,
    Object? amount = freezed,
    Object? currency = freezed,
    Object? keyId = freezed,
    Object? devMode = null,
    Object? month = freezed,
    Object? year = freezed,
  }) {
    return _then(
      _value.copyWith(
            orderId: freezed == orderId
                ? _value.orderId
                : orderId // ignore: cast_nullable_to_non_nullable
                      as String?,
            amount: freezed == amount
                ? _value.amount
                : amount // ignore: cast_nullable_to_non_nullable
                      as num?,
            currency: freezed == currency
                ? _value.currency
                : currency // ignore: cast_nullable_to_non_nullable
                      as String?,
            keyId: freezed == keyId
                ? _value.keyId
                : keyId // ignore: cast_nullable_to_non_nullable
                      as String?,
            devMode: null == devMode
                ? _value.devMode
                : devMode // ignore: cast_nullable_to_non_nullable
                      as bool,
            month: freezed == month
                ? _value.month
                : month // ignore: cast_nullable_to_non_nullable
                      as int?,
            year: freezed == year
                ? _value.year
                : year // ignore: cast_nullable_to_non_nullable
                      as int?,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$CreateOrderResponseImplCopyWith<$Res>
    implements $CreateOrderResponseCopyWith<$Res> {
  factory _$$CreateOrderResponseImplCopyWith(
    _$CreateOrderResponseImpl value,
    $Res Function(_$CreateOrderResponseImpl) then,
  ) = __$$CreateOrderResponseImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    String? orderId,
    num? amount,
    String? currency,
    String? keyId,
    bool devMode,
    int? month,
    int? year,
  });
}

/// @nodoc
class __$$CreateOrderResponseImplCopyWithImpl<$Res>
    extends _$CreateOrderResponseCopyWithImpl<$Res, _$CreateOrderResponseImpl>
    implements _$$CreateOrderResponseImplCopyWith<$Res> {
  __$$CreateOrderResponseImplCopyWithImpl(
    _$CreateOrderResponseImpl _value,
    $Res Function(_$CreateOrderResponseImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of CreateOrderResponse
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? orderId = freezed,
    Object? amount = freezed,
    Object? currency = freezed,
    Object? keyId = freezed,
    Object? devMode = null,
    Object? month = freezed,
    Object? year = freezed,
  }) {
    return _then(
      _$CreateOrderResponseImpl(
        orderId: freezed == orderId
            ? _value.orderId
            : orderId // ignore: cast_nullable_to_non_nullable
                  as String?,
        amount: freezed == amount
            ? _value.amount
            : amount // ignore: cast_nullable_to_non_nullable
                  as num?,
        currency: freezed == currency
            ? _value.currency
            : currency // ignore: cast_nullable_to_non_nullable
                  as String?,
        keyId: freezed == keyId
            ? _value.keyId
            : keyId // ignore: cast_nullable_to_non_nullable
                  as String?,
        devMode: null == devMode
            ? _value.devMode
            : devMode // ignore: cast_nullable_to_non_nullable
                  as bool,
        month: freezed == month
            ? _value.month
            : month // ignore: cast_nullable_to_non_nullable
                  as int?,
        year: freezed == year
            ? _value.year
            : year // ignore: cast_nullable_to_non_nullable
                  as int?,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$CreateOrderResponseImpl implements _CreateOrderResponse {
  const _$CreateOrderResponseImpl({
    this.orderId,
    this.amount,
    this.currency,
    this.keyId,
    this.devMode = false,
    this.month,
    this.year,
  });

  factory _$CreateOrderResponseImpl.fromJson(Map<String, dynamic> json) =>
      _$$CreateOrderResponseImplFromJson(json);

  @override
  final String? orderId;
  @override
  final num? amount;
  @override
  final String? currency;
  @override
  final String? keyId;
  @override
  @JsonKey()
  final bool devMode;
  @override
  final int? month;
  @override
  final int? year;

  @override
  String toString() {
    return 'CreateOrderResponse(orderId: $orderId, amount: $amount, currency: $currency, keyId: $keyId, devMode: $devMode, month: $month, year: $year)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$CreateOrderResponseImpl &&
            (identical(other.orderId, orderId) || other.orderId == orderId) &&
            (identical(other.amount, amount) || other.amount == amount) &&
            (identical(other.currency, currency) ||
                other.currency == currency) &&
            (identical(other.keyId, keyId) || other.keyId == keyId) &&
            (identical(other.devMode, devMode) || other.devMode == devMode) &&
            (identical(other.month, month) || other.month == month) &&
            (identical(other.year, year) || other.year == year));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
    runtimeType,
    orderId,
    amount,
    currency,
    keyId,
    devMode,
    month,
    year,
  );

  /// Create a copy of CreateOrderResponse
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$CreateOrderResponseImplCopyWith<_$CreateOrderResponseImpl> get copyWith =>
      __$$CreateOrderResponseImplCopyWithImpl<_$CreateOrderResponseImpl>(
        this,
        _$identity,
      );

  @override
  Map<String, dynamic> toJson() {
    return _$$CreateOrderResponseImplToJson(this);
  }
}

abstract class _CreateOrderResponse implements CreateOrderResponse {
  const factory _CreateOrderResponse({
    final String? orderId,
    final num? amount,
    final String? currency,
    final String? keyId,
    final bool devMode,
    final int? month,
    final int? year,
  }) = _$CreateOrderResponseImpl;

  factory _CreateOrderResponse.fromJson(Map<String, dynamic> json) =
      _$CreateOrderResponseImpl.fromJson;

  @override
  String? get orderId;
  @override
  num? get amount;
  @override
  String? get currency;
  @override
  String? get keyId;
  @override
  bool get devMode;
  @override
  int? get month;
  @override
  int? get year;

  /// Create a copy of CreateOrderResponse
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$CreateOrderResponseImplCopyWith<_$CreateOrderResponseImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

VerifyPaymentResponse _$VerifyPaymentResponseFromJson(
  Map<String, dynamic> json,
) {
  return _VerifyPaymentResponse.fromJson(json);
}

/// @nodoc
mixin _$VerifyPaymentResponse {
  String? get status => throw _privateConstructorUsedError;
  String? get paymentId => throw _privateConstructorUsedError;
  String? get paidAt => throw _privateConstructorUsedError;
  int? get month => throw _privateConstructorUsedError;
  int? get year => throw _privateConstructorUsedError;

  /// Serializes this VerifyPaymentResponse to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of VerifyPaymentResponse
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $VerifyPaymentResponseCopyWith<VerifyPaymentResponse> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $VerifyPaymentResponseCopyWith<$Res> {
  factory $VerifyPaymentResponseCopyWith(
    VerifyPaymentResponse value,
    $Res Function(VerifyPaymentResponse) then,
  ) = _$VerifyPaymentResponseCopyWithImpl<$Res, VerifyPaymentResponse>;
  @useResult
  $Res call({
    String? status,
    String? paymentId,
    String? paidAt,
    int? month,
    int? year,
  });
}

/// @nodoc
class _$VerifyPaymentResponseCopyWithImpl<
  $Res,
  $Val extends VerifyPaymentResponse
>
    implements $VerifyPaymentResponseCopyWith<$Res> {
  _$VerifyPaymentResponseCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of VerifyPaymentResponse
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? status = freezed,
    Object? paymentId = freezed,
    Object? paidAt = freezed,
    Object? month = freezed,
    Object? year = freezed,
  }) {
    return _then(
      _value.copyWith(
            status: freezed == status
                ? _value.status
                : status // ignore: cast_nullable_to_non_nullable
                      as String?,
            paymentId: freezed == paymentId
                ? _value.paymentId
                : paymentId // ignore: cast_nullable_to_non_nullable
                      as String?,
            paidAt: freezed == paidAt
                ? _value.paidAt
                : paidAt // ignore: cast_nullable_to_non_nullable
                      as String?,
            month: freezed == month
                ? _value.month
                : month // ignore: cast_nullable_to_non_nullable
                      as int?,
            year: freezed == year
                ? _value.year
                : year // ignore: cast_nullable_to_non_nullable
                      as int?,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$VerifyPaymentResponseImplCopyWith<$Res>
    implements $VerifyPaymentResponseCopyWith<$Res> {
  factory _$$VerifyPaymentResponseImplCopyWith(
    _$VerifyPaymentResponseImpl value,
    $Res Function(_$VerifyPaymentResponseImpl) then,
  ) = __$$VerifyPaymentResponseImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    String? status,
    String? paymentId,
    String? paidAt,
    int? month,
    int? year,
  });
}

/// @nodoc
class __$$VerifyPaymentResponseImplCopyWithImpl<$Res>
    extends
        _$VerifyPaymentResponseCopyWithImpl<$Res, _$VerifyPaymentResponseImpl>
    implements _$$VerifyPaymentResponseImplCopyWith<$Res> {
  __$$VerifyPaymentResponseImplCopyWithImpl(
    _$VerifyPaymentResponseImpl _value,
    $Res Function(_$VerifyPaymentResponseImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of VerifyPaymentResponse
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? status = freezed,
    Object? paymentId = freezed,
    Object? paidAt = freezed,
    Object? month = freezed,
    Object? year = freezed,
  }) {
    return _then(
      _$VerifyPaymentResponseImpl(
        status: freezed == status
            ? _value.status
            : status // ignore: cast_nullable_to_non_nullable
                  as String?,
        paymentId: freezed == paymentId
            ? _value.paymentId
            : paymentId // ignore: cast_nullable_to_non_nullable
                  as String?,
        paidAt: freezed == paidAt
            ? _value.paidAt
            : paidAt // ignore: cast_nullable_to_non_nullable
                  as String?,
        month: freezed == month
            ? _value.month
            : month // ignore: cast_nullable_to_non_nullable
                  as int?,
        year: freezed == year
            ? _value.year
            : year // ignore: cast_nullable_to_non_nullable
                  as int?,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$VerifyPaymentResponseImpl implements _VerifyPaymentResponse {
  const _$VerifyPaymentResponseImpl({
    this.status,
    this.paymentId,
    this.paidAt,
    this.month,
    this.year,
  });

  factory _$VerifyPaymentResponseImpl.fromJson(Map<String, dynamic> json) =>
      _$$VerifyPaymentResponseImplFromJson(json);

  @override
  final String? status;
  @override
  final String? paymentId;
  @override
  final String? paidAt;
  @override
  final int? month;
  @override
  final int? year;

  @override
  String toString() {
    return 'VerifyPaymentResponse(status: $status, paymentId: $paymentId, paidAt: $paidAt, month: $month, year: $year)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$VerifyPaymentResponseImpl &&
            (identical(other.status, status) || other.status == status) &&
            (identical(other.paymentId, paymentId) ||
                other.paymentId == paymentId) &&
            (identical(other.paidAt, paidAt) || other.paidAt == paidAt) &&
            (identical(other.month, month) || other.month == month) &&
            (identical(other.year, year) || other.year == year));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode =>
      Object.hash(runtimeType, status, paymentId, paidAt, month, year);

  /// Create a copy of VerifyPaymentResponse
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$VerifyPaymentResponseImplCopyWith<_$VerifyPaymentResponseImpl>
  get copyWith =>
      __$$VerifyPaymentResponseImplCopyWithImpl<_$VerifyPaymentResponseImpl>(
        this,
        _$identity,
      );

  @override
  Map<String, dynamic> toJson() {
    return _$$VerifyPaymentResponseImplToJson(this);
  }
}

abstract class _VerifyPaymentResponse implements VerifyPaymentResponse {
  const factory _VerifyPaymentResponse({
    final String? status,
    final String? paymentId,
    final String? paidAt,
    final int? month,
    final int? year,
  }) = _$VerifyPaymentResponseImpl;

  factory _VerifyPaymentResponse.fromJson(Map<String, dynamic> json) =
      _$VerifyPaymentResponseImpl.fromJson;

  @override
  String? get status;
  @override
  String? get paymentId;
  @override
  String? get paidAt;
  @override
  int? get month;
  @override
  int? get year;

  /// Create a copy of VerifyPaymentResponse
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$VerifyPaymentResponseImplCopyWith<_$VerifyPaymentResponseImpl>
  get copyWith => throw _privateConstructorUsedError;
}
