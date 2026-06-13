/**
 * Promote a Google account to PG owner.
 * User must have signed in at least once (Firebase Auth record exists).
 *
 * Usage: node scripts/seed-owner.js <email> [pgId]
 * Example: node scripts/seed-owner.js owner@gmail.com sample-pg
 */
const { readFileSync } = require('fs');
const { resolve } = require('path');
const admin = require('firebase-admin');

function loadEnv() {
  const envPath = resolve(__dirname, '../.env.local');
  const content = readFileSync(envPath, 'utf8');
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq);
    let value = trimmed.slice(eq + 1);
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnv();

async function seedOwner(email, pgId) {
  if (!email) {
    console.error('Usage: node scripts/seed-owner.js <email> [pgId]');
    process.exit(1);
  }

  pgId = pgId || 'sample-pg';

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
  }

  const auth = admin.auth();
  const db = admin.firestore();

  let user;
  try {
    user = await auth.getUserByEmail(email);
  } catch {
    console.error(`No Firebase user found for ${email}.`);
    console.error('Sign in once at http://localhost:5173/sample-pg/login with that Google account, then run this again.');
    process.exit(1);
  }

  const pgRef = db.collection('pgs').doc(pgId);
  const pgDoc = await pgRef.get();
  if (!pgDoc.exists) {
    console.error(`PG "${pgId}" not found. Run: npm run seed:sample-pg`);
    process.exit(1);
  }

  const now = new Date().toISOString();
  const batch = db.batch();

  batch.set(
    db.collection('users').doc(user.uid),
    {
      role: 'owner',
      name: user.displayName || email.split('@')[0],
      email: user.email,
      phone: '',
      pgId,
      createdAt: now,
    },
    { merge: true }
  );

  batch.update(pgRef, { ownerId: user.uid });

  await batch.commit();

  console.log(`Owner access granted for ${email}`);
  console.log(`Login at: http://localhost:5173/${pgId}/login`);
  console.log(`Dashboard: http://localhost:5173/${pgId}/owner/dashboard`);
}

const email = process.argv[2];
const pgId = process.argv[3];

seedOwner(email, pgId).catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
