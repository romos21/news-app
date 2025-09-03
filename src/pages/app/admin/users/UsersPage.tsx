import { useState, type ChangeEvent, type FC } from 'react';
import { useGetAllUsersQuery, useDebounce } from '@/shared/store/api';
import { ButtonLink, CircularProgress, Container, GridContainer, Toaster } from '@/shared/ui';
import { UserCard } from '@/entities/user';
import { PAGE_PATHS } from '@/shared/constants';
import { Input } from '@/shared/ui';
import { useTranslation } from '@/shared/i18n';

export const UsersPage: FC = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [debouncedQuery] = useDebounce(searchValue, 300);
  const { isFetching, isError, data: usersList } = useGetAllUsersQuery(debouncedQuery);
  const { t } = useTranslation(['common', 'user']);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <Container
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      sx={{ ml: 4, mr: 4 }}
    >
      {isError && <Toaster severity='error'>{t('common:oops')}</Toaster>}
      <Input
        value={searchValue}
        onChange={onChange}
        sx={{ width: 600, maxWidth: '100%', mb: 4 }}
        placeholder={t('user:globalSearchPlaceholder')}
      />
      {isFetching ?
        <CircularProgress />
      : <GridContainer
          container
          spacing={2}
          justifyContent='stretch'
          alignItems='stretch'
          sx={{ width: '100%' }}
        >
          {usersList?.map((user) => (
            <GridContainer
              key={user.id}
              justifyContent='stretch'
              alignItems='stretch'
              size={{ sm: 12, lg: 6 }}
              sx={{ width: '100%' }}
            >
              <ButtonLink
                sx={{ display: 'block', height: '100%' }}
                to={`${PAGE_PATHS.USERS}/${user.id}`}
              >
                <UserCard user={user} />
              </ButtonLink>
            </GridContainer>
          ))}
        </GridContainer>
      }
    </Container>
  );
};
