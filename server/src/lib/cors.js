export function getAllowedOrigin() {
  const raw = process.env.ALLOWED_ORIGIN || 'http://localhost:5173';
  try {
    const url = new URL(raw);
    return `${url.protocol}//${url.host}`;
  } catch {
    return raw.replace(/\/+$/, '');
  }
}

export function setCorsHeaders(res) {
  const origin = getAllowedOrigin();
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
}

export function handleCors(req, res) {
  setCorsHeaders(res);
  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return true;
  }
  return false;
}

export function withCors(handler) {
  return async (req, res) => {
    setCorsHeaders(res);
    if (req.method === 'OPTIONS') {
      return res.status(204).end();
    }
    try {
      return await handler(req, res);
    } catch (err) {
      console.error('API error:', err);
      return res.status(err.statusCode || 500).json({
        success: false,
        data: null,
        error: err.message || 'Internal server error',
      });
    }
  };
}
