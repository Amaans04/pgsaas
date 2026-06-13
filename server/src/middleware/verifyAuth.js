import { verifyAccessToken } from '../lib/jwt';

export async function verifyAuth(req) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    const err = new Error('Missing or invalid Authorization header');
    err.statusCode = 401;
    throw err;
  }

  const token = authHeader.split('Bearer ')[1];

  try {
    const decoded = verifyAccessToken(token);
    return {
      uid: decoded.sub,
      email: decoded.email,
      name: decoded.name,
    };
  } catch {
    const err = new Error('Invalid or expired token');
    err.statusCode = 401;
    throw err;
  }
}
