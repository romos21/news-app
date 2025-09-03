import type { FC } from 'react';
import type { User } from '../types';
import { Avatar } from '@/shared/ui';
import { getEmptyAvatar } from '../lib';

type UserAvatarProps = {
  user: User;
};

export const UserAvatar: FC<UserAvatarProps> = ({ user }) => {
  return (
    <Avatar
      src={user.image}
      sx={{
        width: 60,
        height: 60,
        bgcolor: 'primary.main',
      }}
    >
      {getEmptyAvatar(user)}
    </Avatar>
  );
};
