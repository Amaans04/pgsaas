import Razorpay from 'razorpay';

let razorpayInstance = null;

export function isRazorpayConfigured() {
  return Boolean(process.env.RAZORPAY_KEY_ID?.trim() && process.env.RAZORPAY_SECRET?.trim());
}

export function isDevPaymentsEnabled() {
  return !isRazorpayConfigured() && process.env.NODE_ENV !== 'production';
}

export function getRazorpay() {
  if (!isRazorpayConfigured()) {
    const err = new Error('Razorpay is not configured on the server');
    err.statusCode = 503;
    err.code = 'RAZORPAY_NOT_CONFIGURED';
    throw err;
  }

  if (!razorpayInstance) {
    razorpayInstance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });
  }
  return razorpayInstance;
}
