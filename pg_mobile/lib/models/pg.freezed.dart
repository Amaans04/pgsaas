// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'pg.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
  'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models',
);

Pg _$PgFromJson(Map<String, dynamic> json) {
  return _Pg.fromJson(json);
}

/// @nodoc
mixin _$Pg {
  String get id => throw _privateConstructorUsedError;
  String? get name => throw _privateConstructorUsedError;
  String? get address => throw _privateConstructorUsedError;
  String? get ownerId => throw _privateConstructorUsedError;
  int? get roomCount => throw _privateConstructorUsedError;
  int? get rentDueDate => throw _privateConstructorUsedError;
  String? get createdAt => throw _privateConstructorUsedError;

  /// Serializes this Pg to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of Pg
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $PgCopyWith<Pg> get copyWith => throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $PgCopyWith<$Res> {
  factory $PgCopyWith(Pg value, $Res Function(Pg) then) =
      _$PgCopyWithImpl<$Res, Pg>;
  @useResult
  $Res call({
    String id,
    String? name,
    String? address,
    String? ownerId,
    int? roomCount,
    int? rentDueDate,
    String? createdAt,
  });
}

/// @nodoc
class _$PgCopyWithImpl<$Res, $Val extends Pg> implements $PgCopyWith<$Res> {
  _$PgCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of Pg
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? name = freezed,
    Object? address = freezed,
    Object? ownerId = freezed,
    Object? roomCount = freezed,
    Object? rentDueDate = freezed,
    Object? createdAt = freezed,
  }) {
    return _then(
      _value.copyWith(
            id: null == id
                ? _value.id
                : id // ignore: cast_nullable_to_non_nullable
                      as String,
            name: freezed == name
                ? _value.name
                : name // ignore: cast_nullable_to_non_nullable
                      as String?,
            address: freezed == address
                ? _value.address
                : address // ignore: cast_nullable_to_non_nullable
                      as String?,
            ownerId: freezed == ownerId
                ? _value.ownerId
                : ownerId // ignore: cast_nullable_to_non_nullable
                      as String?,
            roomCount: freezed == roomCount
                ? _value.roomCount
                : roomCount // ignore: cast_nullable_to_non_nullable
                      as int?,
            rentDueDate: freezed == rentDueDate
                ? _value.rentDueDate
                : rentDueDate // ignore: cast_nullable_to_non_nullable
                      as int?,
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
abstract class _$$PgImplCopyWith<$Res> implements $PgCopyWith<$Res> {
  factory _$$PgImplCopyWith(_$PgImpl value, $Res Function(_$PgImpl) then) =
      __$$PgImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    String id,
    String? name,
    String? address,
    String? ownerId,
    int? roomCount,
    int? rentDueDate,
    String? createdAt,
  });
}

/// @nodoc
class __$$PgImplCopyWithImpl<$Res> extends _$PgCopyWithImpl<$Res, _$PgImpl>
    implements _$$PgImplCopyWith<$Res> {
  __$$PgImplCopyWithImpl(_$PgImpl _value, $Res Function(_$PgImpl) _then)
    : super(_value, _then);

  /// Create a copy of Pg
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? name = freezed,
    Object? address = freezed,
    Object? ownerId = freezed,
    Object? roomCount = freezed,
    Object? rentDueDate = freezed,
    Object? createdAt = freezed,
  }) {
    return _then(
      _$PgImpl(
        id: null == id
            ? _value.id
            : id // ignore: cast_nullable_to_non_nullable
                  as String,
        name: freezed == name
            ? _value.name
            : name // ignore: cast_nullable_to_non_nullable
                  as String?,
        address: freezed == address
            ? _value.address
            : address // ignore: cast_nullable_to_non_nullable
                  as String?,
        ownerId: freezed == ownerId
            ? _value.ownerId
            : ownerId // ignore: cast_nullable_to_non_nullable
                  as String?,
        roomCount: freezed == roomCount
            ? _value.roomCount
            : roomCount // ignore: cast_nullable_to_non_nullable
                  as int?,
        rentDueDate: freezed == rentDueDate
            ? _value.rentDueDate
            : rentDueDate // ignore: cast_nullable_to_non_nullable
                  as int?,
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
class _$PgImpl implements _Pg {
  const _$PgImpl({
    required this.id,
    this.name,
    this.address,
    this.ownerId,
    this.roomCount,
    this.rentDueDate,
    this.createdAt,
  });

  factory _$PgImpl.fromJson(Map<String, dynamic> json) =>
      _$$PgImplFromJson(json);

  @override
  final String id;
  @override
  final String? name;
  @override
  final String? address;
  @override
  final String? ownerId;
  @override
  final int? roomCount;
  @override
  final int? rentDueDate;
  @override
  final String? createdAt;

  @override
  String toString() {
    return 'Pg(id: $id, name: $name, address: $address, ownerId: $ownerId, roomCount: $roomCount, rentDueDate: $rentDueDate, createdAt: $createdAt)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$PgImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.name, name) || other.name == name) &&
            (identical(other.address, address) || other.address == address) &&
            (identical(other.ownerId, ownerId) || other.ownerId == ownerId) &&
            (identical(other.roomCount, roomCount) ||
                other.roomCount == roomCount) &&
            (identical(other.rentDueDate, rentDueDate) ||
                other.rentDueDate == rentDueDate) &&
            (identical(other.createdAt, createdAt) ||
                other.createdAt == createdAt));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
    runtimeType,
    id,
    name,
    address,
    ownerId,
    roomCount,
    rentDueDate,
    createdAt,
  );

  /// Create a copy of Pg
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$PgImplCopyWith<_$PgImpl> get copyWith =>
      __$$PgImplCopyWithImpl<_$PgImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$PgImplToJson(this);
  }
}

abstract class _Pg implements Pg {
  const factory _Pg({
    required final String id,
    final String? name,
    final String? address,
    final String? ownerId,
    final int? roomCount,
    final int? rentDueDate,
    final String? createdAt,
  }) = _$PgImpl;

  factory _Pg.fromJson(Map<String, dynamic> json) = _$PgImpl.fromJson;

  @override
  String get id;
  @override
  String? get name;
  @override
  String? get address;
  @override
  String? get ownerId;
  @override
  int? get roomCount;
  @override
  int? get rentDueDate;
  @override
  String? get createdAt;

  /// Create a copy of Pg
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$PgImplCopyWith<_$PgImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

PgConfig _$PgConfigFromJson(Map<String, dynamic> json) {
  return _PgConfig.fromJson(json);
}

/// @nodoc
mixin _$PgConfig {
  String get pgId => throw _privateConstructorUsedError;
  String get name => throw _privateConstructorUsedError;
  String? get tagline => throw _privateConstructorUsedError;
  @JsonKey(name: 'primaryColor')
  String? get primaryColorHex => throw _privateConstructorUsedError;
  String? get address => throw _privateConstructorUsedError;
  String? get phone => throw _privateConstructorUsedError;
  String? get email => throw _privateConstructorUsedError;
  int? get rentDueDate => throw _privateConstructorUsedError;
  String? get currency => throw _privateConstructorUsedError;
  PgFeatures? get features => throw _privateConstructorUsedError;

  /// Serializes this PgConfig to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of PgConfig
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $PgConfigCopyWith<PgConfig> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $PgConfigCopyWith<$Res> {
  factory $PgConfigCopyWith(PgConfig value, $Res Function(PgConfig) then) =
      _$PgConfigCopyWithImpl<$Res, PgConfig>;
  @useResult
  $Res call({
    String pgId,
    String name,
    String? tagline,
    @JsonKey(name: 'primaryColor') String? primaryColorHex,
    String? address,
    String? phone,
    String? email,
    int? rentDueDate,
    String? currency,
    PgFeatures? features,
  });

  $PgFeaturesCopyWith<$Res>? get features;
}

/// @nodoc
class _$PgConfigCopyWithImpl<$Res, $Val extends PgConfig>
    implements $PgConfigCopyWith<$Res> {
  _$PgConfigCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of PgConfig
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? pgId = null,
    Object? name = null,
    Object? tagline = freezed,
    Object? primaryColorHex = freezed,
    Object? address = freezed,
    Object? phone = freezed,
    Object? email = freezed,
    Object? rentDueDate = freezed,
    Object? currency = freezed,
    Object? features = freezed,
  }) {
    return _then(
      _value.copyWith(
            pgId: null == pgId
                ? _value.pgId
                : pgId // ignore: cast_nullable_to_non_nullable
                      as String,
            name: null == name
                ? _value.name
                : name // ignore: cast_nullable_to_non_nullable
                      as String,
            tagline: freezed == tagline
                ? _value.tagline
                : tagline // ignore: cast_nullable_to_non_nullable
                      as String?,
            primaryColorHex: freezed == primaryColorHex
                ? _value.primaryColorHex
                : primaryColorHex // ignore: cast_nullable_to_non_nullable
                      as String?,
            address: freezed == address
                ? _value.address
                : address // ignore: cast_nullable_to_non_nullable
                      as String?,
            phone: freezed == phone
                ? _value.phone
                : phone // ignore: cast_nullable_to_non_nullable
                      as String?,
            email: freezed == email
                ? _value.email
                : email // ignore: cast_nullable_to_non_nullable
                      as String?,
            rentDueDate: freezed == rentDueDate
                ? _value.rentDueDate
                : rentDueDate // ignore: cast_nullable_to_non_nullable
                      as int?,
            currency: freezed == currency
                ? _value.currency
                : currency // ignore: cast_nullable_to_non_nullable
                      as String?,
            features: freezed == features
                ? _value.features
                : features // ignore: cast_nullable_to_non_nullable
                      as PgFeatures?,
          )
          as $Val,
    );
  }

  /// Create a copy of PgConfig
  /// with the given fields replaced by the non-null parameter values.
  @override
  @pragma('vm:prefer-inline')
  $PgFeaturesCopyWith<$Res>? get features {
    if (_value.features == null) {
      return null;
    }

    return $PgFeaturesCopyWith<$Res>(_value.features!, (value) {
      return _then(_value.copyWith(features: value) as $Val);
    });
  }
}

/// @nodoc
abstract class _$$PgConfigImplCopyWith<$Res>
    implements $PgConfigCopyWith<$Res> {
  factory _$$PgConfigImplCopyWith(
    _$PgConfigImpl value,
    $Res Function(_$PgConfigImpl) then,
  ) = __$$PgConfigImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    String pgId,
    String name,
    String? tagline,
    @JsonKey(name: 'primaryColor') String? primaryColorHex,
    String? address,
    String? phone,
    String? email,
    int? rentDueDate,
    String? currency,
    PgFeatures? features,
  });

  @override
  $PgFeaturesCopyWith<$Res>? get features;
}

