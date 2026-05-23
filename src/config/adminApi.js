export const ADMIN_TOKEN_KEY = 'adminToken';

export const ADMIN_API_URL = process.env.REACT_APP_ADMIN_API_URL ||
  (process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : '');

export const getApiUrl = (path) => `${ADMIN_API_URL}${path}`;
