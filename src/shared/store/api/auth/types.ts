import type { User } from '@/entities';
import type { ApiResponse } from '../types';

export type SignInResponse = ApiResponse<{
  accessToken: string;
}>;

export type SignInRequest = Pick<User, 'username'> & {
  password: string;
};

export type GetMeResponse = ApiResponse<User>;
