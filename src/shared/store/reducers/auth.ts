import { createSlice } from '@reduxjs/toolkit';
import { authApi } from '../api';
import type { User } from '@/entities/user';

interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  me: User | null;
}

const initialAuthState: AuthState = {
  isAuthenticated: false,
  accessToken: null,
  me: null,
};

const AUTH_REDUCER_PATH = 'auth';

export const authSlice = createSlice({
  name: AUTH_REDUCER_PATH,
  initialState: initialAuthState,
  reducers: {
    signOut: (state) => ({
      ...state,
      isAuthenticated: false,
      accessToken: null,
    }),
  },
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.signIn.matchFulfilled, (state, action) => ({
      ...state,
      isAuthenticated: true,
      accessToken: action.payload.accessToken,
    }));
    builder.addMatcher(authApi.endpoints.getMe.matchFulfilled, (state, action) => ({
      ...state,
      me: action.payload,
    }));
  },
});
