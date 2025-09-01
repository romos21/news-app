import type { User } from '@/models';

export interface SignInFormValues extends Pick<User, 'username'> {
  password: string;
}
