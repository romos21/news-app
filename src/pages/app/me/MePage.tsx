import { UserProfile } from '@/entities/user';
import { useGetMeQuery } from '@/shared/store/api';
import { Backdrop, Toaster } from '@/shared/ui';
import type { FC } from 'react';

export const MePage: FC = () => {
  const { data, isLoading, isError } = useGetMeQuery();

  if (isLoading) {
    return <Backdrop open={isLoading} />;
  }
  if (isError || (!isLoading && !data)) {
    return <Toaster severity='error'>Oops... Something went wrong</Toaster>;
  }
  return <UserProfile data={data} />;
};
