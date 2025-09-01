import type { User } from '@/entities';

export interface SignInFormValues extends Pick<User, 'username'> {
  password: string;
}
