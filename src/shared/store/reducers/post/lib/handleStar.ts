import type { PostState } from '../types';

export const setStarred = (state: PostState, postId: number) => {
  const { starred, ...rest } = state;

  const starredArray = Array.from(starred);

  const wasStarredBefore = starredArray.includes(postId);

  return {
    ...rest,
    starred: wasStarredBefore ? starredArray.filter((id: number) => id !== postId) : [...starredArray, postId],
  };
};
