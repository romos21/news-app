export const API_COMMENTS_BASE_URL = `${import.meta.env.VITE_API_URL}/comments`;
export const API_COMMENTS_REDUCER_PATH = 'commentsApi';
export const API_COMMENTS_URLS = {
  CREATE: `${API_COMMENTS_BASE_URL}/add`,
  GET_BY_POST: `${API_COMMENTS_BASE_URL}/post`,
};
