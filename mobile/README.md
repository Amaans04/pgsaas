# PGApp Mobile

React Native Expo app for the PG Management Platform. Shares the same Firebase project and API server as the web client.

## Quick start

```bash
cd mobile
cp .env.example .env   # fill in Firebase + server URLs
npm install
npx expo start
```

Scan the QR code with **Expo Go** (limited — see below) or a **development build** for full native features.

## Test on device

1. Install [Expo Go](https://expo.dev/go) on your phone.
2. Run `npx expo start` and scan the QR code (same Wi‑Fi as your machine).
3. For Google Sign-In, Firebase Auth, and push notifications, use an EAS development build instead of Expo Go.

## Production builds

```bash
npm install -g eas-cli
eas login
eas build --platform ios
eas build --platform android
```

Configure `eas.json` and signing credentials in the [Expo dashboard](https://expo.dev).

## Environment variables

Copy `.env.example` to `.env`. All public vars use the `EXPO_PUBLIC_` prefix:

| Variable | Description |
|----------|-------------|
| `EXPO_PUBLIC_FIREBASE_API_KEY` | Firebase web API key |
| `EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase auth domain |
| `EXPO_PUBLIC_FIREBASE_PROJECT_ID` | Firebase project ID |
| `EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket |
| `EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | FCM sender ID |
| `EXPO_PUBLIC_FIREBASE_APP_ID` | Firebase app ID |
| `EXPO_PUBLIC_SERVER_URL` | Backend API base URL (e.g. `https://pgsaas.vercel.app`) |
| `EXPO_PUBLIC_IMAGEKIT_PUBLIC_KEY` | ImageKit public key (optional fallback) |
| `EXPO_PUBLIC_IMAGEKIT_URL_ENDPOINT` | ImageKit URL endpoint |
| `EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID` | Google OAuth web client ID (for native Google Sign-In) |

`.env` is gitignored — never commit secrets.

## Architecture

- **Auth**: Firebase Auth (JS SDK) + Google Sign-In native module
- **API**: Axios client attaches Firebase ID token to every request (`src/lib/api.js`)
- **Navigation**: React Navigation — role-based bottom tabs (Owner / Tenant / Staff)
- **UI**: React Native Paper with brand theme (`#4F46E5` primary)

## Notes

- Razorpay online payments are **Coming Soon** on mobile; owners can still mark cash payments.
- Push tokens are registered on launch via `POST /api/auth/update-push-token`.
- Staff accounts created with email/password on web should link Google on Firebase to sign in on mobile, or use the web app for staff login.
