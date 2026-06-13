import api from './api';

/**
 * Uploads a file directly to ImageKit from the browser.
 * Auth params (token/expire/signature) are fetched from our server —
 * the ImageKit private key never reaches the client.
 */
export async function uploadToImageKit(file) {
  const { data } = await api.get('/api/imagekit/auth');

  if (!data.success) {
    throw new Error(data.error || 'Failed to get upload authorization');
  }

  const { token, expire, signature, publicKey } = data.data;

  const resolvedPublicKey = publicKey || import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY;
  if (!resolvedPublicKey) {
    throw new Error('ImageKit public key is not configured');
  }

  const form = new FormData();
  form.append('file', file);
  form.append('fileName', file.name);
  form.append('publicKey', resolvedPublicKey);
  form.append('signature', signature);
  form.append('expire', String(expire));
  form.append('token', token);
  form.append('folder', '/pg-documents');

  const res = await fetch('https://upload.imagekit.io/api/v1/files/upload', {
    method: 'POST',
    body: form,
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || 'Upload failed');
  }

  return result;
}
