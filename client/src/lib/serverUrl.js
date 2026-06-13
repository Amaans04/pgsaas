/**
 * VITE_SERVER_URL must be an absolute URL (include https://).
 * Without a protocol, the browser treats it as a relative path and API calls fail with 405.
 */
export function getServerUrl() {
  const raw = (import.meta.env.VITE_SERVER_URL || '').trim();

  if (!raw) {
    if (import.meta.env.DEV) {
      return 'http://localhost:3001';
    }
    console.error('VITE_SERVER_URL is missing. Set it in Vercel to your backend URL, e.g. https://pgsaas.vercel.app');
    return '';
  }

  if (/^https?:\/\//i.test(raw)) {
    return raw.replace(/\/+$/, '');
  }

  return `https://${raw.replace(/\/+$/, '')}`;
}
