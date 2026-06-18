#!/usr/bin/env bash
# Dwello production build helper (Flutter — not EAS/Expo)
set -euo pipefail
cd "$(dirname "$0")/.."

API_URL="${API_BASE_URL:-https://pgsaas.vercel.app}"
PG_ID="${DEFAULT_PG_ID:-sample-pg}"

echo "==> Dry-check"
echo "  API_BASE_URL=$API_URL"
echo "  DEFAULT_PG_ID=$PG_ID"
grep '^version:' pubspec.yaml

if [[ ! -f android/key.properties ]]; then
  echo "⚠️  WARNING: android/key.properties missing — release will use debug signing."
fi

PLATFORM="${1:-all}"

build_android() {
  flutter build appbundle --release \
    --dart-define=API_BASE_URL="$API_URL" \
    --dart-define=DEFAULT_PG_ID="$PG_ID" \
    --obfuscate --split-debug-info=build/debug-info
  echo "✅ Android AAB: build/app/outputs/bundle/release/app-release.aab"
}

build_ios() {
  flutter build ipa --release \
    --dart-define=API_BASE_URL="$API_URL" \
    --dart-define=DEFAULT_PG_ID="$PG_ID" \
    --obfuscate --split-debug-info=build/debug-info
  echo "✅ iOS IPA: build/ios/ipa/"
}

case "$PLATFORM" in
  android) build_android ;;
  ios) build_ios ;;
  all) build_android; build_ios ;;
  *) echo "Usage: $0 [android|ios|all]"; exit 1 ;;
esac
