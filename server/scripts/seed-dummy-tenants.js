/**
 * Create dummy tenant accounts (Firebase Auth + users/{uid}) without Google sign-in.
 * Owner finds them in Add Tenant by phone number.
 *
 * Usage:
 *   npm run seed:dummy-tenants
 *   npm run seed:dummy-tenants -- --pg sample-pg
 *   npm run seed:dummy-tenants -- --room 101
 *
 * Dummy login (email + password shown in output):
 *   http://localhost:5173/sample-pg/login  — use Google for real tenants, or
 *   sign in via Firebase Console test, or use staff-style email login if added later.
 *   These accounts use email/password in Firebase Auth (password printed once).
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

const DEFAULT_TENANTS = [
  { name: 'Rahul Sharma', phone: '9876543210' },
  { name: 'Priya Patel', phone: '9876543211' },
  { name: 'Amit Kumar', phone: '9876543212' },
  { name: 'Sneha Reddy', phone: '9876543213' },
  { name: 'Vikram Singh', phone: '9876543214' },
];

function parseArgs() {
  const args = process.argv.slice(2);
  let pgId = 'sample-pg';
  let roomNumber = null;

  for (const arg of args) {
    if (arg.startsWith('--pg=')) pgId = arg.slice(5);
    else if (arg.startsWith('--room=')) roomNumber = arg.slice(7);
  }

  return { pgId, roomNumber };
}

function tempPassword() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
  let pwd = '';
  for (let i = 0; i < 10; i++) pwd += chars[Math.floor(Math.random() * chars.length)];
  return `${pwd}!1`;
}

function computeRoomStatus(occupancy, capacity) {
  if (!occupancy || occupancy <= 0) return 'vacant';
  if (occupancy >= capacity) return 'full';
  return 'partial';
}

async function findRoomByNumber(db, pgId, roomNumber) {
  const snap = await db
    .collection('rooms')
    .where('pgId', '==', pgId)
    .where('roomNumber', '==', String(roomNumber))
    .limit(1)
    .get();

  if (snap.empty) {
    const legacy = await db
      .collection('rooms')
      .where('pgId', '==', pgId)
      .where('houseNumber', '==', String(roomNumber))
      .limit(1)
      .get();
    return legacy.empty ? null : { id: legacy.docs[0].id, ...legacy.docs[0].data() };
  }

  return { id: snap.docs[0].id, ...snap.docs[0].data() };
}

async function assignTenant(db, pgId, userId, room) {
  const capacity = room.sharingCapacity ?? room.numberOfGuests ?? 1;
  const occupancy = room.currentOccupancy || 0;

  if (occupancy >= capacity) {
    throw new Error(`Room ${room.roomNumber || room.houseNumber} is full`);
  }

  const now = new Date().toISOString();
  const newOccupancy = occupancy + 1;

  const batch = db.batch();
  batch.update(db.collection('users').doc(userId), { pgId });
  batch.set(db.collection('tenants').doc(userId), {
    pgId,
    roomId: room.id,
    moveInDate: now,
    noticeGiven: false,
    noticeDate: null,
    moveOutDate: null,
    status: 'active',
  });
  batch.update(db.collection('rooms').doc(room.id), {
    currentOccupancy: newOccupancy,
    status: computeRoomStatus(newOccupancy, capacity),
  });
  await batch.commit();
}

async function seedDummyTenants() {
  const { pgId, roomNumber } = parseArgs();

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

  const pgDoc = await db.collection('pgs').doc(pgId).get();
  if (!pgDoc.exists) {
    console.error(`PG "${pgId}" not found. Run: npm run seed:sample-pg`);
    process.exit(1);
  }

  let targetRoom = null;
  if (roomNumber) {
    targetRoom = await findRoomByNumber(db, pgId, roomNumber);
    if (!targetRoom) {
      console.error(`Room "${roomNumber}" not found in ${pgId}. Create it in the owner panel first.`);
      process.exit(1);
    }
  }

  console.log(`\nSeeding dummy tenants for PG: ${pgId}\n`);

  const created = [];

  for (let i = 0; i < DEFAULT_TENANTS.length; i++) {
    const { name, phone } = DEFAULT_TENANTS[i];
    const email = `tenant${i + 1}.dummy@${pgId}.test`;

    const existingByPhone = await db
      .collection('users')
      .where('role', '==', 'tenant')
      .where('phone', '==', phone)
      .limit(1)
      .get();

    if (!existingByPhone.empty) {
      console.log(`Skip ${name} — phone ${phone} already exists`);
      continue;
    }

    let uid;
    let password = null;

    try {
      const existingAuth = await auth.getUserByEmail(email);
      uid = existingAuth.uid;
      console.log(`Auth exists for ${email}, updating Firestore profile`);
    } catch {
      password = tempPassword();
      const user = await auth.createUser({
        email,
        password,
        displayName: name,
        emailVerified: true,
      });
      uid = user.uid;
    }

    const now = new Date().toISOString();
    await db.collection('users').doc(uid).set(
      {
        role: 'tenant',
        name,
        email,
        phone,
        photoURL: null,
        pgId: null,
        createdAt: now,
      },
      { merge: true }
    );

    if (targetRoom) {
      try {
        const freshRoom = await findRoomByNumber(db, pgId, roomNumber);
        await assignTenant(db, pgId, uid, freshRoom);
      } catch (err) {
        console.log(`  Created ${name} but room assign failed: ${err.message}`);
        created.push({ name, phone, email, password, assigned: false });
        continue;
      }
    }

    created.push({ name, phone, email, password, assigned: !!targetRoom });
    console.log(`✓ ${name} — phone: ${phone}${targetRoom ? ` (room ${roomNumber})` : ' (unassigned)'}`);
  }

  console.log('\n--- Owner: Add Tenant by phone ---');
  console.log(`http://localhost:5173/${pgId}/owner/add-tenant\n`);

  if (created.some((t) => t.password)) {
    console.log('--- Optional tenant login (email / password) ---');
    console.log('Enable Email/Password in Firebase Console → Authentication → Sign-in method');
    console.log('Then these can sign in (tenant portal uses Google today; Auth users exist for testing):\n');
    created
      .filter((t) => t.password)
      .forEach((t) => {
        console.log(`  ${t.name}: ${t.email} / ${t.password}`);
      });
  }

  console.log('\nDone.\n');
}

seedDummyTenants().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
