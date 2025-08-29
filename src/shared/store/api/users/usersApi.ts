import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  CreateUserRequest,
  CreateUserResponse,
  DeleteUserResponse,
  GetAllUsersRequest,
  GetAllUsersResponse,
  GetUserRequest,
  GetUserResponse,
  UpdateUserRequest,
  UpdateUserResponse,
} from './types';
import { API_USERS_BASE_URL, ApiUsersTags, API_USERS_URLS, API_USERS_REDUCER_PATH } from './constants';

const usersApi = createApi({
  reducerPath: API_USERS_REDUCER_PATH,
  baseQuery: fetchBaseQuery({ baseUrl: API_USERS_BASE_URL }),
  tagTypes: Object.values(ApiUsersTags),
  endpoints: (build) => ({
    getUser: build.query<GetUserResponse, GetUserRequest>({
      query: () => API_USERS_URLS.GET,
      providesTags: (response) => [{ type: ApiUsersTags.USER, id: response?.id }],
    }),
    getAllUsers: build.query<GetAllUsersResponse, GetAllUsersRequest>({
      query: () => API_USERS_URLS.GET_ALL,
      providesTags: () => [ApiUsersTags.USERS],
    }),
    createUser: build.mutation<CreateUserResponse, CreateUserRequest>({
      query: (date) => ({
        url: API_USERS_URLS.CREATE,
        method: 'POST',
        body: date,
      }),
      invalidatesTags: (response) => [ApiUsersTags.USERS, { type: ApiUsersTags.USER, id: response?.id }],
    }),
    updateUser: build.mutation<UpdateUserResponse, UpdateUserRequest>({
      query: (date) => ({
        method: 'PATCH',
        url: API_USERS_URLS.UPDATE,
        body: date,
      }),
      invalidatesTags: (response) => [ApiUsersTags.USERS, { type: ApiUsersTags.USER, id: response?.id }],
    }),
    deleteUser: build.mutation<DeleteUserResponse, string>({
      query: (id) => ({
        method: 'DELETE',
        url: API_USERS_URLS.DELETE,
        params: { id },
      }),
      invalidatesTags: (response) => [ApiUsersTags.USERS, { type: ApiUsersTags.USER, id: response?.id }],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useGetUserQuery,
  useLazyGetAllUsersQuery,
  useLazyGetUserQuery,
  useUpdateUserMutation,
  reducer: usersReducer,
  reducerPath: usersReducerPath,
} = usersApi;
