import { configureStore } from '@reduxjs/toolkit';
import { authReducer, authReducerPath, usersReducer, usersReducerPath } from './api';

export const store = configureStore({
  reducer: {
    [authReducerPath]: authReducer,
    [usersReducerPath]: usersReducer,
  },
});
