import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../core/network/api_client.dart';
import '../core/storage/cache_service.dart';
import '../models/cleaning.dart';
import '../models/complaint.dart';
import '../models/document.dart';
import '../models/payment.dart';
import '../models/room.dart';
import '../models/staff.dart';
import '../models/tenant.dart';
import '../services/documents_api.dart';
import '../services/owner_payments_api.dart';
import '../services/owner_rooms_api.dart';
import '../services/owner_staff_api.dart';
import '../services/owner_tenants_api.dart';
import '../services/tenant_api.dart';
import '../providers/cache_provider.dart';

final ownerRoomsApiProvider = Provider((ref) => OwnerRoomsApi(ref.watch(apiClientProvider)));
final ownerTenantsApiProvider = Provider((ref) => OwnerTenantsApi(ref.watch(apiClientProvider)));
final ownerPaymentsApiProvider = Provider((ref) => OwnerPaymentsApi(ref.watch(apiClientProvider)));
final ownerStaffApiProvider = Provider((ref) => OwnerStaffApi(ref.watch(apiClientProvider)));
final tenantApiProvider = Provider((ref) => TenantApi(ref.watch(apiClientProvider)));
final ownerOpsApiProvider = Provider((ref) => OwnerOpsApi(ref.watch(apiClientProvider)));
final documentsApiProvider = Provider((ref) => DocumentsApi(ref.watch(apiClientProvider)));

class RoomsRepository {
  RoomsRepository(this._api, this._cache);
  final OwnerRoomsApi _api;
  final CacheService _cache;

  static const _cacheKey = 'rooms';
  static const _revalidateInterval = Duration(seconds: 60);

  Future<List<Room>> list({bool useCache = true}) async {
    if (useCache) {
      final cached = _cache.getJsonList(_cacheKey, Room.fromJson);
      if (cached != null) {
        if (_cache.shouldRevalidate(_cacheKey, _revalidateInterval)) {
          _cache.markRevalidated(_cacheKey);
          _api.listRooms().then((fresh) {
            _cache.putJsonList(_cacheKey, fresh.map((r) => r.toJson()).toList());
          }).ignore();
        }
        return cached;
      }
    }
    final rooms = await _api.listRooms();
    _cache.markRevalidated(_cacheKey);
    await _cache.putJsonList(_cacheKey, rooms.map((r) => r.toJson()).toList());
    return rooms;
  }
}

class TenantsRepository {
  TenantsRepository(this._api, this._cache);
  final OwnerTenantsApi _api;
  final CacheService _cache;

  static const _cacheKey = 'tenants';
  static const _revalidateInterval = Duration(seconds: 60);

  Future<List<Tenant>> list({bool useCache = true}) async {
    if (useCache) {
      final cached = _cache.getJsonList(_cacheKey, Tenant.fromJson);
      if (cached != null) {
        if (_cache.shouldRevalidate(_cacheKey, _revalidateInterval)) {
          _cache.markRevalidated(_cacheKey);
          _api.listTenants().then((fresh) {
            _cache.putJsonList(_cacheKey, fresh.map((t) => t.toJson()).toList());
          }).ignore();
        }
        return cached;
      }
    }
    final tenants = await _api.listTenants();
    _cache.markRevalidated(_cacheKey);
    await _cache.putJsonList(_cacheKey, tenants.map((t) => t.toJson()).toList());
    return tenants;
  }
}

class PaymentsRepository {
  PaymentsRepository(this._api, this._cache);
  final OwnerPaymentsApi _api;
  final CacheService _cache;

  static const _cacheKey = 'payment_summary';
  static const _revalidateInterval = Duration(seconds: 60);

  Future<PaymentSummary> summary({bool useCache = true}) async {
    if (useCache) {
      final cached = _cache.getJson(
        _cacheKey,
        (j) => PaymentSummary.fromJson(j as Map<String, dynamic>),
      );
      if (cached != null) {
        if (_cache.shouldRevalidate(_cacheKey, _revalidateInterval)) {
          _cache.markRevalidated(_cacheKey);
          _api.summary().then((f) => _cache.putJson(_cacheKey, f.toJson())).ignore();
        }
        return cached;
      }
    }
    final summary = await _api.summary();
    _cache.markRevalidated(_cacheKey);
    await _cache.putJson(_cacheKey, summary.toJson());
    return summary;
  }
}

final roomsRepositoryProvider = Provider((ref) => RoomsRepository(
      ref.watch(ownerRoomsApiProvider),
      ref.watch(cacheServiceProvider),
    ));

final tenantsRepositoryProvider = Provider((ref) => TenantsRepository(
      ref.watch(ownerTenantsApiProvider),
      ref.watch(cacheServiceProvider),
    ));

final paymentsRepositoryProvider = Provider((ref) => PaymentsRepository(
      ref.watch(ownerPaymentsApiProvider),
      ref.watch(cacheServiceProvider),
    ));
