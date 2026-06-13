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
  const attrs = ['HttpOnly', 'Path=/', 'SameSite=Lax'];
  if (process.env.NODE_ENV === 'production') {
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