/// @nodoc
class __$$PgConfigImplCopyWithImpl<$Res>
    extends _$PgConfigCopyWithImpl<$Res, _$PgConfigImpl>
    implements _$$PgConfigImplCopyWith<$Res> {
  __$$PgConfigImplCopyWithImpl(
    _$PgConfigImpl _value,
    $Res Function(_$PgConfigImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of PgConfig
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? pgId = null,
    Object? name = null,
    Object? tagline = freezed,
    Object? primaryColorHex = freezed,
    Object? address = freezed,
    Object? phone = freezed,
    Object? email = freezed,
    Object? rentDueDate = freezed,
    Object? currency = freezed,
    Object? features = freezed,
  }) {
    return _then(
      _$PgConfigImpl(
        pgId: null == pgId
            ? _value.pgId
            : pgId // ignore: cast_nullable_to_non_nullable
                  as String,
        name: null == name
            ? _value.name
            : name // ignore: cast_nullable_to_non_nullable
                  as String,
        tagline: freezed == tagline
            ? _value.tagline
            : tagline // ignore: cast_nullable_to_non_nullable
                  as String?,
        primaryColorHex: freezed == primaryColorHex
            ? _value.primaryColorHex
            : primaryColorHex // ignore: cast_nullable_to_non_nullable
                  as String?,
        address: freezed == address
            ? _value.address
            : address // ignore: cast_nullable_to_non_nullable
                  as String?,
        phone: freezed == phone
            ? _value.phone
            : phone // ignore: cast_nullable_to_non_nullable
                  as String?,
        email: freezed == email
            ? _value.email
            : email // ignore: cast_nullable_to_non_nullable
                  as String?,
        rentDueDate: freezed == rentDueDate
            ? _value.rentDueDate
            : rentDueDate // ignore: cast_nullable_to_non_nullable
                  as int?,
        currency: freezed == currency
            ? _value.currency
            : currency // ignore: cast_nullable_to_non_nullable
                  as String?,
        features: freezed == features
            ? _value.features
            : features // ignore: cast_nullable_to_non_nullable
                  as PgFeatures?,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$PgConfigImpl implements _PgConfig {
  const _$PgConfigImpl({
    required this.pgId,
    required this.name,
    this.tagline,
    @JsonKey(name: 'primaryColor') this.primaryColorHex,
    this.address,
    this.phone,
    this.email,
    this.rentDueDate,
    this.currency,
    this.features,
  });

  factory _$PgConfigImpl.fromJson(Map<String, dynamic> json) =>
      _$$PgConfigImplFromJson(json);

  @override
  final String pgId;
  @override
  final String name;
  @override
  final String? tagline;
  @override
  @JsonKey(name: 'primaryColor')
  final String? primaryColorHex;
  @override
  final String? address;
  @override
  final String? phone;
  @override
  final String? email;
  @override
  final int? rentDueDate;
  @override
  final String? currency;
  @override
  final PgFeatures? features;

  @override
  String toString() {
    return 'PgConfig(pgId: $pgId, name: $name, tagline: $tagline, primaryColorHex: $primaryColorHex, address: $address, phone: $phone, email: $email, rentDueDate: $rentDueDate, currency: $currency, features: $features)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$PgConfigImpl &&
            (identical(other.pgId, pgId) || other.pgId == pgId) &&
            (identical(other.name, name) || other.name == name) &&
            (identical(other.tagline, tagline) || other.tagline == tagline) &&
            (identical(other.primaryColorHex, primaryColorHex) ||
                other.primaryColorHex == primaryColorHex) &&
            (identical(other.address, address) || other.address == address) &&
            (identical(other.phone, phone) || other.phone == phone) &&
            (identical(other.email, email) || other.email == email) &&
            (identical(other.rentDueDate, rentDueDate) ||
                other.rentDueDate == rentDueDate) &&
            (identical(other.currency, currency) ||
                other.currency == currency) &&
            (identical(other.features, features) ||
                other.features == features));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
    runtimeType,
    pgId,
    name,
    tagline,
    primaryColorHex,
    address,
    phone,
    email,
    rentDueDate,
    currency,
    features,
  );

  /// Create a copy of PgConfig
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$PgConfigImplCopyWith<_$PgConfigImpl> get copyWith =>
      __$$PgConfigImplCopyWithImpl<_$PgConfigImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$PgConfigImplToJson(this);
  }
}

abstract class _PgConfig implements PgConfig {
  const factory _PgConfig({
    required final String pgId,
    required final String name,
    final String? tagline,
    @JsonKey(name: 'primaryColor') final String? primaryColorHex,
    final String? address,
    final String? phone,
    final String? email,
    final int? rentDueDate,
    final String? currency,
    final PgFeatures? features,
  }) = _$PgConfigImpl;

  factory _PgConfig.fromJson(Map<String, dynamic> json) =
      _$PgConfigImpl.fromJson;

  @override
  String get pgId;
  @override
  String get name;
  @override
  String? get tagline;
  @override
  @JsonKey(name: 'primaryColor')
  String? get primaryColorHex;
  @override
  String? get address;
  @override
  String? get phone;
  @override
  String? get email;
  @override
  int? get rentDueDate;
  @override
  String? get currency;
  @override
  PgFeatures? get features;

  /// Create a copy of PgConfig
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$PgConfigImplCopyWith<_$PgConfigImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

PgFeatures _$PgFeaturesFromJson(Map<String, dynamic> json) {
  return _PgFeatures.fromJson(json);
}

/// @nodoc
mixin _$PgFeatures {
  bool get complaints => throw _privateConstructorUsedError;
  bool get cleaning => throw _privateConstructorUsedError;
  bool get addressImport => throw _privateConstructorUsedError;
  bool get whatsappReminders => throw _privateConstructorUsedError;

  /// Serializes this PgFeatures to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of PgFeatures
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $PgFeaturesCopyWith<PgFeatures> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $PgFeaturesCopyWith<$Res> {
  factory $PgFeaturesCopyWith(
    PgFeatures value,
    $Res Function(PgFeatures) then,
  ) = _$PgFeaturesCopyWithImpl<$Res, PgFeatures>;
  @useResult
  $Res call({
    bool complaints,
    bool cleaning,
    bool addressImport,
    bool whatsappReminders,
  });
}

/// @nodoc
class _$PgFeaturesCopyWithImpl<$Res, $Val extends PgFeatures>
    implements $PgFeaturesCopyWith<$Res> {
  _$PgFeaturesCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of PgFeatures
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? complaints = null,
    Object? cleaning = null,
    Object? addressImport = null,
    Object? whatsappReminders = null,
  }) {
    return _then(
      _value.copyWith(
            complaints: null == complaints
                ? _value.complaints
                : complaints // ignore: cast_nullable_to_non_nullable
                      as bool,
            cleaning: null == cleaning
                ? _value.cleaning
                : cleaning // ignore: cast_nullable_to_non_nullable
                      as bool,
            addressImport: null == addressImport
                ? _value.addressImport
                : addressImport // ignore: cast_nullable_to_non_nullable
                      as bool,
            whatsappReminders: null == whatsappReminders
                ? _value.whatsappReminders
                : whatsappReminders // ignore: cast_nullable_to_non_nullable
                      as bool,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$PgFeaturesImplCopyWith<$Res>
    implements $PgFeaturesCopyWith<$Res> {
  factory _$$PgFeaturesImplCopyWith(
    _$PgFeaturesImpl value,
    $Res Function(_$PgFeaturesImpl) then,
  ) = __$$PgFeaturesImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    bool complaints,
    bool cleaning,
    bool addressImport,
    bool whatsappReminders,
  });
}

/// @nodoc
class __$$PgFeaturesImplCopyWithImpl<$Res>
    extends _$PgFeaturesCopyWithImpl<$Res, _$PgFeaturesImpl>
    implements _$$PgFeaturesImplCopyWith<$Res> {
  __$$PgFeaturesImplCopyWithImpl(
    _$PgFeaturesImpl _value,
    $Res Function(_$PgFeaturesImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of PgFeatures
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? complaints = null,
    Object? cleaning = null,
    Object? addressImport = null,
    Object? whatsappReminders = null,
  }) {
    return _then(
      _$PgFeaturesImpl(
        complaints: null == complaints
            ? _value.complaints
            : complaints // ignore: cast_nullable_to_non_nullable
                  as bool,
        cleaning: null == cleaning
            ? _value.cleaning
            : cleaning // ignore: cast_nullable_to_non_nullable
                  as bool,
        addressImport: null == addressImport
            ? _value.addressImport
            : addressImport // ignore: cast_nullable_to_non_nullable
                  as bool,
        whatsappReminders: null == whatsappReminders
            ? _value.whatsappReminders
            : whatsappReminders // ignore: cast_nullable_to_non_nullable
                  as bool,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$PgFeaturesImpl implements _PgFeatures {
  const _$PgFeaturesImpl({
    this.complaints = true,
    this.cleaning = true,
    this.addressImport = false,
    this.whatsappReminders = false,
  });

  factory _$PgFeaturesImpl.fromJson(Map<String, dynamic> json) =>
      _$$PgFeaturesImplFromJson(json);

  @override
  @JsonKey()
  final bool complaints;
  @override
  @JsonKey()
  final bool cleaning;
  @override
  @JsonKey()
  final bool addressImport;
  @override
  @JsonKey()
  final bool whatsappReminders;

  @override
  String toString() {
    return 'PgFeatures(complaints: $complaints, cleaning: $cleaning, addressImport: $addressImport, whatsappReminders: $whatsappReminders)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$PgFeaturesImpl &&
            (identical(other.complaints, complaints) ||
                other.complaints == complaints) &&
            (identical(other.cleaning, cleaning) ||
                other.cleaning == cleaning) &&
            (identical(other.addressImport, addressImport) ||
                other.addressImport == addressImport) &&
            (identical(other.whatsappReminders, whatsappReminders) ||
                other.whatsappReminders == whatsappReminders));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
    runtimeType,
    complaints,
    cleaning,
    addressImport,
    whatsappReminders,
  );

  /// Create a copy of PgFeatures
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$PgFeaturesImplCopyWith<_$PgFeaturesImpl> get copyWith =>
      __$$PgFeaturesImplCopyWithImpl<_$PgFeaturesImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$PgFeaturesImplToJson(this);
  }
}

abstract class _PgFeatures implements PgFeatures {
  const factory _PgFeatures({
    final bool complaints,
    final bool cleaning,
    final bool addressImport,
    final bool whatsappReminders,
  }) = _$PgFeaturesImpl;

  factory _PgFeatures.fromJson(Map<String, dynamic> json) =
      _$PgFeaturesImpl.fromJson;

  @override
  bool get complaints;
  @override
  bool get cleaning;
  @override
  bool get addressImport;
  @override
  bool get whatsappReminders;

  /// Create a copy of PgFeatures
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$PgFeaturesImplCopyWith<_$PgFeaturesImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
