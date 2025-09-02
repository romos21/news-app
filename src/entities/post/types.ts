export interface PostReactions {
  likes: number;
  dislikes: number;
}

export enum PostUpdateAction {
  LIKE = 'like',
  DISLIKE = 'dislike',
  STARRED = 'starred',
}

export interface Post {
  id: number;
  title: string;
  body: string;
  reactions: PostReactions;
  userId: number;
}
