import { createApi } from '@reduxjs/toolkit/query/react';
import type {
  GetAllPostsResponse,
  GetPostRequest,
  GetPostResponse,
  CreatePostResponse,
  CreatePostRequest,
  UpdatePostResponse,
  UpdatePostRequest,
  DeletePostResponse,
} from './types';
import { API_POSTS_BASE_URL, API_POSTS_REDUCER_PATH, API_POSTS_URLS, ApiPostsTags } from './constants';
import { fetchBaseQuery } from '../lib';

export const postsApi = createApi({
  reducerPath: API_POSTS_REDUCER_PATH,
  baseQuery: fetchBaseQuery(API_POSTS_BASE_URL),
  tagTypes: Object.values(ApiPostsTags),
  endpoints: (build) => ({
    getPost: build.query<GetPostResponse, GetPostRequest>({
      query: () => API_POSTS_URLS.GET,
      providesTags: (response) => [{ type: ApiPostsTags.POST, id: response?.id }],
    }),
    getUserPosts: build.query<GetAllPostsResponse, string>({
      query: (userId) => `${API_POSTS_URLS.GET_BY_USER}/${userId}`,
      providesTags: () => [ApiPostsTags.POSTS],
      transformResponse: (res: { posts: GetAllPostsResponse }) => res?.posts,
    }),
    getAllPosts: build.query<GetAllPostsResponse, string>({
      query: (q) => ({
        url: API_POSTS_URLS.GET_ALL,
        params: { q },
      }),
      providesTags: () => [ApiPostsTags.POSTS],
      transformResponse: (res: { posts: GetAllPostsResponse }) => res?.posts,
    }),
    createPost: build.mutation<CreatePostResponse, CreatePostRequest>({
      query: (body) => ({
        url: API_POSTS_URLS.CREATE,
        method: 'POST',
        body,
      }),
    }),
    updatePost: build.mutation<UpdatePostResponse, UpdatePostRequest>({
      query: ({ id, action, ...body }) => ({
        method: 'PATCH',
        url: `${API_POSTS_URLS.UPDATE}/${id}`,
        body,
      }),
      async onQueryStarted(res, { dispatch, queryFulfilled }) {
        const { data: updatedPost } = await queryFulfilled;

        // update getAllPosts API cache
        dispatch(
          postsApi.util.updateQueryData('getAllPosts', '', (draft) => {
            draft.forEach((post) => {
              if (post.id === updatedPost.id) {
                Object.assign(post, updatedPost);
              }
            });
          }),
        );

        // update getUserPosts API cache
        dispatch(
          postsApi.util.updateQueryData('getUserPosts', '', (draft) => {
            draft.forEach((post) => {
              if (post.id === updatedPost.id) {
                Object.assign(post, updatedPost);
              }
            });
          }),
        );
      },
    }),
    deletePost: build.mutation<DeletePostResponse, string>({
      query: (id) => ({
        method: 'DELETE',
        url: API_POSTS_URLS.DELETE,
        params: { id },
      }),
    }),
  }),
});

export const {
  useCreatePostMutation,
  useDeletePostMutation,
  useGetAllPostsQuery,
  useGetUserPostsQuery,
  useLazyGetUserPostsQuery,
  useGetPostQuery,
  useLazyGetAllPostsQuery,
  useLazyGetPostQuery,
  useUpdatePostMutation,
} = postsApi;
