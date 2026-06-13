import { getAuth } from '../lib/firebaseAdmin';

export async function verifyFirebase(req) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    const err = new Error('Missing or invalid Authorization header');
    err.statusCode = 401;
    throw err;
  }

  const token = authHeader.split('Bearer ')[1];

  try {
    const decoded = await getAuth().verifyIdToken(token);
    const userRecord = await getAuth().getUser(decoded.uid);

    const usesPassword = userRecord.providerData.some((p) => p.providerId === 'password');
    if (usesPassword && !userRecord.emailVerified) {
      const err = new Error('Please verify your email address before continuing.');
      err.statusCode = 403;
      err.code = 'EMAIL_NOT_VERIFIED';
      throw err;
    }

    return {
      uid: decoded.uid,
      email: decoded.email,
      name: decoded.name || userRecord.displayName,
    };
  } catch (err) {
    if (err.code === 'EMAIL_NOT_VERIFIED') throw err;
    const authErr = new Error('Invalid or expired Firebase token');
    authErr.statusCode = 401;
    throw authErr;
  }
}
