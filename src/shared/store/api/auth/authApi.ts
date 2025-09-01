import { createApi } from '@reduxjs/toolkit/query/react';
import type { GetMeResponse, SignInRequest, SignInResponse } from './types';
import { API_AUTH_BASE_URL, ApiAuthTags, API_AUTH_URLS, API_AUTH_REDUCER_PATH } from './constants';
import { fetchBaseQuery } from '../lib';

export const authApi = createApi({
  reducerPath: API_AUTH_REDUCER_PATH,
  baseQuery: fetchBaseQuery(API_AUTH_BASE_URL),
  tagTypes: [ApiAuthTags.ME],
  endpoints: (build) => ({
    signIn: build.mutation<SignInResponse, SignInRequest>({
      query: (body) => ({
        url: API_AUTH_URLS.SIGN_IN,
        method: 'POST',
        body,
      }),
      invalidatesTags: () => [ApiAuthTags.ME],
    }),
    getMe: build.query<GetMeResponse, void>({
      query: () => API_AUTH_URLS.GET_ME,
      providesTags: () => [ApiAuthTags.ME],
    }),
  }),
});

export const { useSignInMutation, useGetMeQuery, useLazyGetMeQuery } = authApi;
