export interface SignInResponse {
  token: string;
  exp: Date;
}

export interface SignInRequest {
  username: string;
  password: string;
}

export interface GetMeResponse {
  username: string;
  password: string;
}
