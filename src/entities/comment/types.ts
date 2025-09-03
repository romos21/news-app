import type { User } from '../user';

export type CommentUser = Pick<User, 'id' | 'username'> & {
  fullName: string;
};

export interface Comment {
  id: number;
  body: string;
  postId: number;
  user: CommentUser;
}
