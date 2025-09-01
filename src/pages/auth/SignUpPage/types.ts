import type { User } from '@/models';

export interface SignUpFormValues extends Omit<User, 'id'> {
  password: string;
  passwordRepeat: string;
}
