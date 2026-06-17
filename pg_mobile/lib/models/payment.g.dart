// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'payment.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$RentRecordImpl _$$RentRecordImplFromJson(Map<String, dynamic> json) =>
    _$RentRecordImpl(
      id: json['id'] as String,
      tenantId: json['tenantId'] as String?,
      pgId: json['pgId'] as String?,
      roomId: json['roomId'] as String?,
      month: (json['month'] as num?)?.toInt(),
      year: (json['year'] as num?)?.toInt(),
      amount: json['amount'] as num?,
      dueDate: json['dueDate'] as String?,
      status: json['status'] as String?,
      paymentMethod: json['paymentMethod'] as String?,
      paymentId: json['paymentId'] as String?,
      paidAt: json['paidAt'] as String?,
    );

Map<String, dynamic> _$$RentRecordImplToJson(_$RentRecordImpl instance) =>
    <String, dynamic>{
      'id': instance.id,
      if (instance.tenantId case final value?) 'tenantId': value,
      if (instance.pgId case final value?) 'pgId': value,
      if (instance.roomId case final value?) 'roomId': value,
      if (instance.month case final value?) 'month': value,
      if (instance.year case final value?) 'year': value,
      if (instance.amount case final value?) 'amount': value,
      if (instance.dueDate case final value?) 'dueDate': value,
      if (instance.status case final value?) 'status': value,
      if (instance.paymentMethod case final value?) 'paymentMethod': value,
      if (instance.paymentId case final value?) 'paymentId': value,
      if (instance.paidAt case final value?) 'paidAt': value,
    };

_$CustomPaymentImpl _$$CustomPaymentImplFromJson(Map<String, dynamic> json) =>
    _$CustomPaymentImpl(
      id: json['id'] as String,
      tenantId: json['tenantId'] as String?,
      pgId: json['pgId'] as String?,
      title: json['title'] as String?,
      amount: json['amount'] as num?,
      status: json['status'] as String?,
      paymentMethod: json['paymentMethod'] as String?,
      dueDate: json['dueDate'] as String?,
      createdAt: json['createdAt'] as String?,
      paidAt: json['paidAt'] as String?,
      tenantName: json['tenantName'] as String?,
    );

Map<String, dynamic> _$$CustomPaymentImplToJson(_$CustomPaymentImpl instance) =>
    <String, dynamic>{
      'id': instance.id,
      if (instance.tenantId case final value?) 'tenantId': value,
      if (instance.pgId case final value?) 'pgId': value,
      if (instance.title case final value?) 'title': value,
      if (instance.amount case final value?) 'amount': value,
      if (instance.status case final value?) 'status': value,
      if (instance.paymentMethod case final value?) 'paymentMethod': value,
      if (instance.dueDate case final value?) 'dueDate': value,
      if (instance.createdAt case final value?) 'createdAt': value,
      if (instance.paidAt case final value?) 'paidAt': value,
      if (instance.tenantName case final value?) 'tenantName': value,
    };

_$TenantPaymentBreakdownImpl _$$TenantPaymentBreakdownImplFromJson(
  Map<String, dynamic> json,
) => _$TenantPaymentBreakdownImpl(
  recordId: json['recordId'] as String?,
  tenantId: json['tenantId'] as String,
  name: json['name'] as String,
  roomNumber: json['roomNumber'] as String?,
  amount: json['amount'] as num? ?? 0,
  dueDate: json['dueDate'] as String?,
  status: json['status'] as String?,
  paymentMethod: json['paymentMethod'] as String?,
  paidAt: json['paidAt'] as String?,
);

Map<String, dynamic> _$$TenantPaymentBreakdownImplToJson(
  _$TenantPaymentBreakdownImpl instance,
) => <String, dynamic>{
  if (instance.recordId case final value?) 'recordId': value,
  'tenantId': instance.tenantId,
  'name': instance.name,
  if (instance.roomNumber case final value?) 'roomNumber': value,
  'amount': instance.amount,
  if (instance.dueDate case final value?) 'dueDate': value,
  if (instance.status case final value?) 'status': value,
  if (instance.paymentMethod case final value?) 'paymentMethod': value,
  if (instance.paidAt case final value?) 'paidAt': value,
};

_$PaymentSummaryImpl _$$PaymentSummaryImplFromJson(Map<String, dynamic> json) =>
    _$PaymentSummaryImpl(
      month: (json['month'] as num?)?.toInt(),
      year: (json['year'] as num?)?.toInt(),
      rentDueDay: (json['rentDueDay'] as num?)?.toInt(),
      totalDue: json['totalDue'] as num? ?? 0,
      totalPaid: json['totalPaid'] as num? ?? 0,
      totalPending: json['totalPending'] as num? ?? 0,
      tenantBreakdown:
          (json['tenantBreakdown'] as List<dynamic>?)
              ?.map(
                (e) =>
                    TenantPaymentBreakdown.fromJson(e as Map<String, dynamic>),
              )
              .toList() ??
          const [],
    );

Map<String, dynamic> _$$PaymentSummaryImplToJson(
  _$PaymentSummaryImpl instance,
) => <String, dynamic>{
  if (instance.month case final value?) 'month': value,
  if (instance.year case final value?) 'year': value,
  if (instance.rentDueDay case final value?) 'rentDueDay': value,
  'totalDue': instance.totalDue,
  'totalPaid': instance.totalPaid,
  'totalPending': instance.totalPending,
  'tenantBreakdown': instance.tenantBreakdown.map((e) => e.toJson()).toList(),
};

_$CreateOrderResponseImpl _$$CreateOrderResponseImplFromJson(
  Map<String, dynamic> json,
) => _$CreateOrderResponseImpl(
  orderId: json['orderId'] as String?,
  amount: json['amount'] as num?,
  currency: json['currency'] as String?,
  keyId: json['keyId'] as String?,
  devMode: json['devMode'] as bool? ?? false,
  month: (json['month'] as num?)?.toInt(),
  year: (json['year'] as num?)?.toInt(),
);

Map<String, dynamic> _$$CreateOrderResponseImplToJson(
  _$CreateOrderResponseImpl instance,
) => <String, dynamic>{
  if (instance.orderId case final value?) 'orderId': value,
  if (instance.amount case final value?) 'amount': value,
  if (instance.currency case final value?) 'currency': value,
  if (instance.keyId case final value?) 'keyId': value,
  'devMode': instance.devMode,
  if (instance.month case final value?) 'month': value,
  if (instance.year case final value?) 'year': value,
};

_$VerifyPaymentResponseImpl _$$VerifyPaymentResponseImplFromJson(
  Map<String, dynamic> json,
) => _$VerifyPaymentResponseImpl(
  status: json['status'] as String?,
  paymentId: json['paymentId'] as String?,
  paidAt: json['paidAt'] as String?,
  month: (json['month'] as num?)?.toInt(),
  year: (json['year'] as num?)?.toInt(),
);

Map<String, dynamic> _$$VerifyPaymentResponseImplToJson(
  _$VerifyPaymentResponseImpl instance,
) => <String, dynamic>{
  if (instance.status case final value?) 'status': value,
  if (instance.paymentId case final value?) 'paymentId': value,
  if (instance.paidAt case final value?) 'paidAt': value,
  if (instance.month case final value?) 'month': value,
  if (instance.year case final value?) 'year': value,
};
