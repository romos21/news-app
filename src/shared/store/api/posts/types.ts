import type { ApiResponse } from '../types';

export interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
  views: number;
  userId: number;
}

export type GetPostResponse = ApiResponse<Post>;
export type GetPostRequest = {};

export type GetAllPostsResponse = ApiResponse<Post[]>;
export type GetAllPostsRequest = {};

export type UpdatePostResponse = ApiResponse<Post>;
export type UpdatePostRequest = Partial<Post>;

export type CreatePostResponse = ApiResponse<Post>;
export type CreatePostRequest = Post;

export type DeletePostResponse = ApiResponse<Pick<Post, 'id'>>;
