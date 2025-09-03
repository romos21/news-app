import { lazy, useCallback, useEffect, useState, type ChangeEvent, type FC } from 'react';
import {
  useGetAllPostsQuery,
  useLazyGetUserPostsQuery,
  useDebounce,
  useGetUserFilterOptionsQuery,
} from '@/shared/store/api';
import { Container, GridContainer, Input, Modal, Select, Toaster, Tooltip, type SelectChangeEvent } from '@/shared/ui';
import { PostCard } from '@/entities/post';
import { PAGE_PATHS } from '@/shared/constants';
import { CircularProgress, IconButton } from '@mui/material';
import { AddCircle } from '@/shared/ui/icons';

const CreatePostForm = lazy(async () => {
  const module = await import('@/entities/post');
  return { default: module.CreatePostForm };
});

export const PostsPage: FC = () => {
  const [showCreatePostModal, setShowCreatePostModal] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [userFilterValue, setUserFilterValue] = useState<string>('');
  const [debouncedQuery] = useDebounce(searchValue, 300);
  const {
    isFetching: allPostsFetching,
    isError: allPostsError,
    data: allPostsList,
  } = useGetAllPostsQuery(debouncedQuery);

  const { data: userFilterOptions = [] } = useGetUserFilterOptionsQuery();

  const [getUserPosts, { isFetching: userPostsFetching, isError: userPostsError, data: userPostsList }] =
    useLazyGetUserPostsQuery();

  useEffect(() => {
    userFilterValue && getUserPosts(userFilterValue);
  }, [userFilterValue, getUserPosts]);

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const isFetching = allPostsFetching || userPostsFetching;
  const isError = allPostsError || userPostsError;
  const postsList = userFilterValue ? userPostsList : allPostsList;

  const onUserFilterValueChange = (e: SelectChangeEvent) => {
    setUserFilterValue(e.target.value as unknown as string);
  };

  const handleShowCreatePostModal = useCallback(() => {
    setShowCreatePostModal((prev) => !prev);
  }, [setShowCreatePostModal]);

  return (
    <Container
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
    >
      {isError && <Toaster severity='error'>Oops... Something went wrong</Toaster>}
      <GridContainer
        container
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        sx={{ width: '100%', m: '0px auto 80px', maxWidth: 640 }}
      >
        <GridContainer size={{ xs: 12, sm: 8 }}>
          <Input
            sx={{ width: '100%' }}
            value={searchValue}
            onChange={onSearchChange}
            placeholder='Search for posts...'
          />
        </GridContainer>
        <GridContainer size={{ xs: 12, sm: 4 }}>
          <Select
            sx={{ width: '100%' }}
            value={userFilterValue}
            onChange={onUserFilterValueChange}
            options={userFilterOptions}
            label='Filter by user'
          />
        </GridContainer>
      </GridContainer>
      {isFetching ?
        <CircularProgress />
      : <GridContainer
          container
          spacing={2}
          justifyContent='stretch'
          alignItems='stretch'
          sx={{ width: '100%' }}
        >
          {postsList?.map((post) => (
            <GridContainer
              key={post.id}
              justifyContent='stretch'
              alignItems='stretch'
              size={{ sm: 12, md: 6, lg: 4 }}
            >
              <PostCard
                post={post}
                link={`${PAGE_PATHS.POSTS}/${post.id}`}
              />
            </GridContainer>
          ))}
        </GridContainer>
      }
      <Tooltip title='Create new post'>
        <IconButton
          size='small'
          onClick={handleShowCreatePostModal}
          sx={{
            position: 'fixed',
            bottom: 40,
            right: 40,
          }}
        >
          <AddCircle
            color='primary'
            sx={{ fontSize: 80 }}
          />
        </IconButton>
      </Tooltip>
      <Modal
        open={showCreatePostModal}
        onClose={handleShowCreatePostModal}
        title='Create new post'
        fullWidth
        maxWidth='md'
      >
        <CreatePostForm onSuccess={handleShowCreatePostModal} />
      </Modal>
    </Container>
  );
};
