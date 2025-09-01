import { UserProfile } from '@/entities';
import { skipToken, useGetUserQuery } from '@/shared/store/api';
import { Backdrop, Toaster } from '@/shared/ui';
import type { FC } from 'react';
import { useParams } from 'react-router';

export const UserPage: FC = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetUserQuery(id ?? skipToken);

  if (isLoading) {
    return <Backdrop open={isLoading} />;
  }
  if (isError || (!isLoading && !data)) {
    return <Toaster severity='error'>Oops... Something went wrong</Toaster>;
  }
  return <UserProfile data={data} />;
};
