export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

export const getAssetUrl = url => {
  if (!url || url.startsWith('data:') || url.startsWith('http') || url.startsWith('/seguroweb')) {
    return url;
  }

  if (url.startsWith('/uploads')) {
    return `${API_BASE_URL}${url}`;
  }

  return url;
};
