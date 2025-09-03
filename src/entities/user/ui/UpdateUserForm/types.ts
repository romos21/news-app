import type { User } from '@/entities/user';

export interface UserMutationFormValues extends Omit<User, 'id' | 'image'> {
  password: string;
  passwordRepeat: string;
}
