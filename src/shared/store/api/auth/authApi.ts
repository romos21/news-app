import { createApi } from '@reduxjs/toolkit/query/react';
import type { GetMeResponse, SignInRequest, SignInResponse } from './types';
import { API_AUTH_BASE_URL, API_AUTH_URLS, API_AUTH_REDUCER_PATH } from './constants';
import { fetchBaseQuery } from '../lib';

export const authApi = createApi({
  reducerPath: API_AUTH_REDUCER_PATH,
  baseQuery: fetchBaseQuery(API_AUTH_BASE_URL),
  endpoints: (build) => ({
    signIn: build.mutation<SignInResponse, SignInRequest>({
      query: (body) => ({
        url: API_AUTH_URLS.SIGN_IN,
        method: 'POST',
        body: {
          ...body,
          expiresInMins: parseInt(import.meta.env.VITE_TOKEN_EXPIRES_IN_MINS),
        },
      }),
    }),
    getMe: build.query<GetMeResponse, void>({
      query: () => API_AUTH_URLS.GET_ME,
    }),
  }),
});

export const { useSignInMutation, useGetMeQuery, useLazyGetMeQuery } = authApi;
