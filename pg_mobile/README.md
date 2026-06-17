# PG Mobile (Flutter)

Production Flutter client for the existing PG SaaS backend (`pgplatform/server`).

## Stack

- Flutter + Dart 3
- Riverpod, GoRouter, Dio
- Firebase Auth + Firebase Messaging
- Freezed models, Hive cache (stale-while-revalidate)
- Razorpay Flutter SDK, ImageKit direct upload

## Auth

Uses **Firebase ID tokens** on every API request (`Authorization: Bearer <token>`).
The backend `verifyAuth` middleware accepts Firebase tokens directly — no JWT cookie flow.

Role routing uses **`GET /api/auth/me`** only.

## Firebase

`google-services.json` and `GoogleService-Info.plist` are installed for project **pg-prototype**.

- Android package: `PG.prototype`
- iOS bundle ID: `pg.prototype`

Firebase initializes from `lib/firebase_options.dart` (no `--dart-define` required for Firebase keys).

## Run (development)

```bash
cd pgplatform/pg_mobile
flutter pub get

# Debug on simulator or phone — hits local server on your Mac (same Wi‑Fi)
flutter run --dart-define=DEFAULT_PG_ID=sample-pg

# Explicit local server URL (if your Mac IP changes)
flutter run \
  --dart-define=API_BASE_URL=http://10.1.73.104:3001 \
  --dart-define=DEFAULT_PG_ID=sample-pg

# Debug against production (only after deploying server fixes to Vercel)
flutter run \
  --dart-define=API_BASE_URL=https://pgsaas.vercel.app \
  --dart-define=DEFAULT_PG_ID=sample-pg
```

Start the local API first: `cd pgplatform/server && npm run dev` (listens on port 3001).

For a physical device, phone and Mac must be on the **same Wi‑Fi**. Debug builds default to `http://10.1.73.104:3001` (update `localDevApiBaseUrl` in `lib/core/constants/env.dart` if your IP changes).

## Project structure

```
lib/
├── core/          # network, storage, theme, widgets
├── models/        # Freezed API models
├── services/      # API service classes
├── repositories/  # Auth + cached data repos
├── providers/     # Riverpod providers
├── features/      # auth, owner, tenant, staff screens
└── router/        # GoRouter + guards
```

## Native setup

- **Android**: `google-services.json` is in `android/app/`. Google Sign-In uses the web OAuth client from Firebase.
- **iOS**: `GoogleService-Info.plist` is in `ios/Runner/`. URL scheme for Google Sign-In is configured in `Info.plist`.
- Add your debug **SHA-1** fingerprint in Firebase Console (Android → Project settings) for Google Sign-In on physical devices.

## PG branding

Static PG config is bundled at `assets/config/{pgId}.json` (mirrors web `client/src/config/pgs/`).

## API contract

This app consumes existing routes only — no backend changes. See the technical audit in project docs for the full API inventory.
