const REFRESH_COOKIE_NAME = 'pg_refresh_token';

function parseCookies(req) {
  const header = req.headers?.cookie;
  if (!header) return {};

  return header.split(';').reduce((acc, part) => {
    const [rawKey, ...rest] = part.trim().split('=');
    if (!rawKey) return acc;
    acc[rawKey] = decodeURIComponent(rest.join('='));
    return acc;
  }, {});
}

function baseAttributes() {
  const isProduction = process.env.NODE_ENV === 'production';
  const attrs = ['HttpOnly', 'Path=/'];
  // Cross-origin client + API on Vercel need SameSite=None (e.g. app.vercel.app → api.vercel.app)
  attrs.push(isProduction ? 'SameSite=None' : 'SameSite=Lax');
  if (isProduction) {
    attrs.push('Secure');
  }
  return attrs;
}

export function setRefreshCookie(res, token, maxAgeSeconds) {
  const cookie = [`${REFRESH_COOKIE_NAME}=${token}`, ...baseAttributes(), `Max-Age=${maxAgeSeconds}`].join('; ');
  res.setHeader('Set-Cookie', cookie);
}

export function clearRefreshCookie(res) {
  const cookie = [`${REFRESH_COOKIE_NAME}=`, ...baseAttributes(), 'Max-Age=0'].join('; ');
  res.setHeader('Set-Cookie', cookie);
}

export function getRefreshCookie(req) {
  return parseCookies(req)[REFRESH_COOKIE_NAME] || null;
}
