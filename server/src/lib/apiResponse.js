export function success(res, data, statusCode = 200) {
  return res.status(statusCode).json({ success: true, data, error: null });
}

export function error(res, message, statusCode = 400, extra = {}) {
  if (extra.retryAfter) {
    res.setHeader('Retry-After', String(extra.retryAfter));
  }
  return res.status(statusCode).json({ success: false, data: null, error: message });
}
