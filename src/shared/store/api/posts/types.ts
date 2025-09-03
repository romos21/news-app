import type { Post, PostUpdateAction } from '@/entities/post';
import type { ApiResponse } from '../types';

export type GetPostResponse = ApiResponse<Post>;
export type GetPostRequest = {};

export type GetAllPostsResponse = ApiResponse<Post[]>;

export type UpdatePostResponse = ApiResponse<Post>;

export type UpdatePostRequest = Partial<Post> & {
  action: PostUpdateAction;
};

export type CreatePostResponse = ApiResponse<Post>;
export type CreatePostRequest = Pick<Post, 'userId' | 'title' | 'body'>;

export type DeletePostResponse = ApiResponse<Pick<Post, 'id'>>;
