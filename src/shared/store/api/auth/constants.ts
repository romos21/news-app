export const API_AUTH_BASE_URL = `${import.meta.env.VITE_API_URL}/auth`;
export const API_AUTH_REDUCER_PATH = 'authApi';
export const API_AUTH_URLS = {
  SIGN_IN: `${API_AUTH_BASE_URL}/login`,
  GET_ME: `${API_AUTH_BASE_URL}/me`,
};
export enum ApiAuthTags {
  ME = 'ME',
}
