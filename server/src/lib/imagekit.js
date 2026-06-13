import ImageKit from 'imagekit';

let instance = null;

function getImageKitConfig() {
  const publicKey =
    process.env.IMAGEKIT_PUBLIC_KEY?.trim() || process.env.VITE_IMAGEKIT_PUBLIC_KEY?.trim();
  const privateKey =
    process.env.IMAGEKIT_PRIVATE_KEY?.trim() || process.env.VITE_IMAGEKIT_PRIVATE_KEY?.trim();
  const urlEndpoint =
    process.env.IMAGEKIT_URL_ENDPOINT?.trim() || process.env.VITE_IMAGEKIT_URL_ENDPOINT?.trim();

  return { publicKey, privateKey, urlEndpoint };
}

export function isImageKitConfigured() {
  const { publicKey, privateKey, urlEndpoint } = getImageKitConfig();
  return Boolean(publicKey && privateKey && urlEndpoint);
}

export function getImageKit() {
  const { publicKey, privateKey, urlEndpoint } = getImageKitConfig();

  if (!publicKey || !privateKey || !urlEndpoint) {
    const err = new Error(
      'ImageKit is not configured on the server. Set IMAGEKIT_PUBLIC_KEY, IMAGEKIT_PRIVATE_KEY, and IMAGEKIT_URL_ENDPOINT in server/.env.local'
    );
    err.statusCode = 503;
    err.code = 'IMAGEKIT_NOT_CONFIGURED';
    throw err;
  }

  if (!instance) {
    instance = new ImageKit({
      publicKey,
      privateKey,
      urlEndpoint,
    });
  }
  return instance;
}

export function getImageKitPublicKey() {
  return getImageKitConfig().publicKey;
}
