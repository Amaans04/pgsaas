/**
 * Wipe operational data for a PG so you can start fresh.
 * Keeps the PG document and owner account; removes tenants, rooms, payments, etc.
 *
 * Usage:
 *   npm run reset:pg-data -- --dry-run
 *   npm run reset:pg-data -- --pg sample-pg --confirm
 *   npm run reset:pg-data -- --pg sample-pg --confirm --delete-auth
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

function parseArgs() {
  const args = process.argv.slice(2);
  let pgId = 'sample-pg';
  let dryRun = false;
  let confirm = false;
  let deleteAuth = false;

  for (let i = 0; i < args.length; i += 1) {
    if (args[i] === '--pg' && args[i + 1]) {
      pgId = args[i + 1];
      i += 1;
    } else if (args[i] === '--dry-run') {
      dryRun = true;
    } else if (args[i] === '--confirm') {
      confirm = true;
    } else if (args[i] === '--delete-auth') {
      deleteAuth = true;
    }
  }

  return { pgId, dryRun, confirm, deleteAuth };
}

async function deleteDocs(db, docs, label, dryRun) {
  if (docs.length === 0) {
    console.log(`  ${label}: 0`);
    return 0;
  }

  if (dryRun) {
    console.log(`  ${label}: ${docs.length} (dry-run)`);
    return docs.length;
  }

  let batch = db.batch();
  let ops = 0;
  for (const doc of docs) {
    batch.delete(doc.ref);
    ops += 1;
    if (ops >= 450) {
      await batch.commit();
      batch = db.batch();
      ops = 0;
    }
  }
  if (ops > 0) await batch.commit();

  console.log(`  ${label}: ${docs.length} deleted`);
  return docs.length;
}

async function queryAll(db, collection, field, value) {
  const snapshot = await db.collection(collection).where(field, '==', value).get();
  return snapshot.docs;
}

async function resetPgData({ pgId, dryRun, confirm, deleteAuth }) {
  if (!confirm && !dryRun) {
    console.error('\nRefusing to run without --confirm or --dry-run.\n');
    console.error('Preview:  npm run reset:pg-data -- --dry-run');
    console.error('Execute:  npm run reset:pg-data -- --pg sample-pg --confirm\n');
    process.exit(1);
  }

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
  const auth = admin.auth();

  const pgRef = db.collection('pgs').doc(pgId);
  const pgDoc = await pgRef.get();
  if (!pgDoc.exists) {
    console.error(`PG "${pgId}" not found in Firestore.`);
    process.exit(1);
  }

  const ownerId = pgDoc.data()?.ownerId || null;

  console.log(`\n${dryRun ? 'DRY RUN' : 'RESET'} for PG: ${pgId}`);
  if (ownerId) console.log(`Keeping owner user: ${ownerId}`);
  console.log('');

  const tenantDocs = await queryAll(db, 'tenants', 'pgId', pgId);
  const tenantIds = new Set(tenantDocs.map((doc) => doc.id));

  const [
    roomDocs,
    rentDocs,
    complaintDocs,
    cleaningDocs,
    customPaymentDocs,
    staffUserDocs,
  ] = await Promise.all([
    queryAll(db, 'rooms', 'pgId', pgId),
    queryAll(db, 'rentRecords', 'pgId', pgId),
    queryAll(db, 'complaints', 'pgId', pgId),
    queryAll(db, 'cleaningRequests', 'pgId', pgId),
    queryAll(db, 'customPayments', 'pgId', pgId),
    queryAll(db, 'users', 'pgId', pgId).then((docs) =>
      docs.filter((doc) => doc.data().role === 'staff')
    ),
  ]);

  const unassignedTenantUsers = await db
    .collection('users')
    .where('role', '==', 'tenant')
    .get()
    .then((snap) => snap.docs.filter((doc) => !doc.data().pgId));

  const tenantUserDocs = [];
  for (const uid of tenantIds) {
    const userDoc = await db.collection('users').doc(uid).get();
    if (userDoc.exists) tenantUserDocs.push(userDoc);
  }
  for (const doc of unassignedTenantUsers) {
    tenantUserDocs.push(doc);
  }

  const documentDocs = [];
  if (tenantIds.size > 0) {
    const ids = [...tenantIds];
    for (let i = 0; i < ids.length; i += 10) {
      const chunk = ids.slice(i, i + 10);
      const snap = await db.collection('documents').where('userId', 'in', chunk).get();
      documentDocs.push(...snap.docs);
    }
  }

  const refreshTokenDocs = [];
  const allUserIdsToRemove = new Set([
    ...tenantIds,
    ...staffUserDocs.map((doc) => doc.id),
    ...unassignedTenantUsers.map((doc) => doc.id),
  ]);

  for (const uid of allUserIdsToRemove) {
    const snap = await db.collection('refreshTokens').where('uid', '==', uid).get();
    refreshTokenDocs.push(...snap.docs);
  }

  console.log('Will remove:');
  await deleteDocs(db, tenantDocs, 'tenants', dryRun);
  await deleteDocs(db, roomDocs, 'rooms', dryRun);
  await deleteDocs(db, rentDocs, 'rentRecords', dryRun);
  await deleteDocs(db, complaintDocs, 'complaints', dryRun);
  await deleteDocs(db, cleaningDocs, 'cleaningRequests', dryRun);
  await deleteDocs(db, customPaymentDocs, 'customPayments', dryRun);
  await deleteDocs(db, documentDocs, 'documents (tenant uploads)', dryRun);
  await deleteDocs(db, tenantUserDocs, 'users (tenants)', dryRun);
  await deleteDocs(db, staffUserDocs, 'users (staff)', dryRun);
  await deleteDocs(db, refreshTokenDocs, 'refreshTokens', dryRun);

  if (!dryRun) {
    await pgRef.set(
      {
        roomCount: 0,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
    console.log('  pgs/{pgId}: roomCount reset to 0');

    if (ownerId) {
      await db.collection('users').doc(ownerId).set(
        {
          role: 'owner',
          pgId,
          passwordSet: false,
          phone: '',
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );
      console.log(`  users/${ownerId}: owner profile reset (password setup required)`);
    }
  } else {
    console.log('  pgs/{pgId}: roomCount would reset to 0 (dry-run)');
    if (ownerId) {
      console.log(`  users/${ownerId}: owner profile would reset (dry-run)`);
    }
  }

  if (deleteAuth && allUserIdsToRemove.size > 0) {
    console.log('\nFirebase Auth users:');
    for (const uid of allUserIdsToRemove) {
      if (ownerId && uid === ownerId) continue;
      if (dryRun) {
        console.log(`  would delete auth user ${uid}`);
      } else {
        try {
          await auth.deleteUser(uid);
          console.log(`  deleted auth user ${uid}`);
        } catch (err) {
          console.log(`  skip auth user ${uid}: ${err.message}`);
        }
      }
    }
  } else if (allUserIdsToRemove.size > 0) {
    console.log(
      '\nFirebase Auth accounts were NOT deleted. Tenants can still sign in unless you run with --delete-auth.'
    );
  }

  console.log(`\nDone.${dryRun ? ' Re-run with --confirm to apply.' : ''}\n`);
}

loadEnv();
const options = parseArgs();
resetPgData(options).catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
