import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authApi, usersApi, postsApi, commentsApi } from './api';
import { authSlice, postsSlice } from './reducers';

const persistConfig = {
  key: 'newsApp',
  storage,
  whitelist: [authSlice.reducerPath],
};

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [postsApi.reducerPath]: postsApi.reducer,
  [commentsApi.reducerPath]: commentsApi.reducer,
  [authSlice.reducerPath]: authSlice.reducer,
  [postsSlice.reducerPath]: postsSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    const defaultMiddleware = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });
    return defaultMiddleware
      .concat(authApi.middleware)
      .concat(usersApi.middleware)
      .concat(postsApi.middleware)
      .concat(commentsApi.middleware);
  },
  devTools: true,
});

export const persistor = persistStore(store);
