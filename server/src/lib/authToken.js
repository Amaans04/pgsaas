/**
 * Extract Bearer token from Authorization header (case-insensitive).
 */
export function extractBearerToken(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader || typeof authHeader !== 'string') {
    return null;
  }

  const match = authHeader.match(/^Bearer\s+(.+)$/i);
  if (!match) {
    return null;
  }

  const token = match[1].trim();
  return token.length > 0 ? token : null;
}

export function missingAuthError() {
  const err = new Error('Missing or invalid Authorization header');
  err.statusCode = 401;
  return err;
}
