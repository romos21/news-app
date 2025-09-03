import { UserRoles } from '@/entities/user';
import { PAGE_PATHS } from '@/shared/constants';
import { useGetMeQuery } from '@/shared/store/api';
import { Container, Avatar, ButtonLink } from '@/shared/ui';
import { CircularProgress } from '@mui/material';
import type { FC } from 'react';

export const AppBar: FC = () => {
  const { data: me, isLoading } = useGetMeQuery();

  return (
    <Container
      sx={(theme) => ({
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 5,
        p: 4,
        backgroundColor: theme.palette.primary.dark,
      })}
    >
      <Container sx={{ display: 'flex', columnGap: 2 }}>
        <ButtonLink
          sx={(theme) => ({
            color: theme.palette.background.default,
          })}
          to={PAGE_PATHS.POSTS}
        >
          Posts
        </ButtonLink>
        {me?.role === UserRoles.ADMIN && (
          <ButtonLink
            sx={(theme) => ({
              color: theme.palette.background.default,
            })}
            to={PAGE_PATHS.USERS}
          >
            Users
          </ButtonLink>
        )}
      </Container>
      {isLoading ?
        <CircularProgress />
      : <ButtonLink to={PAGE_PATHS.ME}>
          <Avatar
            src={me?.image}
            alt={me?.username}
          />
        </ButtonLink>
      }
    </Container>
  );
};
