import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { GetMeResponse, SignInRequest, SignInResponse } from './types';
import { API_AUTH_BASE_URL, ApiAuthTags, API_AUTH_URLS, API_AUTH_REDUCER_PATH } from './constants';

const authApi = createApi({
  reducerPath: API_AUTH_REDUCER_PATH,
  baseQuery: fetchBaseQuery({ baseUrl: API_AUTH_BASE_URL }),
  tagTypes: Object.values(ApiAuthTags),
  endpoints: (build) => ({
    signIn: build.mutation<SignInResponse, SignInRequest, string>({
      query: (date) => ({
        url: API_AUTH_URLS.SIGN_IN,
        method: 'POST',
        body: date,
      }),
      invalidatesTags: [ApiAuthTags.SIGN_IN],
    }),
    getMe: build.query<GetMeResponse, undefined>({
      query: () => API_AUTH_URLS.GET_ME,
      providesTags: [ApiAuthTags.ME],
    }),
  }),
});

export const {
  useSignInMutation,
  useGetMeQuery,
  useLazyGetMeQuery,
  reducer: authReducer,
  reducerPath: authReducerPath,
} = authApi;
