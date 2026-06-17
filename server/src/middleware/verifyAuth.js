import { verifyAccessToken } from '../lib/jwt';
import { extractBearerToken, missingAuthError } from '../lib/authToken';
import { verifyFirebaseToken } from './verifyFirebase';
import { guardUserRequest, tierForMethod } from './rateLimit';

function isFirebaseIdToken(token) {
  const parts = token.split('.');
  if (parts.length !== 3) return false;

  try {
    let headerJson;
    try {
      headerJson = Buffer.from(parts[0], 'base64url').toString('utf8');
    } catch {
      const padded = parts[0].replace(/-/g, '+').replace(/_/g, '/');
      headerJson = Buffer.from(padded, 'base64').toString('utf8');
    }
    const header = JSON.parse(headerJson);
    return header.alg === 'RS256';
  } catch {
    return false;
  }
}

export async function verifyAuth(req, options = {}) {
  const token = extractBearerToken(req);
  if (!token) {
    throw missingAuthError();
  }

  const tier = options.tier || tierForMethod(req.method);
  let decoded;

  if (isFirebaseIdToken(token)) {
    decoded = await verifyFirebaseToken(token);
  } else {
    try {
      const jwtDecoded = verifyAccessToken(token);
      decoded = {
        uid: jwtDecoded.sub,
        email: jwtDecoded.email,
        name: jwtDecoded.name,
      };
    } catch {
      decoded = await verifyFirebaseToken(token);
    }
  }

  guardUserRequest(req, decoded.uid, tier);
  return decoded;
}
