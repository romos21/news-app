import type { User } from '@/entities';
import type { ApiResponse } from '../types';

type UserMutation = Omit<User, 'id'> & {
  password: string;
};

export type GetUserResponse = ApiResponse<User>;

export type GetAllUsersResponse = ApiResponse<User[]>;
export type GetAllUsersRequest = {
  q: string;
};

export type UpdateUserResponse = ApiResponse<User>;
export type UpdateUserRequest = Partial<UserMutation>;

export type CreateUserResponse = ApiResponse<User>;
export type CreateUserRequest = UserMutation;

export type DeleteUserResponse = ApiResponse<Pick<User, 'id'>>;
