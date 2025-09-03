import { createApi } from '@reduxjs/toolkit/query/react';
import type { CreateCommentResponse, GetPostCommentsResponse, CreateCommentRequest } from './types';
import { API_COMMENTS_BASE_URL, API_COMMENTS_REDUCER_PATH, API_COMMENTS_URLS } from './constants';
import { fetchBaseQuery } from '../lib';

export const commentsApi = createApi({
  reducerPath: API_COMMENTS_REDUCER_PATH,
  baseQuery: fetchBaseQuery(API_COMMENTS_BASE_URL),
  endpoints: (build) => ({
    createComment: build.mutation<CreateCommentResponse, CreateCommentRequest>({
      query: (body) => ({
        url: API_COMMENTS_URLS.CREATE,
        method: 'POST',
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data: newComment } = await queryFulfilled;

        // update getPostComments API cache
        dispatch(
          commentsApi.util.updateQueryData('getPostComments', newComment.postId, (draft) => {
            draft.push(newComment);
          }),
        );
      },
    }),
    getPostComments: build.query<GetPostCommentsResponse, number>({
      query: (postId) => `${API_COMMENTS_URLS.GET_BY_POST}/${postId}`,
      transformResponse: (res: { comments: GetPostCommentsResponse }) => res?.comments,
    }),
  }),
});

export const { useCreateCommentMutation, useGetPostCommentsQuery, useLazyGetPostCommentsQuery } = commentsApi;
