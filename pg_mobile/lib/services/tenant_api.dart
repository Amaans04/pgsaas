import '../../core/network/api_client.dart';
import '../../models/cleaning.dart';
import '../../models/complaint.dart';
import '../../models/document.dart';
import '../../models/json_helpers.dart';
import '../../models/payment.dart';

class TenantApi {
  TenantApi(this._client);
  final ApiClient _client;

  Future<List<RentRecord>> rentHistory() => _client.getData(
        '/api/tenant/rent/history',
        parser: (json) => parseList(json, RentRecord.fromJson),
      );

  Future<List<CustomPayment>> customPayments() => _client.getData(
        '/api/tenant/payments/custom',
        parser: (json) => parseList(json, CustomPayment.fromJson),
      );

  Future<List<Complaint>> complaints() => _client.getData(
        '/api/tenant/complaints',
        parser: (json) => parseList(json, Complaint.fromJson),
      );

  Future<Complaint> createComplaint({
    required String type,
    required String description,
  }) =>
      _client.postData(
        '/api/tenant/complaints/create',
        body: {'type': type, 'description': description},
        parser: (json) => Complaint.fromJson(asMap(json)),
      );

  Future<CleaningRequest> requestCleaning() => _client.postData(
        '/api/tenant/cleaning/request',
        body: {},
        parser: (json) => CleaningRequest.fromJson(asMap(json)),
      );

  Future<void> giveNotice(String moveOutDate) => _client.postData<void>(
        '/api/tenant/notice',
        body: {'moveOutDate': moveOutDate},
        parser: (_) {},
      );

  Future<CreateOrderResponse> createOrder({
    required int month,
    required int year,
  }) =>
      _client.postData(
        '/api/payments/create-order',
        body: {'month': month, 'year': year},
        parser: (json) => CreateOrderResponse.fromJson(asMap(json)),
      );

  Future<VerifyPaymentResponse> verifyPayment({
    required String razorpayOrderId,
    required String razorpayPaymentId,
    required String razorpaySignature,
    required int month,
    required int year,
  }) =>
      _client.postData(
        '/api/payments/verify-payment',
        body: {
          'razorpay_order_id': razorpayOrderId,
          'razorpay_payment_id': razorpayPaymentId,
          'razorpay_signature': razorpaySignature,
          'month': month,
          'year': year,
        },
        parser: (json) => VerifyPaymentResponse.fromJson(asMap(json)),
      );

  Future<VerifyPaymentResponse> devPay({
    required int month,
    required int year,
  }) =>
      _client.postData(
        '/api/payments/dev-pay',
        body: {'month': month, 'year': year},
        parser: (json) => VerifyPaymentResponse.fromJson(asMap(json)),
      );

  Future<List<int>> downloadReceipt(String recordId, {String type = 'rent'}) =>
      _client.getBytes(
        '/api/tenant/receipt/$recordId',
        queryParameters: {'type': type},
      );
}

class OwnerOpsApi {
  OwnerOpsApi(this._client);
  final ApiClient _client;

  Future<List<Complaint>> complaints() => _client.getData(
        '/api/owner/complaints',
        parser: (json) => parseList(json, Complaint.fromJson),
      );

  Future<void> resolveComplaint({
    required String complaintId,
    required String status,
  }) =>
      _client.postData<void>(
        '/api/owner/complaints/resolve',
        body: {'complaintId': complaintId, 'status': status},
        parser: (_) {},
      );

  Future<CleaningListResponse> cleaningList() => _client.getData(
        '/api/owner/cleaning',
        parser: (json) => CleaningListResponse.fromJson(asMap(json)),
      );

  Future<void> resolveCleaning(String requestId) => _client.postData<void>(
        '/api/owner/cleaning/resolve',
        body: {'requestId': requestId},
        parser: (_) {},
      );

  Future<List<Document>> ownerDocuments() => _client.getData(
        '/api/owner/documents',
        parser: (json) => parseList(json, Document.fromJson),
      );
}
