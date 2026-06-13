export function success(res, data, statusCode = 200) {
  return res.status(statusCode).json({ success: true, data, error: null });
}

export function error(res, message, statusCode = 400) {
  return res.status(statusCode).json({ success: false, data: null, error: message });
}
