import { createApi } from '@reduxjs/toolkit/query/react';
import type {
  GetAllPostsRequest,
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
    getUserPosts: build.query<GetAllPostsResponse, GetAllPostsRequest>({
      query: () => API_POSTS_URLS.GET_BY_USER,
      providesTags: () => [ApiPostsTags.POSTS],
    }),
    getAllPosts: build.query<GetAllPostsResponse, GetAllPostsRequest>({
      query: () => API_POSTS_URLS.GET_ALL,
      providesTags: () => [ApiPostsTags.POSTS],
    }),
    createPost: build.mutation<CreatePostResponse, CreatePostRequest>({
      query: (date) => ({
        url: API_POSTS_URLS.CREATE,
        method: 'POST',
        body: date,
      }),
      invalidatesTags: (response) => [ApiPostsTags.POSTS, { type: ApiPostsTags.POST, id: response?.id }],
    }),
    updatePost: build.mutation<UpdatePostResponse, UpdatePostRequest>({
      query: ({ id, ...date }) => ({
        method: 'PATCH',
        url: API_POSTS_URLS.UPDATE,
        params: { id },
        body: date,
      }),
      invalidatesTags: (response) => [ApiPostsTags.POSTS, { type: ApiPostsTags.POST, id: response?.id }],
    }),
    deletePost: build.mutation<DeletePostResponse, string>({
      query: (id) => ({
        method: 'DELETE',
        url: API_POSTS_URLS.DELETE,
        params: { id },
      }),
      invalidatesTags: (response) => [ApiPostsTags.POSTS, { type: ApiPostsTags.POST, id: response?.id }],
    }),
  }),
});

export const {
  useCreatePostMutation,
  useDeletePostMutation,
  useGetAllPostsQuery,
  useGetPostQuery,
  useLazyGetAllPostsQuery,
  useLazyGetPostQuery,
  useUpdatePostMutation,
} = postsApi;
