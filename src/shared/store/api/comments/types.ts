import type { Comment } from '@/entities/comment';
import type { ApiResponse } from '../types';

export type CreateCommentResponse = ApiResponse<Comment>;
export type CreateCommentRequest = Omit<Comment, 'id' | 'user'> & {
  userId: number | null | undefined;
};

export type GetPostCommentsResponse = ApiResponse<Comment[]>;
