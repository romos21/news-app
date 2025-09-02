import { useDeferredValue, useEffect, useState, type ChangeEvent, type FC } from 'react';
import {
  useGetAllPostsQuery,
  useLazyGetUserPostsQuery,
  useDebounce,
  useGetUserFilterOptionsQuery,
} from '@/shared/store/api';
import { Backdrop, Container, GridContainer, Input, Select, Toaster, type SelectChangeEvent } from '@/shared/ui';
import { PostCard } from '@/entities/post';
import { PAGE_PATHS } from '@/shared/constants';

export const PostsPage: FC = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [userFilterValue, setUserFilterValue] = useState<string>('');
  const [debouncedQuery] = useDebounce(searchValue, 300);
  const deferredQuery = useDeferredValue(debouncedQuery);
  const { isLoading: allPostsLoading, isError: allPostsError, data: allPostsList } = useGetAllPostsQuery(deferredQuery);

  const { data: userFilterOptions = [] } = useGetUserFilterOptionsQuery();

  const [getUserPosts, { isLoading: userPostsLoading, isError: userPostsError, data: userPostsList }] =
    useLazyGetUserPostsQuery();

  useEffect(() => {
    userFilterValue && getUserPosts(userFilterValue);
  }, [userFilterValue, getUserPosts]);

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const isLoading = allPostsLoading || userPostsLoading;
  const isError = allPostsError || userPostsError;
  const deferredPostsList = useDeferredValue(userFilterValue ? userPostsList : allPostsList);

  const onUserFilterValueChange = (e: SelectChangeEvent) => {
    console.log(e.target.value);
    setUserFilterValue(e.target.value as unknown as string);
  };

  return (
    <Container
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
    >
      <Backdrop open={isLoading} />
      {(isError || (!isLoading && !deferredPostsList)) && (
        <Toaster severity='error'>Oops... Something went wrong</Toaster>
      )}
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
      <GridContainer
        container
        spacing={2}
        justifyContent='stretch'
        alignItems='stretch'
        sx={{ width: '100%' }}
      >
        {deferredPostsList?.map((post) => (
          <GridContainer
            key={post.id}
            justifyContent='stretch'
            alignItems='stretch'
            size={{ sm: 12, md: 6, lg: 4 }}
          >
            <PostCard
              data={post}
              link={`${PAGE_PATHS.POSTS}/${post.id}`}
            />
          </GridContainer>
        ))}
      </GridContainer>
    </Container>
  );
};
