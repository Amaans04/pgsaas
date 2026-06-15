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

    return {
      uid: decoded.uid,
      email: decoded.email,
      name: decoded.name || userRecord.displayName,
    };
  } catch (err) {
    const authErr = new Error('Invalid or expired Firebase token');
    authErr.statusCode = 401;
    throw authErr;
  }
}
