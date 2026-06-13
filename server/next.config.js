/** @type {import('next').NextConfig} */
const allowedOrigin = process.env.ALLOWED_ORIGIN || 'http://localhost:5173';

function normalizeOrigin(value) {
  try {
    const url = new URL(value);
    return `${url.protocol}//${url.host}`;
  } catch {
    return value.replace(/\/+$/, '');
  }
}

const nextConfig = {
  reactStrictMode: true,
  async headers() {
    const origin = normalizeOrigin(allowedOrigin);
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: origin },
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ];
  },
  // API routes only — no frontend pages
  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [],
      fallback: [
        {
          source: '/:path((?!api).*)',
          destination: '/api/not-found',
        },
      ],
    };
  },
};

module.exports = nextConfig;
