import type { PostState } from './types';

export const POSTS_REDUCER_PATH = 'posts';

export const initialPostState: PostState = {
  liked: [],
  disliked: [],
  starred: [],
};
