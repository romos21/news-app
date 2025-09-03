import { useGetMeQuery } from '@/shared/store/api';
import { CircularProgress, Toaster } from '@/shared/ui';
import { lazy, Suspense, type FC } from 'react';

const UserProfile = lazy(async () => {
  const module = await import('@/entities/user');
  return { default: module.UserProfile };
});

export const MePage: FC = () => {
  const { data, isLoading, isError, isSuccess } = useGetMeQuery();

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
