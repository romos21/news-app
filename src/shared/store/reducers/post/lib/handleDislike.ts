import type { PostState } from '../types';

export const setDislike = (state: PostState, postId: number) => {
  const { liked, disliked, ...rest } = state;

  const likedArray = Array.from(liked);
  const dislikedArray = Array.from(disliked);

  const wasLikedBefore = likedArray.includes(postId);
  const wasDislikedBefore = dislikedArray.includes(postId);

  return {
    ...rest,
    disliked: wasDislikedBefore ? dislikedArray.filter((id: number) => id !== postId) : [...dislikedArray, postId],
    liked: wasLikedBefore ? likedArray.filter((id: number) => id !== postId) : likedArray,
  };
};
