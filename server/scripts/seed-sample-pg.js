/**
 * One-time seed: creates pgs/sample-pg in Firestore.
 * Run after Firestore is enabled: npm run seed:sample-pg
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

const PG_ID = 'sample-pg';

async function seed() {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
  }

  const db = admin.firestore();
  const ref = db.collection('pgs').doc(PG_ID);
  const existing = await ref.get();

  if (existing.exists) {
    console.log(`pgs/${PG_ID} already exists — skipping.`);
    return;
  }

  await ref.set({
    name: 'Sample PG',
    address: '123, Koramangala, Bengaluru',
    ownerId: null,
    roomCount: 0,
    createdAt: new Date().toISOString(),
  });

  console.log(`Created pgs/${PG_ID}`);
}

seed().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
