import type { User } from '@/models';
import type { ApiResponse } from '../types';

type UserMutation = Omit<User, 'id'> & {
  password: string;
};

export type GetUserResponse = ApiResponse<User>;
export type GetUserRequest = {};

export type GetAllUsersResponse = ApiResponse<User[]>;
export type GetAllUsersRequest = {};

export type UpdateUserResponse = ApiResponse<User>;
export type UpdateUserRequest = Partial<UserMutation>;

export type CreateUserResponse = ApiResponse<User>;
export type CreateUserRequest = UserMutation;

export type DeleteUserResponse = ApiResponse<Pick<User, 'id'>>;
