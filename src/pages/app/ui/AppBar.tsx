import { UserRoles } from '@/entities/user';
import { PAGE_PATHS } from '@/shared/constants';
import { useTranslation } from '@/shared/i18n';
import { useGetMeQuery } from '@/shared/store/api';
import { Container, Avatar, ButtonLink, CircularProgress } from '@/shared/ui';
import { Person, Article } from '@/shared/ui/icons';
import type { FC } from 'react';

export const AppBar: FC = () => {
  const { data: me, isLoading } = useGetMeQuery();
  const { t } = useTranslation(['common']);

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
          startIcon={<Article />}
        >
          {t('common:posts')}
        </ButtonLink>
        {me?.role === UserRoles.ADMIN && (
          <ButtonLink
            sx={(theme) => ({
              color: theme.palette.background.default,
            })}
            to={PAGE_PATHS.USERS}
            size='large'
            startIcon={<Person />}
          >
            {t('common:users')}
          </ButtonLink>
        )}
      </Container>
      {isLoading ?
        <CircularProgress />
      : <ButtonLink
          to={PAGE_PATHS.ME}
          size='large'
        >
          <Avatar
            src={me?.image}
            alt={me?.username}
          />
        </ButtonLink>
      }
    </Container>
  );
};
