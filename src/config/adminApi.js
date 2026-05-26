import { APP_CONFIG } from './appConfig';

export const ADMIN_TOKEN_KEY = 'adminToken';

export const ADMIN_API_URL = APP_CONFIG.endpoints.adminApiUrl;

export const getApiUrl = (path) => `${ADMIN_API_URL}${path}`;
