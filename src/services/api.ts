/**
 * LANYARD-402: Central Axios client.
 * - Sensible 30-second default timeout (was 60 minutes).
 * - withCredentials: true to send cookies alongside JWT where needed.
 * - Request interceptor auto-attaches gotek_token JWT.
 * - Response interceptor clears stale tokens on 401 and redirects,
 *   but never redirects when the failing request itself is an auth call.
 */
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: 30_000,                  // 30 s — sensible for API calls
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
});

// ── Request interceptor — attach JWT Bearer token ─────────────────────────
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('gotek_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ── Response interceptor — handle 401 gracefully ─────────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const isAuthEndpoint =
        error.config?.url?.includes('/auth/login') ||
        error.config?.url?.includes('/auth/register');

      if (!isAuthEndpoint) {
        // Token is invalid/expired — clear storage and redirect to login
        localStorage.removeItem('gotek_token');
        localStorage.removeItem('gotek_user');
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  },
);

export default api;
