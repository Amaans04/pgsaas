import axios from 'axios';
import { auth } from './firebase';
import { setAccessToken, clearAccessToken } from './tokenStorage';
import { getServerUrl } from './serverUrl';

const baseURL = getServerUrl();

export async function establishSession() {
  const user = auth.currentUser;
  if (!user) {
    clearAccessToken();
    throw new Error('Not signed in');
  }

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
