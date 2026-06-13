import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const ACCESS_EXPIRY = '15m';
const REFRESH_EXPIRY = '7d';
export const REFRESH_EXPIRY_SECONDS = 7 * 24 * 60 * 60;

function getSecret(type) {
  const key = type === 'refresh' ? 'JWT_REFRESH_SECRET' : 'JWT_SECRET';
  const secret = process.env[key];
  if (!secret) {
    throw new Error(`${key} is not configured`);
  }
  return secret;
}

function signRefreshToken({ uid, email, name }) {
  const jti = crypto.randomUUID();
  const refreshToken = jwt.sign(
    { sub: uid, email, name, type: 'refresh', jti },
    getSecret('refresh'),
    { expiresIn: REFRESH_EXPIRY, algorithm: 'HS256' }
  );
  return { refreshToken, jti };
}

export function createTokenPair({ uid, email, name }) {
  const accessToken = jwt.sign(
    { sub: uid, email, name, type: 'access' },
    getSecret('access'),
    { expiresIn: ACCESS_EXPIRY, algorithm: 'HS256' }
  );

  const { refreshToken, jti } = signRefreshToken({ uid, email, name });

  return {
    accessToken,
    refreshToken,
    jti,
    expiresIn: 900,
  };
}

export function createRefreshToken({ uid, email, name }) {
  return signRefreshToken({ uid, email, name });
}

export function verifyAccessToken(token) {
  const decoded = jwt.verify(token, getSecret('access'), { algorithms: ['HS256'] });
  if (decoded.type !== 'access') {
    throw new Error('Invalid token type');
  }
  return decoded;
}

export function verifyRefreshToken(token) {
  const decoded = jwt.verify(token, getSecret('refresh'), { algorithms: ['HS256'] });
  if (decoded.type !== 'refresh') {
    throw new Error('Invalid token type');
  }
  return decoded;
}

export function createAccessTokenFromRefresh(refreshDecoded) {
  return jwt.sign(
    {
      sub: refreshDecoded.sub,
      email: refreshDecoded.email,
      name: refreshDecoded.name,
      type: 'access',
    },
    getSecret('access'),
    { expiresIn: ACCESS_EXPIRY, algorithm: 'HS256' }
  );
}
