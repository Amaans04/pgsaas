import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { handleCors } from '../../../../lib/cors';
import { error } from '../../../../lib/apiResponse';
import { verifyAuth } from '../../../../middleware/verifyAuth';
import { requireRole } from '../../../../middleware/requireRole';
import { getFirestore } from '../../../../lib/firebaseAdmin';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export default async function handler(req, res) {
  try {
    if (handleCors(req, res)) return;

    if (req.method !== 'GET') {
      return error(res, 'Method not allowed', 405);
    }

    const decoded = await verifyAuth(req);
    const user = await requireRole(decoded.uid, ['tenant']);
    const db = getFirestore();

    const { recordId } = req.query;
    const type = req.query.type === 'custom' ? 'custom' : 'rent';

    const collection = type === 'custom' ? 'customPayments' : 'rentRecords';
    const recordDoc = await db.collection(collection).doc(recordId).get();

    if (!recordDoc.exists) {
      return error(res, 'Payment record not found', 404);
    }

    const record = recordDoc.data();

    // Receipt belongs only to the tenant who paid
    if (record.tenantId !== decoded.uid) {
      return error(res, 'Access denied', 403);
    }

    if (record.status !== 'paid') {
      return error(res, 'Receipt is only available for paid records', 400);
    }

    let pgName = 'PG';
    if (record.pgId) {
      const pgDoc = await db.collection('pgs').doc(record.pgId).get();
      if (pgDoc.exists) pgName = pgDoc.data().name;
    }

    const title = type === 'custom'
      ? record.title
      : `Rent - ${MONTHS[(record.month || 1) - 1]} ${record.year}`;

    const receiptNo = `${type === 'custom' ? 'CP' : 'RR'}-${recordId.slice(0, 8).toUpperCase()}`;
    const paidDate = record.paidAt ? new Date(record.paidAt).toLocaleDateString('en-IN') : '-';
    const method =
      record.paymentMethod === 'cash'
        ? 'Cash'
        : record.paymentMethod === 'dev'
          ? 'Simulated (dev mode)'
          : 'Razorpay (online)';

    const pdf = await PDFDocument.create();
    const page = pdf.addPage([595, 420]);
    const font = await pdf.embedFont(StandardFonts.Helvetica);
    const bold = await pdf.embedFont(StandardFonts.HelveticaBold);

    const dark = rgb(0.13, 0.13, 0.18);
    const gray = rgb(0.45, 0.45, 0.5);
    const accent = rgb(0.31, 0.27, 0.9);

    page.drawRectangle({ x: 0, y: 380, width: 595, height: 40, color: accent });
    page.drawText(pgName, { x: 40, y: 393, size: 18, font: bold, color: rgb(1, 1, 1) });
    page.drawText('PAYMENT RECEIPT', { x: 420, y: 395, size: 12, font: bold, color: rgb(1, 1, 1) });

    const rows = [
      ['Receipt No.', receiptNo],
      ['Tenant', user.name || 'Tenant'],
      ['Payment For', title],
      ['Amount', `Rs. ${Number(record.amount).toLocaleString('en-IN')}`],
      ['Payment Date', paidDate],
      ['Payment Method', method],
      ['Reference', record.paymentId || receiptNo],
    ];

    let y = 330;
    rows.forEach(([label, value]) => {
      page.drawText(label, { x: 40, y, size: 11, font, color: gray });
      page.drawText(String(value), { x: 200, y, size: 11, font: bold, color: dark });
      y -= 32;
    });

    page.drawLine({ start: { x: 40, y: 90 }, end: { x: 555, y: 90 }, thickness: 0.5, color: gray });
    page.drawText('This is a computer-generated receipt and does not require a signature.', {
      x: 40, y: 70, size: 9, font, color: gray,
    });

    const bytes = await pdf.save();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="receipt-${receiptNo}.pdf"`);
    return res.status(200).send(Buffer.from(bytes));
  } catch (err) {
    console.error('receipt error:', err);
    return error(res, err.message || 'Internal server error', err.statusCode || 500);
  }
}
