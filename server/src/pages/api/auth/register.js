import { handleCors } from '../../../lib/cors';
import { success, error } from '../../../lib/apiResponse';
import { rateLimit } from '../../../middleware/rateLimit';
import { getAuth, getFirestore } from '../../../lib/firebaseAdmin';
import {
  normalizeEmail,
  validateEmail,
  validatePassword,
  validatePhone,
  validateName,
} from '../../../lib/passwordPolicy';

function getProviderIds(userRecord) {
  return userRecord.providerData.map((provider) => provider.providerId);
}

function existingAccountMessage(userRecord) {
  const providers = getProviderIds(userRecord);
  const hasGoogle = providers.includes('google.com');
  const hasPassword = providers.includes('password');

  if (hasGoogle && !hasPassword) {
    return 'This email is already linked to Google. Use "Continue with Google" on the Sign In tab.';
  }
  if (hasGoogle && hasPassword) {
    return 'An account with this email already exists. Sign in with Google or your password.';
  }
  return 'An account with this email already exists. Sign in with your email and password.';
}

async function createTenantProfile(db, uid, { name, email, phone, authProvider }) {
  const now = new Date().toISOString();
  await db.collection('users').doc(uid).set({
    role: 'tenant',
    name: String(name).trim(),
    email,
    phone: String(phone).trim(),
    photoURL: null,
    pgId: null,
    authProvider,
    createdAt: now,
  });
}

export default async function handler(req, res) {
  try {
    if (handleCors(req, res)) return;

    if (req.method !== 'POST') {
      return error(res, 'Method not allowed', 405);
    }

    rateLimit(req, { maxRequests: 5, keyPrefix: 'register' });

    const { name, email, password, phone } = req.body;

    const nameError = validateName(name);
    if (nameError) return error(res, nameError, 400);

    const emailError = validateEmail(email);
    if (emailError) return error(res, emailError, 400);

    const passwordError = validatePassword(password);
    if (passwordError) return error(res, passwordError, 400);

    const phoneError = validatePhone(phone);
    if (phoneError) return error(res, phoneError, 400);

    const normalizedEmail = normalizeEmail(email);
    const trimmedName = String(name).trim();
    const trimmedPhone = String(phone).trim();
    const auth = getAuth();
    const db = getFirestore();

    let existingUser = null;
    try {
      existingUser = await auth.getUserByEmail(normalizedEmail);
    } catch (lookupErr) {
      if (lookupErr.code !== 'auth/user-not-found') {
        console.error('register email lookup error:', lookupErr);
        return error(res, 'Registration failed. Please try again.', 500);
      }
    }

    if (existingUser) {
      const userDoc = await db.collection('users').doc(existingUser.uid).get();

      if (userDoc.exists) {
        return error(res, existingAccountMessage(existingUser), 400);
      }

      const providers = getProviderIds(existingUser);
      const hadGoogle = providers.includes('google.com');

      await auth.updateUser(existingUser.uid, {
        password,
        displayName: trimmedName,
      });

      await createTenantProfile(db, existingUser.uid, {
        name: trimmedName,
        email: normalizedEmail,
        phone: trimmedPhone,
        authProvider: hadGoogle ? 'google+password' : 'password',
      });

      return success(
        res,
        {
          uid: existingUser.uid,
          email: normalizedEmail,
          requiresEmailVerification: !existingUser.emailVerified,
        },
        201
      );
    }

    const userRecord = await auth.createUser({
      email: normalizedEmail,
      password,
      displayName: trimmedName,
      emailVerified: false,
    });

    await createTenantProfile(db, userRecord.uid, {
      name: trimmedName,
      email: normalizedEmail,
      phone: trimmedPhone,
      authProvider: 'password',
    });

    return success(
      res,
      {
        uid: userRecord.uid,
        email: normalizedEmail,
        requiresEmailVerification: true,
      },
      201
    );
  } catch (err) {
    console.error('register error:', err);
    if (err.code === 'auth/email-already-exists') {
      return error(res, 'An account with this email already exists. Sign in instead.', 400);
    }
    if (err.code === 'auth/weak-password') {
      return error(res, 'Password is too weak. Use at least 8 characters with letters and numbers.', 400);
    }
    return error(res, err.message || 'Registration failed', err.statusCode || 500);
  }
}
