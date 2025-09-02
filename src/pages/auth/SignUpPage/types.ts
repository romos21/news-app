import type { User } from '@/entities/user';

export interface SignUpFormValues extends Omit<User, 'id'> {
  password: string;
  passwordRepeat: string;
}
