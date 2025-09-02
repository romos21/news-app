import { useDeferredValue, useState, type ChangeEvent, type FC } from 'react';
import { useGetAllUsersQuery, useDebounce } from '@/shared/store/api';
import { Backdrop, Container, GridContainer, Input, Toaster } from '@/shared/ui';
import { UserCard } from '@/entities/user';
import { NavLink } from 'react-router';
import { PAGE_PATHS } from '@/shared/constants';

export const UsersPage: FC = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [debouncedQuery] = useDebounce(searchValue, 300);
  const deferredQuery = useDeferredValue(debouncedQuery);
  const { isLoading, isError, data: usersList } = useGetAllUsersQuery(deferredQuery);
  const deferredUsersList = useDeferredValue(usersList);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  if (isLoading) {
    return <Backdrop open={isLoading} />;
  }
  if (isError || (!isLoading && !deferredUsersList)) {
    return <Toaster severity='error'>Oops... Something went wrong</Toaster>;
  }
  return (
    <Container
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
    >
      <Input
        value={searchValue}
        onChange={onChange}
        sx={{ minWidth: 600 }}
      />
      <GridContainer
        container
        spacing={2}
        justifyContent='stretch'
        alignItems='stretch'
        sx={{ width: '100%' }}
      >
        {deferredUsersList?.map((user) => (
          <GridContainer
            key={user.id}
            justifyContent='stretch'
            alignItems='stretch'
            size={{ sm: 12, md: 6, lg: 4 }}
          >
            <NavLink to={`${PAGE_PATHS.USERS}/${user.id}`}>
              <UserCard data={user} />
            </NavLink>
          </GridContainer>
        ))}
      </GridContainer>
    </Container>
  );
};
