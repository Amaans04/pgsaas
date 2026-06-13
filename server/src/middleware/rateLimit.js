const rateLimitStore = new Map();

const WINDOW_MS = 15 * 60 * 1000;

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return req.socket?.remoteAddress || 'unknown';
}

export function rateLimit(req, { maxRequests = 10, keyPrefix = 'rate' } = {}) {
  const ip = getClientIp(req);
  const now = Date.now();
  const key = `${keyPrefix}:${ip}`;

  let entry = rateLimitStore.get(key);

  if (!entry || now - entry.windowStart > WINDOW_MS) {
    entry = { windowStart: now, count: 0 };
    rateLimitStore.set(key, entry);
  }

  entry.count += 1;

  if (entry.count > maxRequests) {
    const err = new Error('Too many requests. Please try again later.');
    err.statusCode = 429;
    throw err;
  }
}
