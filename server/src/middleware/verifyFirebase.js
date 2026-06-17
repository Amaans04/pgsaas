import { getAuth } from '../lib/firebaseAdmin';
import { extractBearerToken, missingAuthError } from '../lib/authToken';

const tokenCache = new Map();
const TOKEN_CACHE_BUFFER_MS = 60 * 1000;
const TOKEN_CACHE_MAX_MS = 5 * 60 * 1000;
const CACHE_CLEANUP_INTERVAL_MS = 5 * 60 * 1000;

function tokenCacheKey(token) {
  return `${token.length}:${token.slice(-24)}`;
}

function pruneTokenCache(now) {
  for (const [key, entry] of tokenCache.entries()) {
    if (entry.expiresAt <= now) {
      tokenCache.delete(key);
    }
  }
}

if (typeof setInterval !== 'undefined') {
  setInterval(() => pruneTokenCache(Date.now()), CACHE_CLEANUP_INTERVAL_MS);
}

async function verifyIdTokenCached(token) {
  const key = tokenCacheKey(token);
  const now = Date.now();
  const cached = tokenCache.get(key);

  if (cached && cached.expiresAt > now) {
    return cached.decoded;
  }

  const decoded = await getAuth().verifyIdToken(token);
  const expMs = (decoded.exp || 0) * 1000;
  const ttl = Math.min(TOKEN_CACHE_MAX_MS, Math.max(0, expMs - now - TOKEN_CACHE_BUFFER_MS));

  if (ttl > 0) {
    tokenCache.set(key, { decoded, expiresAt: now + ttl });
  }

  return decoded;
}

export async function verifyFirebaseToken(token) {
  const normalized = typeof token === 'string' ? token.trim() : '';
  if (!normalized) {
    throw missingAuthError();
  }

  try {
    const decoded = await verifyIdTokenCached(normalized);

    return {
      uid: decoded.uid,
      email: decoded.email,
      name: decoded.name || null,
    };
  } catch (err) {
    console.error('Firebase token verification failed:', {
      code: err.code,
      message: err.message,
      projectId: process.env.FIREBASE_PROJECT_ID || '(unset)',
    });

    const authErr = new Error('Invalid or expired Firebase token');
    authErr.statusCode = 401;
    throw authErr;
  }
}

export async function verifyFirebase(req) {
  const token = extractBearerToken(req);
  if (!token) {
    throw missingAuthError();
  }
  return verifyFirebaseToken(token);
}
