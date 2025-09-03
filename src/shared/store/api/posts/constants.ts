export const API_POSTS_BASE_URL = `${import.meta.env.VITE_API_URL}/posts`;
export const API_POSTS_REDUCER_PATH = 'postsApi';
export const API_POSTS_URLS = {
  CREATE: `${API_POSTS_BASE_URL}/add`,
  DELETE: API_POSTS_BASE_URL,
  UPDATE: API_POSTS_BASE_URL,
  GET: API_POSTS_BASE_URL,
  GET_BY_USER: `${API_POSTS_BASE_URL}/user`,
  GET_ALL: `${API_POSTS_BASE_URL}/search`,
};
export const DEFAULT_REACTIONS_ENTITY = {
  likes: 0,
  dislikes: 0,
};
