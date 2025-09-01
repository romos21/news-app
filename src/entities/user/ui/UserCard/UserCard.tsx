import type { FC } from 'react';
import { Typography, Card, CardHeader, Avatar, Toaster, Chip, Container } from '@/shared/ui';
import { useParams } from 'react-router';
import { skipToken, useGetUserQuery } from '@/shared/store/api';
import { getFullName } from '../../lib';
import { Backdrop } from '@mui/material';
import type { User } from '../../types';

export type UserCardProps = {
  data: User;
};

export const UserCard: FC<UserCardProps> = ({ data }) => {
  return (
    <Card
      sx={{
        maxWidth: 400,
        mx: 'auto',
        mt: 3,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            src={data.image}
            sx={{
              width: 60,
              height: 60,
              bgcolor: 'primary.main',
            }}
          >
            {getFullName(data)}
          </Avatar>
        }
        title={
          <Typography
            variant='h6'
            component='h3'
          >
            {getFullName(data)} (@{data.username})
          </Typography>
        }
        subheader={
          <Chip
            label={data.role}
            size='small'
            color='primary'
            variant='outlined'
          />
        }
      />
    </Card>
  );
};
