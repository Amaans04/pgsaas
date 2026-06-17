import 'package:freezed_annotation/freezed_annotation.dart';

part 'pg.freezed.dart';
part 'pg.g.dart';

@freezed
class Pg with _$Pg {
  const factory Pg({
    required String id,
    String? name,
    String? address,
    String? ownerId,
    int? roomCount,
    int? rentDueDate,
    String? createdAt,
  }) = _Pg;

  factory Pg.fromJson(Map<String, dynamic> json) => _$PgFromJson(json);
}

@freezed
class PgConfig with _$PgConfig {
  const factory PgConfig({
    required String pgId,
    required String name,
    String? tagline,
    @JsonKey(name: 'primaryColor') String? primaryColorHex,
    String? address,
    String? phone,
    String? email,
    int? rentDueDate,
    String? currency,
    PgFeatures? features,
  }) = _PgConfig;

  factory PgConfig.fromJson(Map<String, dynamic> json) => _$PgConfigFromJson(json);
}

@freezed
class PgFeatures with _$PgFeatures {
  const factory PgFeatures({
    @Default(true) bool complaints,
    @Default(true) bool cleaning,
    @Default(false) bool addressImport,
    @Default(false) bool whatsappReminders,
  }) = _PgFeatures;

  factory PgFeatures.fromJson(Map<String, dynamic> json) => _$PgFeaturesFromJson(json);
}
