import { NextResponse } from 'next/server';

function corsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Credentials': 'true',
  };
}

const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'no-referrer',
  'X-XSS-Protection': '0',
};

export function middleware(request) {
  const origin = process.env.ALLOWED_ORIGIN || 'http://localhost:5173';

  if (request.method === 'OPTIONS') {
    return new NextResponse(null, { status: 204, headers: { ...corsHeaders(origin), ...SECURITY_HEADERS } });
  }

  const response = NextResponse.next();
  const headers = { ...corsHeaders(origin), ...SECURITY_HEADERS };
  Object.entries(headers).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  return response;
}

export const config = {
  matcher: '/api/:path*',
};
