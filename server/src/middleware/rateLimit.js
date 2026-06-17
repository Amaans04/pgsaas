const rateLimitStore = new Map();

const DEFAULT_WINDOW_MS = 15 * 60 * 1000;
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000;

const isDev = process.env.NODE_ENV === 'development';

function devScale(value) {
  return isDev ? value * 10 : value;
}

/**
 * Tiered limits — tuned for normal PG app usage including 30s cleaning polls.
 * Per-user read: ~200/15min (~13/min). Cleaning poll alone ≈ 30/15min at 30s interval.
 */
export const RATE_LIMITS = {
  global: {
    maxRequests: devScale(500),
    windowMs: DEFAULT_WINDOW_MS,
    keyPrefix: 'global',
  },
  read: {
    maxRequests: devScale(200),
    windowMs: DEFAULT_WINDOW_MS,
    keyPrefix: 'read',
  },
  write: {
    maxRequests: devScale(50),
    windowMs: DEFAULT_WINDOW_MS,
    keyPrefix: 'write',
  },
  auth: {
    maxRequests: devScale(30),
    windowMs: DEFAULT_WINDOW_MS,
    keyPrefix: 'auth',
  },
  sensitive: {
    maxRequests: devScale(15),
    windowMs: DEFAULT_WINDOW_MS,
    keyPrefix: 'sensitive',
  },
  register: {
    maxRequests: isDev ? 50 : 5,
    windowMs: DEFAULT_WINDOW_MS,
    keyPrefix: 'register',
  },
};

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return req.socket?.remoteAddress || 'unknown';
}

function buildKey(keyPrefix, keySuffix) {
  return keySuffix ? `${keyPrefix}:${keySuffix}` : keyPrefix;
}

function pruneExpiredEntries(now) {
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now - entry.windowStart > entry.windowMs) {
      rateLimitStore.delete(key);
    }
  }
}

if (typeof setInterval !== 'undefined') {
  setInterval(() => pruneExpiredEntries(Date.now()), CLEANUP_INTERVAL_MS);
}

/**
 * Sliding-window rate limiter. Throws a 429 error when exceeded.
 *
 * @param {import('http').IncomingMessage} req
 * @param {object} options
 * @param {number} [options.maxRequests]
 * @param {number} [options.windowMs]
 * @param {string} [options.keyPrefix]
 * @param {string} [options.keySuffix] - e.g. user uid for per-user limits
 */
export function rateLimit(req, options = {}) {
  const {
    maxRequests = 10,
    windowMs = DEFAULT_WINDOW_MS,
    keyPrefix = 'rate',
    keySuffix,
  } = options;

  const ip = getClientIp(req);
  const now = Date.now();
  const identity = keySuffix || ip;
  const key = buildKey(keyPrefix, identity);

  let entry = rateLimitStore.get(key);

  if (!entry || now - entry.windowStart > windowMs) {
    entry = { windowStart: now, count: 0, windowMs };
    rateLimitStore.set(key, entry);
  }

  entry.count += 1;

  if (entry.count > maxRequests) {
    const retryAfterSec = Math.ceil((entry.windowStart + windowMs - now) / 1000);
    const err = new Error('Too many requests. Please try again later.');
    err.statusCode = 429;
    err.retryAfter = Math.max(retryAfterSec, 1);
    throw err;
  }
}

export function guardGlobalRequest(req) {
  rateLimit(req, { ...RATE_LIMITS.global, keySuffix: getClientIp(req) });
}

export function guardUserRequest(req, uid, tier = 'read') {
  const preset = RATE_LIMITS[tier] || RATE_LIMITS.read;
  rateLimit(req, { ...preset, keySuffix: uid });
}

export function tierForMethod(method) {
  return method === 'GET' || method === 'HEAD' ? 'read' : 'write';
}
