import { fetchBaseQuery as fetchBaseQueryRTK, type BaseQueryFn } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../../types';
import { setTokens, type AuthState } from '../../reducers/auth';
import { isTokenExpired } from './tokenHelpers';
import { API_AUTH_BASE_URL, API_AUTH_URLS } from '../auth/constants';

export const fetchBaseQuery = (baseUrl: string): BaseQueryFn => {
  return async (args, api, extraOptions) => {
    const state = api.getState() as RootState;
    let { accessToken, refreshToken } = state.auth;

    if (accessToken && isTokenExpired(accessToken) && refreshToken) {
      const refreshResult = await fetchBaseQueryRTK({
        baseUrl: API_AUTH_BASE_URL,
      })(
        {
          url: API_AUTH_URLS.REFRESH_TOKEN,
          method: 'POST',
          body: {
            refreshToken,
            expiresInMins: parseInt(import.meta.env.VITE_TOKEN_EXPIRES_IN_MINS),
          },
        },
        api,
        extraOptions,
      );

      if (refreshResult.data) {
        const tokens = refreshResult.data as Pick<AuthState, 'accessToken' | 'refreshToken'>;
        api.dispatch(setTokens(tokens));
        accessToken = tokens.accessToken;
      }
    }

    return fetchBaseQueryRTK({
      baseUrl,
      prepareHeaders: (headers) => {
        if (accessToken) {
          headers.set('Authorization', `Bearer ${accessToken}`);
        }
        return headers;
      },
    })(args, api, extraOptions);
  };
};
