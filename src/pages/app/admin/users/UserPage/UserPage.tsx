import { skipToken, useGetUserQuery } from '@/shared/store/api';
import { Toaster, CircularProgress } from '@/shared/ui';
import { lazy, Suspense, type FC } from 'react';
import { useParams } from 'react-router';

const UserProfile = lazy(async () => {
  const module = await import('@/entities/user');
  return { default: module.UserProfile };
});

export const UserPage: FC = () => {
  const { id } = useParams();
  const { data, isLoading, isError, isSuccess } = useGetUserQuery(id ?? skipToken);

  if (isLoading) {
    return <CircularProgress />;
  }
  if (isError) {
    return <Toaster severity='error'>Oops... Something went wrong</Toaster>;
  }
  return (
    isSuccess && (
      <Suspense fallback={<CircularProgress />}>
        <UserProfile user={data} />
      </Suspense>
    )
  );
};
