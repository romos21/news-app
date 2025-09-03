import { createSlice } from '@reduxjs/toolkit';
import { authApi } from '../api';
import type { User } from '@/entities/user';

export interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  me: User | null;
}

const initialAuthState: AuthState = {
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
  me: null,
};

const AUTH_REDUCER_PATH = 'auth';

export const authSlice = createSlice({
  name: AUTH_REDUCER_PATH,
  initialState: initialAuthState,
  reducers: {
    setTokens: (state, action) => ({
      ...state,
      isAuthenticated: true,
      accessToken: action.payload.accessToken,
      refreshToken: action.payload.refreshToken,
    }),
    signOut: (state) => ({
      ...state,
      isAuthenticated: false,
      accessToken: null,
      refreshToken: null,
    }),
  },
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.signIn.matchFulfilled, (state, action) => ({
      ...state,
      isAuthenticated: true,
      accessToken: action.payload.accessToken,
      refreshToken: action.payload.refreshToken,
    }));
    builder.addMatcher(authApi.endpoints.getMe.matchFulfilled, (state, action) => ({
      ...state,
      me: action.payload,
    }));
  },
});

export const { setTokens, signOut } = authSlice.actions;
