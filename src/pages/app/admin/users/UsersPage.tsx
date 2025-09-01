import type { FC } from 'react';
import { useGetAllUsersQuery } from '@/shared/store/api';
import { Backdrop, GridContainer, Toaster } from '@/shared/ui';
import { UserCard } from '@/entities/user/ui/UserCard/UserCard';

export const UsersPage: FC = () => {
  const {
    data: usersList,
    isLoading,
    isError,
  } = useGetAllUsersQuery({
    q: '',
  });

  console.log(usersList);

  if (isLoading) {
    return <Backdrop open={isLoading} />;
  }
  if (isError || (!isLoading && !usersList)) {
    return <Toaster severity='error'>Oops... Something went wrong</Toaster>;
  }
  return (
    <GridContainer
      container
      margin={6}
      spacing={2}
      justifyContent='stretch'
      alignItems='stretch'
    >
      {usersList.map((user) => (
        <GridContainer
          key={user.id}
          size={{ sm: 12, md: 6, lg: 4 }}
        >
          <UserCard data={user} />
        </GridContainer>
      ))}
    </GridContainer>
  );
};
