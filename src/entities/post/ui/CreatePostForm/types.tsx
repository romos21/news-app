import type { Post } from '../../types';

export type PostMutationFormValues = Pick<Post, 'title' | 'body'>;
