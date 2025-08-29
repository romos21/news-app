interface User {
  id: string;
  username: string;
}

export interface GetUserResponse extends User {}
export interface GetUserRequest {}

export type GetAllUsersResponse = User[];
export interface GetAllUsersRequest {}

export interface UpdateUserResponse extends User {}
export interface UpdateUserRequest extends Partial<User> {}

export interface CreateUserResponse extends User {}
export interface CreateUserRequest extends User {}

export interface DeleteUserResponse extends Pick<User, 'id'> {}
