import type { User } from '@/entities';

export interface SignUpFormValues extends Omit<User, 'id'> {
  password: string;
  passwordRepeat: string;
}
