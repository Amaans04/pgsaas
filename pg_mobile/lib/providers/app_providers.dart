import 'dart:async';

import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../models/cleaning.dart';
import '../models/payment.dart';
import '../models/room.dart';
import '../models/tenant.dart';
import '../models/user_profile.dart';
import '../repositories/auth_repository.dart';
import '../repositories/data_repositories.dart';

/// Latest Firebase auth user — profile reloads when this changes.
final authUserProvider = StreamProvider<User?>((ref) {
  return ref.watch(authRepositoryProvider).authStateChanges();
});

/// Profile from GET /api/auth/me — sole source of truth for role routing.
class ProfileNotifier extends AsyncNotifier<UserProfile?> {
  @override
  Future<UserProfile?> build() async {
    final authUser = await ref.watch(authUserProvider.future);
    if (authUser == null) return null;
    return ref.read(authRepositoryProvider).fetchProfile();
  }

  void setProfile(UserProfile? profile) {
    state = AsyncData(profile);
  }

  Future<void> refresh({bool force = true}) async {
    state = const AsyncLoading();
    state = await AsyncValue.guard(
      () => ref.read(authRepositoryProvider).fetchProfile(forceRefresh: force),
    );
  }
}

final profileProvider = AsyncNotifierProvider<ProfileNotifier, UserProfile?>(
  ProfileNotifier.new,
);

final pgIdProvider = StateProvider<String>((ref) {
  return const String.fromEnvironment('DEFAULT_PG_ID', defaultValue: 'sample-pg');
});

class CleaningPollNotifier extends AsyncNotifier<CleaningListResponse> {
  Timer? _timer;

  @override
  Future<CleaningListResponse> build() async {
    final profile = ref.watch(profileProvider).valueOrNull;
    final enabled = profile != null &&
        (profile.role == 'staff' || (profile.role == 'owner' && profile.isAdmin));

    _timer?.cancel();
    if (enabled) {
      _timer = Timer.periodic(const Duration(seconds: 30), (_) => refresh());
      ref.onDispose(() => _timer?.cancel());
      return ref.read(ownerOpsApiProvider).cleaningList();
    }
    return const CleaningListResponse();
  }

  Future<void> refresh() async {
    state = await AsyncValue.guard(
      () => ref.read(ownerOpsApiProvider).cleaningList(),
    );
  }

  Future<void> markDone(String requestId) async {
    await ref.read(ownerOpsApiProvider).resolveCleaning(requestId);
    await refresh();
  }
}

final cleaningProvider =
    AsyncNotifierProvider<CleaningPollNotifier, CleaningListResponse>(
  CleaningPollNotifier.new,
);

final roomsListProvider = FutureProvider.autoDispose<List<Room>>((ref) async {
  return ref.watch(roomsRepositoryProvider).list();
});

final tenantsListProvider = FutureProvider.autoDispose<List<Tenant>>((ref) async {
  return ref.watch(tenantsRepositoryProvider).list();
});

final paymentSummaryProvider = FutureProvider.autoDispose<PaymentSummary>((ref) async {
  return ref.watch(paymentsRepositoryProvider).summary();
});

final ownerComplaintsProvider = FutureProvider.autoDispose((ref) async {
  return ref.watch(ownerOpsApiProvider).complaints();
});

final tenantRentProvider = FutureProvider.autoDispose((ref) async {
  return ref.watch(tenantApiProvider).rentHistory();
});

final tenantCustomPaymentsProvider = FutureProvider.autoDispose((ref) async {
  return ref.watch(tenantApiProvider).customPayments();
});

final tenantComplaintsProvider = FutureProvider.autoDispose((ref) async {
  return ref.watch(tenantApiProvider).complaints();
});

final documentsProvider = FutureProvider.autoDispose((ref) async {
  return ref.watch(documentsApiProvider).listMine();
});

final ownerDocumentsProvider = FutureProvider.autoDispose((ref) async {
  return ref.watch(ownerOpsApiProvider).ownerDocuments();
});

final staffListProvider = FutureProvider.autoDispose((ref) async {
  return ref.watch(ownerStaffApiProvider).listStaff();
});

final ownerCustomPaymentsProvider = FutureProvider.autoDispose((ref) async {
  return ref.watch(ownerPaymentsApiProvider).listCustom();
});
