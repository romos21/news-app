import { useAppSelector } from '@/shared/store';

export const useMyPostManipulationsState = (postId: number) => {
  const { liked, disliked, starred } = useAppSelector((state) => state.posts);
  return {
    isLiked: liked.includes(postId),
    isDisliked: disliked.includes(postId),
    isStarred: starred.includes(postId),
  };
};
