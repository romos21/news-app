import { useState, type ChangeEvent, type FC } from 'react';
import { useGetAllUsersQuery, useDebounce } from '@/shared/store/api';
import { Backdrop, ButtonLink, CircularProgress, Container, GridContainer, Input, Toaster } from '@/shared/ui';
import { UserCard } from '@/entities/user';
import { PAGE_PATHS } from '@/shared/constants';

export const UsersPage: FC = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [debouncedQuery] = useDebounce(searchValue, 300);
  const { isFetching, isError, data: usersList } = useGetAllUsersQuery(debouncedQuery);

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
      {isError && <Toaster severity='error'>Oops... Something went wrong</Toaster>}
      <Input
        value={searchValue}
        onChange={onChange}
        sx={{ width: 600, maxWidth: '100%', mb: 4 }}
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
