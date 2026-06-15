import axios from 'axios';
import { auth } from './firebase';
import { setAccessToken, clearAccessToken } from './tokenStorage';
import { getServerUrl } from './serverUrl';

const baseURL = getServerUrl();

/** Dedupe concurrent session exchanges (login fires onAuthStateChanged + completeSignIn). */
let sessionPromise = null;

function mapSessionError(err) {
  if (err?.response?.data?.error) {
    return new Error(err.response.data.error);
  }
  if (err?.response?.status >= 500) {
    return new Error(
      'The server failed to start your session. Stop the API server, run `npm run dev:fresh` in pgplatform/server, then try again.'
    );
  }
  if (err?.code === 'ERR_NETWORK') {
    return new Error('Cannot reach the API server. Check that the backend is running and VITE_SERVER_URL is correct.');
  }
  return err instanceof Error ? err : new Error('Failed to sign in');
}

export async function establishSession() {
  if (sessionPromise) {
    return sessionPromise;
  }

  sessionPromise = (async () => {
    const user = auth.currentUser;
    if (!user) {
      clearAccessToken();
      throw new Error('Not signed in');
    }

    try {
      const firebaseToken = await user.getIdToken(true);
      const { data } = await axios.post(
        `${baseURL}/api/auth/session`,
        {},
        { headers: { Authorization: `Bearer ${firebaseToken}` }, withCredentials: true }
      );

      if (!data.success) {
        clearAccessToken();
        throw new Error(data.error || 'Failed to create session');
      }

      setAccessToken(data.data.accessToken);
      return data.data;
    } catch (err) {
      clearAccessToken();
      throw mapSessionError(err);
    }
  })();

  try {
    return await sessionPromise;
  } finally {
    sessionPromise = null;
  }
}

export async function refreshAccessToken() {
  const { data } = await axios.post(`${baseURL}/api/auth/refresh`, {}, { withCredentials: true });

  if (!data.success) {
    clearAccessToken();
    throw new Error(data.error || 'Failed to refresh token');
  }

  setAccessToken(data.data.accessToken);
  return data.data.accessToken;
}

export async function endSession() {
  try {
    await axios.post(`${baseURL}/api/auth/logout`, {}, { withCredentials: true });
  } catch {
    // Ignore network errors - we still clear local state below.
  } finally {
    clearAccessToken();
  }
}
