export const API_AUTH_BASE_URL = `${process.env.API_PATH}/auth`;
export const API_AUTH_REDUCER_PATH = 'auth';
export const API_AUTH_URLS = {
  SIGN_IN: `${API_AUTH_BASE_URL}/login`,
  GET_ME: `${API_AUTH_BASE_URL}/me`,
};
export enum ApiAuthTags {
  SIGN_IN = 'SIGN_IN',
  ME = 'ME',
}
