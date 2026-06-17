import { handleCors } from '../../../lib/cors';
import { success, error } from '../../../lib/apiResponse';
import { rateLimit, RATE_LIMITS } from '../../../middleware/rateLimit';
import { getAuth, getFirestore } from '../../../lib/firebaseAdmin';
import {
  normalizeEmail,
  validateEmail,
  validatePassword,
  validatePhone,
  validateName,
} from '../../../lib/passwordPolicy';
import {
  getOwnerEmailConflict,
  isPhoneTaken,
  normalizePhone,
} from '../../../lib/userValidation';

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

function buildTenantDoc({ name, email, phone, authProvider }) {
  const normalizedPhone = normalizePhone(phone);
  return {
    role: 'tenant',
    name: String(name).trim(),
    email,
    phone: normalizedPhone,
    photoURL: null,
    pgId: null,
    authProvider,
    createdAt: new Date().toISOString(),
  };
}

function toClientProfile(uid, doc) {
  const phone = normalizePhone(doc.phone);
  return {
    uid,
    ...doc,
    onboarded: phone.length >= 10,
    hasPhone: phone.length >= 10,
  };
}

async function createTenantProfile(db, uid, doc) {
  await db.collection('users').doc(uid).set(doc);
}

export default async function handler(req, res) {
  try {
    if (handleCors(req, res)) return;

    if (req.method !== 'POST') {
      return error(res, 'Method not allowed', 405);
    }

    rateLimit(req, RATE_LIMITS.register);

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
    const normalizedPhone = normalizePhone(phone);
    const auth = getAuth();
    const db = getFirestore();

    const ownerConflict = await getOwnerEmailConflict(db, normalizedEmail);
    if (ownerConflict) {
      return error(res, ownerConflict, 400);
    }

    if (await isPhoneTaken(db, normalizedPhone)) {
      return error(res, 'This phone number is already registered', 400);
    }

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
        emailVerified: true,
      });

      const doc = buildTenantDoc({
        name: trimmedName,
        email: normalizedEmail,
        phone: normalizedPhone,
        authProvider: hadGoogle ? 'google+password' : 'password',
      });
      await createTenantProfile(db, existingUser.uid, doc);

      return success(
        res,
        { uid: existingUser.uid, email: normalizedEmail, profile: toClientProfile(existingUser.uid, doc) },
        201
      );
    }

    const userRecord = await auth.createUser({
      email: normalizedEmail,
      password,
      displayName: trimmedName,
      emailVerified: true,
    });

    const doc = buildTenantDoc({
      name: trimmedName,
      email: normalizedEmail,
      phone: normalizedPhone,
      authProvider: 'password',
    });
    await createTenantProfile(db, userRecord.uid, doc);

    return success(
      res,
      { uid: userRecord.uid, email: normalizedEmail, profile: toClientProfile(userRecord.uid, doc) },
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
