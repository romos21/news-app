import type { FC } from 'react';
import type { User } from '../types';
import { Avatar } from '@/shared/ui';
import { getEmptyAvatar } from '../lib';

type UserAvatarProps = {
  data: User;
};

export const UserAvatar: FC<UserAvatarProps> = ({ data }) => {
  return (
    <Avatar
      src={data.image}
      sx={{
        width: 60,
        height: 60,
        bgcolor: 'primary.main',
      }}
    >
      {getEmptyAvatar(data)}
    </Avatar>
  );
};
