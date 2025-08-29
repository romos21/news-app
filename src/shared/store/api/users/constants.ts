export const API_USERS_BASE_URL = process.env.API_PATH;
export const API_USERS_REDUCER_PATH = 'users';
export const API_USERS_URLS = {
  CREATE: `${API_USERS_BASE_URL}/user`,
  DELETE: `${API_USERS_BASE_URL}/user`,
  UPDATE: `${API_USERS_BASE_URL}/user`,
  GET: `${API_USERS_BASE_URL}/user`,
  GET_ALL: `${API_USERS_BASE_URL}/users`,
};
export enum ApiUsersTags {
  USER = 'USER',
  USERS = 'USERS',
}
