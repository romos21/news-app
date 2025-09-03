import { PostView } from '@/entities/post';
import { skipToken, useGetPostQuery } from '@/shared/store/api';
import { Backdrop, Container, Toaster } from '@/shared/ui';
import type { FC } from 'react';
import { useParams } from 'react-router';

export const PostPage: FC = () => {
  const { id } = useParams();

  const { data: post, isSuccess, isLoading, isError } = useGetPostQuery(id ?? skipToken);

  return (
    <Container>
      <Backdrop open={isLoading} />
      {isError && <Toaster severity='error'>Oops... Something went wrong</Toaster>}
      {isSuccess && <PostView post={post} />}
    </Container>
  );
};
