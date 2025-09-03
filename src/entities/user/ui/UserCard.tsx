import type { FC } from 'react';
import { Typography, Card, CardHeader, Chip } from '@/shared/ui';
import { getFullName } from '../lib';
import type { User } from '../types';
import { UserAvatar } from './UserAvatar';

export type UserCardProps = {
  user: User;
};

export const UserCard: FC<UserCardProps> = ({ user }) => {
  const { username, role } = user;
  return (
    <Card
      sx={{
        boxShadow: 3,
        borderRadius: 2,
        display: 'block',
        height: '100%',
      }}
    >
      <CardHeader
        avatar={<UserAvatar user={user} />}
        title={
          <Typography
            variant='h6'
            component='h3'
          >
            {getFullName(user)} (@{username})
          </Typography>
        }
        subheader={
          <Chip
            label={role}
            size='small'
            color='primary'
            variant='outlined'
          />
        }
      />
    </Card>
  );
};
