import type { User } from '@/entities/user';

export interface SignInFormValues extends Pick<User, 'username'> {
  password: string;
}
