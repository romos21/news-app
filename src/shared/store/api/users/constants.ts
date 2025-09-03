export const API_USERS_BASE_URL = `${import.meta.env.VITE_API_URL}/users`;
export const API_USERS_REDUCER_PATH = 'usersApi';
export const API_USERS_URLS = {
  CREATE: `${API_USERS_BASE_URL}/add`,
  DELETE: API_USERS_BASE_URL,
  UPDATE: API_USERS_BASE_URL,
  GET: API_USERS_BASE_URL,
  GET_ALL: `${API_USERS_BASE_URL}/search`,
};
export const DEFAULT_USER_FILTER_OPTION = {
  label: 'All',
  value: '',
};
