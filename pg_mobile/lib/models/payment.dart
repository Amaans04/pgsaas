import 'package:freezed_annotation/freezed_annotation.dart';

part 'payment.freezed.dart';
part 'payment.g.dart';

@freezed
class RentRecord with _$RentRecord {
  const factory RentRecord({
    required String id,
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
  }) = _RentRecord;

  factory RentRecord.fromJson(Map<String, dynamic> json) =>
      _$RentRecordFromJson(json);
}

@freezed
class CustomPayment with _$CustomPayment {
  const factory CustomPayment({
    required String id,
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
  }) = _CustomPayment;

  factory CustomPayment.fromJson(Map<String, dynamic> json) =>
      _$CustomPaymentFromJson(json);
}

@freezed
class TenantPaymentBreakdown with _$TenantPaymentBreakdown {
  const factory TenantPaymentBreakdown({
    String? recordId,
    required String tenantId,
    required String name,
    String? roomNumber,
    @Default(0) num amount,
    String? dueDate,
    String? status,
    String? paymentMethod,
    String? paidAt,
  }) = _TenantPaymentBreakdown;

  factory TenantPaymentBreakdown.fromJson(Map<String, dynamic> json) =>
      _$TenantPaymentBreakdownFromJson(json);
}

@freezed
class PaymentSummary with _$PaymentSummary {
  const factory PaymentSummary({
    int? month,
    int? year,
    int? rentDueDay,
    @Default(0) num totalDue,
    @Default(0) num totalPaid,
    @Default(0) num totalPending,
    @Default([]) List<TenantPaymentBreakdown> tenantBreakdown,
  }) = _PaymentSummary;

  factory PaymentSummary.fromJson(Map<String, dynamic> json) =>
      _$PaymentSummaryFromJson(json);
}

@freezed
class CreateOrderResponse with _$CreateOrderResponse {
  const factory CreateOrderResponse({
    String? orderId,
    num? amount,
    String? currency,
    String? keyId,
    @Default(false) bool devMode,
    int? month,
    int? year,
  }) = _CreateOrderResponse;

  factory CreateOrderResponse.fromJson(Map<String, dynamic> json) =>
      _$CreateOrderResponseFromJson(json);
}

@freezed
class VerifyPaymentResponse with _$VerifyPaymentResponse {
  const factory VerifyPaymentResponse({
    String? status,
    String? paymentId,
    String? paidAt,
    int? month,
    int? year,
  }) = _VerifyPaymentResponse;

  factory VerifyPaymentResponse.fromJson(Map<String, dynamic> json) =>
      _$VerifyPaymentResponseFromJson(json);
}
