import { useDeletePostMutation, useGetMeQuery, useUpdatePostMutation } from '@/shared/store/api';
import { PostUpdateAction, type Post } from '../types';
import { useMyPostManipulationsState } from './useMyPostManipulationsState';
import { useMemo } from 'react';
import { UserRoles } from '@/entities/user';

export type usePostActionsReturnType = {
  setLike: () => void;
  setDislike: () => void;
  setStarred: () => void;
  deletePost: () => void;
};

export const usePostActions = (post: Post): usePostActionsReturnType => {
  const { id, reactions } = post;

  const [updatePost] = useUpdatePostMutation();
  const [deletePostMutation] = useDeletePostMutation();
  const { isLiked, isDisliked, canDelete } = useMyPostManipulationsState(post);

  const setLike = () => {
    updatePost({
      id,
      action: PostUpdateAction.LIKE,
      reactions: {
        ...reactions,
        likes: isLiked ? reactions.likes - 1 : reactions.likes + 1,
        dislikes: isDisliked ? reactions.dislikes - 1 : reactions.dislikes,
      },
    });
  };

  const setDislike = () => {
    updatePost({
      id,
      action: PostUpdateAction.DISLIKE,
      reactions: {
        ...reactions,
        dislikes: isDisliked ? reactions.dislikes - 1 : reactions.dislikes + 1,
        likes: isLiked ? reactions.likes - 1 : reactions.likes,
      },
    });
  };

  const setStarred = () => {
    updatePost({
      id,
      action: PostUpdateAction.STARRED,
      reactions,
    });
  };

  const deletePost = () => {
    canDelete && deletePostMutation(id);
  };

  return {
    setLike,
    setDislike,
    setStarred,
    deletePost,
  };
};
