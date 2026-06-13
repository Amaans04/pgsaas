/** @type {import('next').NextConfig} */
const allowedOrigin = process.env.ALLOWED_ORIGIN || 'http://localhost:5173';

const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: allowedOrigin },
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
