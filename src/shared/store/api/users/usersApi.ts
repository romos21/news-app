import { createApi } from '@reduxjs/toolkit/query/react';
import type {
  CreateUserRequest,
  CreateUserResponse,
  DeleteUserResponse,
  GetAllUsersResponse,
  GetUserResponse,
  UpdateUserRequest,
  UpdateUserResponse,
} from './types';
import { API_USERS_BASE_URL, API_USERS_URLS, API_USERS_REDUCER_PATH, DEFAULT_USER_FILTER_OPTION } from './constants';
import { fetchBaseQuery, transformUserResponse } from '../lib';
import { getFullName } from '@/entities/user/lib';
import type { SelectOption } from '@/shared/ui';
import { authApi } from '../auth';

export const usersApi = createApi({
  reducerPath: API_USERS_REDUCER_PATH,
  baseQuery: fetchBaseQuery(API_USERS_BASE_URL),
  endpoints: (build) => ({
    getUser: build.query<GetUserResponse, string>({
      query: (id) => `${API_USERS_URLS.GET}/${id}`,
      transformResponse: transformUserResponse,
    }),
    getAllUsers: build.query<GetAllUsersResponse, string>({
      query: (q) => ({
        url: API_USERS_URLS.GET_ALL,
        params: { q },
      }),
      transformResponse: (res: { users: GetAllUsersResponse }) => {
        return res.users.map((user) => transformUserResponse(user));
      },
    }),
    getUserFilterOptions: build.query<SelectOption[], void>({
      query: () => API_USERS_URLS.GET_ALL,
      transformResponse: (res: { users: GetAllUsersResponse }): SelectOption[] => {
        return [
          DEFAULT_USER_FILTER_OPTION,
          ...res?.users.map((user) => ({
            label: getFullName(user),
            value: user.id.toString(),
          })),
        ];
      },
    }),
    createUser: build.mutation<CreateUserResponse, CreateUserRequest>({
      query: (body) => ({
        url: API_USERS_URLS.CREATE,
        method: 'POST',
        body,
      }),
    }),
    updateUser: build.mutation<UpdateUserResponse, UpdateUserRequest>({
      query: ({ id, ...body }) => ({
        method: 'PUT',
        url: `${API_USERS_URLS.UPDATE}/${id}`,
        body,
      }),
      async onQueryStarted(res, { dispatch, queryFulfilled }) {
        const { data: updatedUser } = await queryFulfilled;

        // update getAllUsers API cache
        dispatch(
          usersApi.util.updateQueryData('getAllUsers', '', (draft) => {
            draft.forEach((user) => {
              if (user.id === updatedUser.id) {
                Object.assign(user, transformUserResponse(updatedUser));
              }
            });
          }),
        );

        // update getUser API cache
        if (res.id) {
          dispatch(
            usersApi.util.updateQueryData('getUser', res.id.toString(), (draft) => {
              Object.assign(draft, transformUserResponse(updatedUser));
            }),
          );
          dispatch(
            authApi.util.updateQueryData('getMe', undefined, (draft) => {
              if (draft.id === res.id) {
                Object.assign(draft, transformUserResponse(updatedUser));
              }
            }),
          );
        }
      },
    }),
    deleteUser: build.mutation<DeleteUserResponse, string>({
      query: (id) => ({
        method: 'DELETE',
        url: `${API_USERS_URLS.DELETE}/${id}`,
      }),
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
  useGetUserFilterOptionsQuery,
  useLazyGetUserFilterOptionsQuery,
} = usersApi;
