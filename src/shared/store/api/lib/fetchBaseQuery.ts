import { fetchBaseQuery as fetchBaseQueryRTK } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../../types';

export const fetchBaseQuery = (baseUrl: string) =>
  fetchBaseQueryRTK({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const accessToken = state.auth.accessToken;
      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`);
      }
      return headers;
    },
  });
