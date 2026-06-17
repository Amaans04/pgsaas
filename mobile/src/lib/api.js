import axios from 'axios';
import { auth } from '../config/firebase';

const baseURL = (process.env.EXPO_PUBLIC_SERVER_URL || '').replace(/\/$/, '');

const api = axios.create({
  baseURL,
  timeout: 30000,
});

let onUnauthorized = null;

export function setUnauthorizedHandler(handler) {
  onUnauthorized = handler;
}

api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      if (onUnauthorized) {
        await onUnauthorized();
      }
    }
    if (error.response?.status >= 500) {
      error.message = error.response?.data?.error || 'Something went wrong. Please try again.';
    }
    return Promise.reject(error);
  }
);

export default api;
