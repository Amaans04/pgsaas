import '../../core/network/api_client.dart';
import '../../models/json_helpers.dart';
import '../../models/payment.dart';

class OwnerPaymentsApi {
  OwnerPaymentsApi(this._client);
  final ApiClient _client;

  Future<PaymentSummary> summary() => _client.getData(
        '/api/owner/payments/summary',
        parser: (json) => PaymentSummary.fromJson(asMap(json)),
      );

  Future<RentRecord> updateRent({
    required String tenantId,
    required int month,
    required int year,
    required num amount,
    String? dueDate,
    required String status,
    String? paymentMethod,
  }) =>
      _client.putData(
        '/api/owner/payments/rent',
        body: {
          'tenantId': tenantId,
          'month': month,
          'year': year,
          'amount': amount,
          'dueDate': ?dueDate,
          'status': status,
          'paymentMethod': ?paymentMethod,
        },
        parser: (json) => RentRecord.fromJson(asMap(json)),
      );

  Future<List<CustomPayment>> listCustom() => _client.getData(
        '/api/owner/payments/custom',
        parser: (json) => parseList(json, CustomPayment.fromJson),
      );

  Future<CustomPayment> createCustom({
    required String tenantId,
    required String title,
    required num amount,
    String? dueDate,
  }) =>
      _client.postData(
        '/api/owner/payments/custom/create',
        body: {
          'tenantId': tenantId,
          'title': title,
          'amount': amount,
          'dueDate': ?dueDate,
        },
        parser: (json) => CustomPayment.fromJson(asMap(json)),
      );

  Future<void> markCustomPaid(String paymentId) => _client.postData<void>(
        '/api/owner/payments/custom/mark-paid',
        body: {'paymentId': paymentId},
        parser: (_) {},
      );
}
