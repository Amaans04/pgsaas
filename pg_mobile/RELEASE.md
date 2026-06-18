# Dwello — Production Release Builds (Flutter)

> **Note:** Dwello is a **Flutter** app, not Expo/React Native. EAS (`eas.json`) does not apply.
> Use the commands below for Play Store and App Store submission.

## Prerequisites

### Android (Play Store)
1. Create an upload keystore:
   ```bash
   keytool -genkey -v -keystore upload-keystore.jks -keyalg RSA -keysize 2048 -validity 10000 -alias upload
   ```
2. Copy `android/key.properties.example` → `android/key.properties` and fill in paths/passwords.
3. Place `upload-keystore.jks` in `android/` (gitignored).

### iOS (App Store)
1. Apple Developer account with App ID `pg.prototype` (or your bundle ID).
2. Configure signing in Xcode: `ios/Runner.xcworkspace` → Signing & Capabilities.
3. Push notifications: enable capability + `Runner.entitlements` with `aps-environment`.

### Firebase
- `android/app/google-services.json` and `ios/Runner/GoogleService-Info.plist` must match your Firebase project.
- Deploy Firestore rules: `firebase deploy --only firestore:rules` (from `pgplatform/`).

---

## Version numbers

Set in `pubspec.yaml`:
```yaml
version: 1.0.0+1   # versionName + versionCode (Android) / CFBundleShortVersionString + build (iOS)
```

---

## Production build commands

### Android App Bundle (.aab) — Play Store
```bash
cd pgplatform/pg_mobile

flutter build appbundle --release \
  --dart-define=API_BASE_URL=https://pgsaas.vercel.app \
  --dart-define=DEFAULT_PG_ID=sample-pg \
  --obfuscate --split-debug-info=build/debug-info
```

Output: `build/app/outputs/bundle/release/app-release.aab`

### iOS — App Store
```bash
cd pgplatform/pg_mobile

flutter build ipa --release \
  --dart-define=API_BASE_URL=https://pgsaas.vercel.app \
  --dart-define=DEFAULT_PG_ID=sample-pg \
  --obfuscate --split-debug-info=build/debug-info
```

Upload via Xcode Organizer or Transporter.

### Local dev (device on same Wi‑Fi)
```bash
flutter run \
  --dart-define=API_BASE_URL=http://YOUR_LAN_IP:3001 \
  --dart-define=DEFAULT_PG_ID=sample-pg
```

---

## Dry-check configuration

| Field | Location | Current value |
|-------|----------|---------------|
| App name | `pubspec.yaml` / manifests | Dwello |
| Android package | `android/app/build.gradle.kts` | `PG.prototype` |
| iOS bundle ID | Xcode / `Info.plist` | `pg.prototype` |
| versionName / version | `pubspec.yaml` | `1.0.0+1` |
| Release API URL | `--dart-define=API_BASE_URL` | `https://pgsaas.vercel.app` |
| Release signing (Android) | `android/key.properties` | ⚠️ Required — see above |
| R8 minify | `android/app/build.gradle.kts` | Enabled |
| allowBackup | `AndroidManifest.xml` | `false` |

---

## CI alternatives to EAS

- **Codemagic** — Flutter-native CI with keystore & App Store Connect integration
- **GitHub Actions** + `flutter build appbundle` / `flutter build ipa`
- **Fastlane** — `fastlane supply` (Android) / `fastlane deliver` (iOS)

---

## ⚠️ MANUAL ACTION REQUIRED

1. Create and configure Android release keystore (`key.properties`).
2. Set up Apple Developer signing in Xcode.
3. Deploy `firestore.rules` to Firebase.
4. Enable Firebase App Check + restrict API keys in Google Cloud Console.
5. Rename bundle ID / package name from `PG.prototype` before public launch if desired.
