import type { ApiResponse } from '../types';

export type SignInResponse = ApiResponse<{
  token: string;
  exp: Date;
}>;

export interface SignInRequest {
  username: string;
  password: string;
}

export type GetMeResponse = ApiResponse<{
  username: string;
  password: string;
}>;
