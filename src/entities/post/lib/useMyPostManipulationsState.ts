import { useAppSelector } from '@/shared/store';
import { useGetMeQuery } from '@/shared/store/api';
import { useMemo } from 'react';
import type { Post } from '../types';
import { UserRoles } from '@/entities/user';

type usePostActionsReturnType = {
  isLiked: boolean;
  isDisliked: boolean;
  isStarred: boolean;
  canDelete: boolean;
};

export const useMyPostManipulationsState = ({ id, userId }: Post): usePostActionsReturnType => {
  const { data: me } = useGetMeQuery();
  const { liked, disliked, starred } = useAppSelector((state) => state.posts);

  const canDelete = useMemo<boolean>(() => {
    return me?.id === userId || me?.role === UserRoles.ADMIN;
  }, [me, userId]);

  return {
    isLiked: liked.includes(id),
    isDisliked: disliked.includes(id),
    isStarred: starred.includes(id),
    canDelete,
  };
};
