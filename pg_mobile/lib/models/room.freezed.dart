// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'room.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
  'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models',
);

Room _$RoomFromJson(Map<String, dynamic> json) {
  return _Room.fromJson(json);
}

/// @nodoc
mixin _$Room {
  String get id => throw _privateConstructorUsedError;
  String? get pgId => throw _privateConstructorUsedError;
  String get roomNumber => throw _privateConstructorUsedError;
  String? get roomType => throw _privateConstructorUsedError;
  int get sharingCapacity => throw _privateConstructorUsedError;
  int get currentOccupancy => throw _privateConstructorUsedError;
  num get rentAmount => throw _privateConstructorUsedError;
  String? get status => throw _privateConstructorUsedError;

  /// Serializes this Room to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of Room
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $RoomCopyWith<Room> get copyWith => throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $RoomCopyWith<$Res> {
  factory $RoomCopyWith(Room value, $Res Function(Room) then) =
      _$RoomCopyWithImpl<$Res, Room>;
  @useResult
  $Res call({
    String id,
    String? pgId,
    String roomNumber,
    String? roomType,
    int sharingCapacity,
    int currentOccupancy,
    num rentAmount,
    String? status,
  });
}

/// @nodoc
class _$RoomCopyWithImpl<$Res, $Val extends Room>
    implements $RoomCopyWith<$Res> {
  _$RoomCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of Room
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? pgId = freezed,
    Object? roomNumber = null,
    Object? roomType = freezed,
    Object? sharingCapacity = null,
    Object? currentOccupancy = null,
    Object? rentAmount = null,
    Object? status = freezed,
  }) {
    return _then(
      _value.copyWith(
            id: null == id
                ? _value.id
                : id // ignore: cast_nullable_to_non_nullable
                      as String,
            pgId: freezed == pgId
                ? _value.pgId
                : pgId // ignore: cast_nullable_to_non_nullable
                      as String?,
            roomNumber: null == roomNumber
                ? _value.roomNumber
                : roomNumber // ignore: cast_nullable_to_non_nullable
                      as String,
            roomType: freezed == roomType
                ? _value.roomType
                : roomType // ignore: cast_nullable_to_non_nullable
                      as String?,
            sharingCapacity: null == sharingCapacity
                ? _value.sharingCapacity
                : sharingCapacity // ignore: cast_nullable_to_non_nullable
                      as int,
            currentOccupancy: null == currentOccupancy
                ? _value.currentOccupancy
                : currentOccupancy // ignore: cast_nullable_to_non_nullable
                      as int,
            rentAmount: null == rentAmount
                ? _value.rentAmount
                : rentAmount // ignore: cast_nullable_to_non_nullable
                      as num,
            status: freezed == status
                ? _value.status
                : status // ignore: cast_nullable_to_non_nullable
                      as String?,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$RoomImplCopyWith<$Res> implements $RoomCopyWith<$Res> {
  factory _$$RoomImplCopyWith(
    _$RoomImpl value,
    $Res Function(_$RoomImpl) then,
  ) = __$$RoomImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    String id,
    String? pgId,
    String roomNumber,
    String? roomType,
    int sharingCapacity,
    int currentOccupancy,
    num rentAmount,
    String? status,
  });
}

/// @nodoc
class __$$RoomImplCopyWithImpl<$Res>
    extends _$RoomCopyWithImpl<$Res, _$RoomImpl>
    implements _$$RoomImplCopyWith<$Res> {
  __$$RoomImplCopyWithImpl(_$RoomImpl _value, $Res Function(_$RoomImpl) _then)
    : super(_value, _then);

  /// Create a copy of Room
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? pgId = freezed,
    Object? roomNumber = null,
    Object? roomType = freezed,
    Object? sharingCapacity = null,
    Object? currentOccupancy = null,
    Object? rentAmount = null,
    Object? status = freezed,
  }) {
    return _then(
      _$RoomImpl(
        id: null == id
            ? _value.id
            : id // ignore: cast_nullable_to_non_nullable
                  as String,
        pgId: freezed == pgId
            ? _value.pgId
            : pgId // ignore: cast_nullable_to_non_nullable
                  as String?,
        roomNumber: null == roomNumber
            ? _value.roomNumber
            : roomNumber // ignore: cast_nullable_to_non_nullable
                  as String,
        roomType: freezed == roomType
            ? _value.roomType
            : roomType // ignore: cast_nullable_to_non_nullable
                  as String?,
        sharingCapacity: null == sharingCapacity
            ? _value.sharingCapacity
            : sharingCapacity // ignore: cast_nullable_to_non_nullable
                  as int,
        currentOccupancy: null == currentOccupancy
            ? _value.currentOccupancy
            : currentOccupancy // ignore: cast_nullable_to_non_nullable
                  as int,
        rentAmount: null == rentAmount
            ? _value.rentAmount
            : rentAmount // ignore: cast_nullable_to_non_nullable
                  as num,
        status: freezed == status
            ? _value.status
            : status // ignore: cast_nullable_to_non_nullable
                  as String?,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$RoomImpl implements _Room {
  const _$RoomImpl({
    required this.id,
    this.pgId,
    required this.roomNumber,
    this.roomType,
    this.sharingCapacity = 1,
    this.currentOccupancy = 0,
    this.rentAmount = 0,
    this.status,
  });

  factory _$RoomImpl.fromJson(Map<String, dynamic> json) =>
      _$$RoomImplFromJson(json);

  @override
  final String id;
  @override
  final String? pgId;
  @override
  final String roomNumber;
  @override
  final String? roomType;
  @override
  @JsonKey()
  final int sharingCapacity;
  @override
  @JsonKey()
  final int currentOccupancy;
  @override
  @JsonKey()
  final num rentAmount;
  @override
  final String? status;

  @override
  String toString() {
    return 'Room(id: $id, pgId: $pgId, roomNumber: $roomNumber, roomType: $roomType, sharingCapacity: $sharingCapacity, currentOccupancy: $currentOccupancy, rentAmount: $rentAmount, status: $status)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$RoomImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.pgId, pgId) || other.pgId == pgId) &&
            (identical(other.roomNumber, roomNumber) ||
                other.roomNumber == roomNumber) &&
            (identical(other.roomType, roomType) ||
                other.roomType == roomType) &&
            (identical(other.sharingCapacity, sharingCapacity) ||
                other.sharingCapacity == sharingCapacity) &&
            (identical(other.currentOccupancy, currentOccupancy) ||
                other.currentOccupancy == currentOccupancy) &&
            (identical(other.rentAmount, rentAmount) ||
                other.rentAmount == rentAmount) &&
            (identical(other.status, status) || other.status == status));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
    runtimeType,
    id,
    pgId,
    roomNumber,
    roomType,
    sharingCapacity,
    currentOccupancy,
    rentAmount,
    status,
  );

  /// Create a copy of Room
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$RoomImplCopyWith<_$RoomImpl> get copyWith =>
      __$$RoomImplCopyWithImpl<_$RoomImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$RoomImplToJson(this);
  }
}

abstract class _Room implements Room {
  const factory _Room({
    required final String id,
    final String? pgId,
    required final String roomNumber,
    final String? roomType,
    final int sharingCapacity,
    final int currentOccupancy,
    final num rentAmount,
    final String? status,
  }) = _$RoomImpl;

  factory _Room.fromJson(Map<String, dynamic> json) = _$RoomImpl.fromJson;

  @override
  String get id;
  @override
  String? get pgId;
  @override
  String get roomNumber;
  @override
  String? get roomType;
  @override
  int get sharingCapacity;
  @override
  int get currentOccupancy;
  @override
  num get rentAmount;
  @override
  String? get status;

  /// Create a copy of Room
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$RoomImplCopyWith<_$RoomImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

RoomMember _$RoomMemberFromJson(Map<String, dynamic> json) {
  return _RoomMember.fromJson(json);
}

/// @nodoc
mixin _$RoomMember {
  String get uid => throw _privateConstructorUsedError;
  String get name => throw _privateConstructorUsedError;
  String? get email => throw _privateConstructorUsedError;
  String? get phone => throw _privateConstructorUsedError;
  String? get status => throw _privateConstructorUsedError;
  String? get moveInDate => throw _privateConstructorUsedError;

  /// Serializes this RoomMember to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of RoomMember
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $RoomMemberCopyWith<RoomMember> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $RoomMemberCopyWith<$Res> {
  factory $RoomMemberCopyWith(
    RoomMember value,
    $Res Function(RoomMember) then,
  ) = _$RoomMemberCopyWithImpl<$Res, RoomMember>;
  @useResult
  $Res call({
    String uid,
    String name,
    String? email,
    String? phone,
    String? status,
    String? moveInDate,
  });
}

/// @nodoc
class _$RoomMemberCopyWithImpl<$Res, $Val extends RoomMember>
    implements $RoomMemberCopyWith<$Res> {
  _$RoomMemberCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of RoomMember
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? uid = null,
    Object? name = null,
    Object? email = freezed,
    Object? phone = freezed,
    Object? status = freezed,
    Object? moveInDate = freezed,
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
            status: freezed == status
                ? _value.status
                : status // ignore: cast_nullable_to_non_nullable
                      as String?,
            moveInDate: freezed == moveInDate
                ? _value.moveInDate
                : moveInDate // ignore: cast_nullable_to_non_nullable
                      as String?,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$RoomMemberImplCopyWith<$Res>
    implements $RoomMemberCopyWith<$Res> {
  factory _$$RoomMemberImplCopyWith(
    _$RoomMemberImpl value,
    $Res Function(_$RoomMemberImpl) then,
  ) = __$$RoomMemberImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    String uid,
    String name,
    String? email,
    String? phone,
    String? status,
    String? moveInDate,
  });
}

/// @nodoc
class __$$RoomMemberImplCopyWithImpl<$Res>
    extends _$RoomMemberCopyWithImpl<$Res, _$RoomMemberImpl>
    implements _$$RoomMemberImplCopyWith<$Res> {
  __$$RoomMemberImplCopyWithImpl(
    _$RoomMemberImpl _value,
    $Res Function(_$RoomMemberImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of RoomMember
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? uid = null,
    Object? name = null,
    Object? email = freezed,
    Object? phone = freezed,
    Object? status = freezed,
    Object? moveInDate = freezed,
  }) {
    return _then(
      _$RoomMemberImpl(
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
        status: freezed == status
            ? _value.status
            : status // ignore: cast_nullable_to_non_nullable
                  as String?,
        moveInDate: freezed == moveInDate
            ? _value.moveInDate
            : moveInDate // ignore: cast_nullable_to_non_nullable
                  as String?,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$RoomMemberImpl implements _RoomMember {
  const _$RoomMemberImpl({
    required this.uid,
    required this.name,
    this.email,
    this.phone,
    this.status,
    this.moveInDate,
  });

  factory _$RoomMemberImpl.fromJson(Map<String, dynamic> json) =>
      _$$RoomMemberImplFromJson(json);

  @override
  final String uid;
  @override
  final String name;
  @override
  final String? email;
  @override
  final String? phone;
  @override
  final String? status;
  @override
  final String? moveInDate;

  @override
  String toString() {
    return 'RoomMember(uid: $uid, name: $name, email: $email, phone: $phone, status: $status, moveInDate: $moveInDate)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$RoomMemberImpl &&
            (identical(other.uid, uid) || other.uid == uid) &&
            (identical(other.name, name) || other.name == name) &&
            (identical(other.email, email) || other.email == email) &&
            (identical(other.phone, phone) || other.phone == phone) &&
            (identical(other.status, status) || other.status == status) &&
            (identical(other.moveInDate, moveInDate) ||
                other.moveInDate == moveInDate));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode =>
      Object.hash(runtimeType, uid, name, email, phone, status, moveInDate);

  /// Create a copy of RoomMember
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$RoomMemberImplCopyWith<_$RoomMemberImpl> get copyWith =>
      __$$RoomMemberImplCopyWithImpl<_$RoomMemberImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$RoomMemberImplToJson(this);
  }
}

abstract class _RoomMember implements RoomMember {
  const factory _RoomMember({
    required final String uid,
    required final String name,
    final String? email,
    final String? phone,
    final String? status,
    final String? moveInDate,
  }) = _$RoomMemberImpl;

  factory _RoomMember.fromJson(Map<String, dynamic> json) =
      _$RoomMemberImpl.fromJson;

  @override
  String get uid;
  @override
  String get name;
  @override
  String? get email;
  @override
  String? get phone;
  @override
  String? get status;
  @override
  String? get moveInDate;

  /// Create a copy of RoomMember
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$RoomMemberImplCopyWith<_$RoomMemberImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
mixin _$RoomDetail {
  Room get room => throw _privateConstructorUsedError;

  /// Create a copy of RoomDetail
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $RoomDetailCopyWith<RoomDetail> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $RoomDetailCopyWith<$Res> {
  factory $RoomDetailCopyWith(
    RoomDetail value,
    $Res Function(RoomDetail) then,
  ) = _$RoomDetailCopyWithImpl<$Res, RoomDetail>;
  @useResult
  $Res call({Room room});

  $RoomCopyWith<$Res> get room;
}

/// @nodoc
class _$RoomDetailCopyWithImpl<$Res, $Val extends RoomDetail>
    implements $RoomDetailCopyWith<$Res> {
  _$RoomDetailCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of RoomDetail
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({Object? room = null}) {
    return _then(
      _value.copyWith(
            room: null == room
                ? _value.room
                : room // ignore: cast_nullable_to_non_nullable
                      as Room,
          )
          as $Val,
    );
  }

  /// Create a copy of RoomDetail
  /// with the given fields replaced by the non-null parameter values.
  @override
  @pragma('vm:prefer-inline')
  $RoomCopyWith<$Res> get room {
    return $RoomCopyWith<$Res>(_value.room, (value) {
      return _then(_value.copyWith(room: value) as $Val);
    });
  }
}

/// @nodoc
abstract class _$$RoomDetailImplCopyWith<$Res>
    implements $RoomDetailCopyWith<$Res> {
  factory _$$RoomDetailImplCopyWith(
    _$RoomDetailImpl value,
    $Res Function(_$RoomDetailImpl) then,
  ) = __$$RoomDetailImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({Room room});

  @override
  $RoomCopyWith<$Res> get room;
}

/// @nodoc
class __$$RoomDetailImplCopyWithImpl<$Res>
    extends _$RoomDetailCopyWithImpl<$Res, _$RoomDetailImpl>
    implements _$$RoomDetailImplCopyWith<$Res> {
  __$$RoomDetailImplCopyWithImpl(
    _$RoomDetailImpl _value,
    $Res Function(_$RoomDetailImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of RoomDetail
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({Object? room = null}) {
    return _then(
      _$RoomDetailImpl(
        room: null == room
            ? _value.room
            : room // ignore: cast_nullable_to_non_nullable
                  as Room,
      ),
    );
  }
}

/// @nodoc

class _$RoomDetailImpl implements _RoomDetail {
  const _$RoomDetailImpl({required this.room});

  @override
  final Room room;

  @override
  String toString() {
    return 'RoomDetail(room: $room)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$RoomDetailImpl &&
            (identical(other.room, room) || other.room == room));
  }

  @override
  int get hashCode => Object.hash(runtimeType, room);

  /// Create a copy of RoomDetail
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$RoomDetailImplCopyWith<_$RoomDetailImpl> get copyWith =>
      __$$RoomDetailImplCopyWithImpl<_$RoomDetailImpl>(this, _$identity);
}

abstract class _RoomDetail implements RoomDetail {
  const factory _RoomDetail({required final Room room}) = _$RoomDetailImpl;

  @override
  Room get room;

  /// Create a copy of RoomDetail
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$RoomDetailImplCopyWith<_$RoomDetailImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

RoomDetailResponse _$RoomDetailResponseFromJson(Map<String, dynamic> json) {
  return _RoomDetailResponse.fromJson(json);
}

/// @nodoc
mixin _$RoomDetailResponse {
  Room get room => throw _privateConstructorUsedError;
  List<RoomMember> get members => throw _privateConstructorUsedError;
  List<AssignableTenant> get assignable => throw _privateConstructorUsedError;
  List<OtherRoom> get otherRooms => throw _privateConstructorUsedError;

  /// Serializes this RoomDetailResponse to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of RoomDetailResponse
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $RoomDetailResponseCopyWith<RoomDetailResponse> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $RoomDetailResponseCopyWith<$Res> {
  factory $RoomDetailResponseCopyWith(
    RoomDetailResponse value,
    $Res Function(RoomDetailResponse) then,
  ) = _$RoomDetailResponseCopyWithImpl<$Res, RoomDetailResponse>;
  @useResult
  $Res call({
    Room room,
    List<RoomMember> members,
    List<AssignableTenant> assignable,
    List<OtherRoom> otherRooms,
  });

  $RoomCopyWith<$Res> get room;
}

/// @nodoc
class _$RoomDetailResponseCopyWithImpl<$Res, $Val extends RoomDetailResponse>
    implements $RoomDetailResponseCopyWith<$Res> {
  _$RoomDetailResponseCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of RoomDetailResponse
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? room = null,
    Object? members = null,
    Object? assignable = null,
    Object? otherRooms = null,
  }) {
    return _then(
      _value.copyWith(
            room: null == room
                ? _value.room
                : room // ignore: cast_nullable_to_non_nullable
                      as Room,
            members: null == members
                ? _value.members
                : members // ignore: cast_nullable_to_non_nullable
                      as List<RoomMember>,
            assignable: null == assignable
                ? _value.assignable
                : assignable // ignore: cast_nullable_to_non_nullable
                      as List<AssignableTenant>,
            otherRooms: null == otherRooms
                ? _value.otherRooms
                : otherRooms // ignore: cast_nullable_to_non_nullable
                      as List<OtherRoom>,
          )
          as $Val,
    );
  }

  /// Create a copy of RoomDetailResponse
  /// with the given fields replaced by the non-null parameter values.
  @override
  @pragma('vm:prefer-inline')
  $RoomCopyWith<$Res> get room {
    return $RoomCopyWith<$Res>(_value.room, (value) {
      return _then(_value.copyWith(room: value) as $Val);
    });
  }
}

/// @nodoc
abstract class _$$RoomDetailResponseImplCopyWith<$Res>
    implements $RoomDetailResponseCopyWith<$Res> {
  factory _$$RoomDetailResponseImplCopyWith(
    _$RoomDetailResponseImpl value,
    $Res Function(_$RoomDetailResponseImpl) then,
  ) = __$$RoomDetailResponseImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    Room room,
    List<RoomMember> members,
    List<AssignableTenant> assignable,
    List<OtherRoom> otherRooms,
  });

  @override
  $RoomCopyWith<$Res> get room;
}

/// @nodoc
class __$$RoomDetailResponseImplCopyWithImpl<$Res>
    extends _$RoomDetailResponseCopyWithImpl<$Res, _$RoomDetailResponseImpl>
    implements _$$RoomDetailResponseImplCopyWith<$Res> {
  __$$RoomDetailResponseImplCopyWithImpl(
    _$RoomDetailResponseImpl _value,
    $Res Function(_$RoomDetailResponseImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of RoomDetailResponse
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? room = null,
    Object? members = null,
    Object? assignable = null,
    Object? otherRooms = null,
  }) {
    return _then(
      _$RoomDetailResponseImpl(
        room: null == room
            ? _value.room
            : room // ignore: cast_nullable_to_non_nullable
                  as Room,
        members: null == members
            ? _value._members
            : members // ignore: cast_nullable_to_non_nullable
                  as List<RoomMember>,
        assignable: null == assignable
            ? _value._assignable
            : assignable // ignore: cast_nullable_to_non_nullable
                  as List<AssignableTenant>,
        otherRooms: null == otherRooms
            ? _value._otherRooms
            : otherRooms // ignore: cast_nullable_to_non_nullable
                  as List<OtherRoom>,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$RoomDetailResponseImpl implements _RoomDetailResponse {
  const _$RoomDetailResponseImpl({
    required this.room,
    final List<RoomMember> members = const [],
    final List<AssignableTenant> assignable = const [],
    final List<OtherRoom> otherRooms = const [],
  }) : _members = members,
       _assignable = assignable,
       _otherRooms = otherRooms;

  factory _$RoomDetailResponseImpl.fromJson(Map<String, dynamic> json) =>
      _$$RoomDetailResponseImplFromJson(json);

  @override
  final Room room;
  final List<RoomMember> _members;
  @override
  @JsonKey()
  List<RoomMember> get members {
    if (_members is EqualUnmodifiableListView) return _members;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_members);
  }

  final List<AssignableTenant> _assignable;
  @override
  @JsonKey()
  List<AssignableTenant> get assignable {
    if (_assignable is EqualUnmodifiableListView) return _assignable;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_assignable);
  }

  final List<OtherRoom> _otherRooms;
  @override
  @JsonKey()
  List<OtherRoom> get otherRooms {
    if (_otherRooms is EqualUnmodifiableListView) return _otherRooms;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_otherRooms);
  }

  @override
  String toString() {
    return 'RoomDetailResponse(room: $room, members: $members, assignable: $assignable, otherRooms: $otherRooms)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$RoomDetailResponseImpl &&
            (identical(other.room, room) || other.room == room) &&
            const DeepCollectionEquality().equals(other._members, _members) &&
            const DeepCollectionEquality().equals(
              other._assignable,
              _assignable,
            ) &&
            const DeepCollectionEquality().equals(
              other._otherRooms,
              _otherRooms,
            ));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
    runtimeType,
    room,
    const DeepCollectionEquality().hash(_members),
    const DeepCollectionEquality().hash(_assignable),
    const DeepCollectionEquality().hash(_otherRooms),
  );

  /// Create a copy of RoomDetailResponse
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$RoomDetailResponseImplCopyWith<_$RoomDetailResponseImpl> get copyWith =>
      __$$RoomDetailResponseImplCopyWithImpl<_$RoomDetailResponseImpl>(
        this,
        _$identity,
      );

  @override
  Map<String, dynamic> toJson() {
    return _$$RoomDetailResponseImplToJson(this);
  }
}

abstract class _RoomDetailResponse implements RoomDetailResponse {
  const factory _RoomDetailResponse({
    required final Room room,
    final List<RoomMember> members,
    final List<AssignableTenant> assignable,
    final List<OtherRoom> otherRooms,
  }) = _$RoomDetailResponseImpl;

  factory _RoomDetailResponse.fromJson(Map<String, dynamic> json) =
      _$RoomDetailResponseImpl.fromJson;

  @override
  Room get room;
  @override
  List<RoomMember> get members;
  @override
  List<AssignableTenant> get assignable;
  @override
  List<OtherRoom> get otherRooms;

  /// Create a copy of RoomDetailResponse
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$RoomDetailResponseImplCopyWith<_$RoomDetailResponseImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

AssignableTenant _$AssignableTenantFromJson(Map<String, dynamic> json) {
  return _AssignableTenant.fromJson(json);
}

/// @nodoc
mixin _$AssignableTenant {
  String get uid => throw _privateConstructorUsedError;
  String get name => throw _privateConstructorUsedError;
  String? get email => throw _privateConstructorUsedError;
  String? get phone => throw _privateConstructorUsedError;

  /// Serializes this AssignableTenant to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of AssignableTenant
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $AssignableTenantCopyWith<AssignableTenant> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $AssignableTenantCopyWith<$Res> {
  factory $AssignableTenantCopyWith(
    AssignableTenant value,
    $Res Function(AssignableTenant) then,
  ) = _$AssignableTenantCopyWithImpl<$Res, AssignableTenant>;
  @useResult
  $Res call({String uid, String name, String? email, String? phone});
}

/// @nodoc
class _$AssignableTenantCopyWithImpl<$Res, $Val extends AssignableTenant>
    implements $AssignableTenantCopyWith<$Res> {
  _$AssignableTenantCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of AssignableTenant
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? uid = null,
    Object? name = null,
    Object? email = freezed,
    Object? phone = freezed,
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
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$AssignableTenantImplCopyWith<$Res>
    implements $AssignableTenantCopyWith<$Res> {
  factory _$$AssignableTenantImplCopyWith(
    _$AssignableTenantImpl value,
    $Res Function(_$AssignableTenantImpl) then,
  ) = __$$AssignableTenantImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({String uid, String name, String? email, String? phone});
}

/// @nodoc
class __$$AssignableTenantImplCopyWithImpl<$Res>
    extends _$AssignableTenantCopyWithImpl<$Res, _$AssignableTenantImpl>
    implements _$$AssignableTenantImplCopyWith<$Res> {
  __$$AssignableTenantImplCopyWithImpl(
    _$AssignableTenantImpl _value,
    $Res Function(_$AssignableTenantImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of AssignableTenant
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? uid = null,
    Object? name = null,
    Object? email = freezed,
    Object? phone = freezed,
  }) {
    return _then(
      _$AssignableTenantImpl(
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
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$AssignableTenantImpl implements _AssignableTenant {
  const _$AssignableTenantImpl({
    required this.uid,
    required this.name,
    this.email,
    this.phone,
  });

  factory _$AssignableTenantImpl.fromJson(Map<String, dynamic> json) =>
      _$$AssignableTenantImplFromJson(json);

  @override
  final String uid;
  @override
  final String name;
  @override
  final String? email;
  @override
  final String? phone;

  @override
  String toString() {
    return 'AssignableTenant(uid: $uid, name: $name, email: $email, phone: $phone)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$AssignableTenantImpl &&
            (identical(other.uid, uid) || other.uid == uid) &&
            (identical(other.name, name) || other.name == name) &&
            (identical(other.email, email) || other.email == email) &&
            (identical(other.phone, phone) || other.phone == phone));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(runtimeType, uid, name, email, phone);

  /// Create a copy of AssignableTenant
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$AssignableTenantImplCopyWith<_$AssignableTenantImpl> get copyWith =>
      __$$AssignableTenantImplCopyWithImpl<_$AssignableTenantImpl>(
        this,
        _$identity,
      );

  @override
  Map<String, dynamic> toJson() {
    return _$$AssignableTenantImplToJson(this);
  }
}

abstract class _AssignableTenant implements AssignableTenant {
  const factory _AssignableTenant({
    required final String uid,
    required final String name,
    final String? email,
    final String? phone,
  }) = _$AssignableTenantImpl;

  factory _AssignableTenant.fromJson(Map<String, dynamic> json) =
      _$AssignableTenantImpl.fromJson;

  @override
  String get uid;
  @override
  String get name;
  @override
  String? get email;
  @override
  String? get phone;

  /// Create a copy of AssignableTenant
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$AssignableTenantImplCopyWith<_$AssignableTenantImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

OtherRoom _$OtherRoomFromJson(Map<String, dynamic> json) {
  return _OtherRoom.fromJson(json);
}

/// @nodoc
mixin _$OtherRoom {
  String get id => throw _privateConstructorUsedError;
  String get roomNumber => throw _privateConstructorUsedError;
  int get sharingCapacity => throw _privateConstructorUsedError;
  int get currentOccupancy => throw _privateConstructorUsedError;
  bool get available => throw _privateConstructorUsedError;

  /// Serializes this OtherRoom to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of OtherRoom
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $OtherRoomCopyWith<OtherRoom> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $OtherRoomCopyWith<$Res> {
  factory $OtherRoomCopyWith(OtherRoom value, $Res Function(OtherRoom) then) =
      _$OtherRoomCopyWithImpl<$Res, OtherRoom>;
  @useResult
  $Res call({
    String id,
    String roomNumber,
    int sharingCapacity,
    int currentOccupancy,
    bool available,
  });
}

/// @nodoc
class _$OtherRoomCopyWithImpl<$Res, $Val extends OtherRoom>
    implements $OtherRoomCopyWith<$Res> {
  _$OtherRoomCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of OtherRoom
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? roomNumber = null,
    Object? sharingCapacity = null,
    Object? currentOccupancy = null,
    Object? available = null,
  }) {
    return _then(
      _value.copyWith(
            id: null == id
                ? _value.id
                : id // ignore: cast_nullable_to_non_nullable
                      as String,
            roomNumber: null == roomNumber
                ? _value.roomNumber
                : roomNumber // ignore: cast_nullable_to_non_nullable
                      as String,
            sharingCapacity: null == sharingCapacity
                ? _value.sharingCapacity
                : sharingCapacity // ignore: cast_nullable_to_non_nullable
                      as int,
            currentOccupancy: null == currentOccupancy
                ? _value.currentOccupancy
                : currentOccupancy // ignore: cast_nullable_to_non_nullable
                      as int,
            available: null == available
                ? _value.available
                : available // ignore: cast_nullable_to_non_nullable
                      as bool,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$OtherRoomImplCopyWith<$Res>
    implements $OtherRoomCopyWith<$Res> {
  factory _$$OtherRoomImplCopyWith(
    _$OtherRoomImpl value,
    $Res Function(_$OtherRoomImpl) then,
  ) = __$$OtherRoomImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    String id,
    String roomNumber,
    int sharingCapacity,
    int currentOccupancy,
    bool available,
  });
}

/// @nodoc
class __$$OtherRoomImplCopyWithImpl<$Res>
    extends _$OtherRoomCopyWithImpl<$Res, _$OtherRoomImpl>
    implements _$$OtherRoomImplCopyWith<$Res> {
  __$$OtherRoomImplCopyWithImpl(
    _$OtherRoomImpl _value,
    $Res Function(_$OtherRoomImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of OtherRoom
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? roomNumber = null,
    Object? sharingCapacity = null,
    Object? currentOccupancy = null,
    Object? available = null,
  }) {
    return _then(
      _$OtherRoomImpl(
        id: null == id
            ? _value.id
            : id // ignore: cast_nullable_to_non_nullable
                  as String,
        roomNumber: null == roomNumber
            ? _value.roomNumber
            : roomNumber // ignore: cast_nullable_to_non_nullable
                  as String,
        sharingCapacity: null == sharingCapacity
            ? _value.sharingCapacity
            : sharingCapacity // ignore: cast_nullable_to_non_nullable
                  as int,
        currentOccupancy: null == currentOccupancy
            ? _value.currentOccupancy
            : currentOccupancy // ignore: cast_nullable_to_non_nullable
                  as int,
        available: null == available
            ? _value.available
            : available // ignore: cast_nullable_to_non_nullable
                  as bool,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$OtherRoomImpl implements _OtherRoom {
  const _$OtherRoomImpl({
    required this.id,
    required this.roomNumber,
    this.sharingCapacity = 1,
    this.currentOccupancy = 0,
    this.available = false,
  });

  factory _$OtherRoomImpl.fromJson(Map<String, dynamic> json) =>
      _$$OtherRoomImplFromJson(json);

  @override
  final String id;
  @override
  final String roomNumber;
  @override
  @JsonKey()
  final int sharingCapacity;
  @override
  @JsonKey()
  final int currentOccupancy;
  @override
  @JsonKey()
  final bool available;

  @override
  String toString() {
    return 'OtherRoom(id: $id, roomNumber: $roomNumber, sharingCapacity: $sharingCapacity, currentOccupancy: $currentOccupancy, available: $available)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$OtherRoomImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.roomNumber, roomNumber) ||
                other.roomNumber == roomNumber) &&
            (identical(other.sharingCapacity, sharingCapacity) ||
                other.sharingCapacity == sharingCapacity) &&
            (identical(other.currentOccupancy, currentOccupancy) ||
                other.currentOccupancy == currentOccupancy) &&
            (identical(other.available, available) ||
                other.available == available));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
    runtimeType,
    id,
    roomNumber,
    sharingCapacity,
    currentOccupancy,
    available,
  );

  /// Create a copy of OtherRoom
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$OtherRoomImplCopyWith<_$OtherRoomImpl> get copyWith =>
      __$$OtherRoomImplCopyWithImpl<_$OtherRoomImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$OtherRoomImplToJson(this);
  }
}

abstract class _OtherRoom implements OtherRoom {
  const factory _OtherRoom({
    required final String id,
    required final String roomNumber,
    final int sharingCapacity,
    final int currentOccupancy,
    final bool available,
  }) = _$OtherRoomImpl;

  factory _OtherRoom.fromJson(Map<String, dynamic> json) =
      _$OtherRoomImpl.fromJson;

  @override
  String get id;
  @override
  String get roomNumber;
  @override
  int get sharingCapacity;
  @override
  int get currentOccupancy;
  @override
  bool get available;

  /// Create a copy of OtherRoom
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$OtherRoomImplCopyWith<_$OtherRoomImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
