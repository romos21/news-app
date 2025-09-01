import type { User } from '@/entities';

export interface UserMutationFormValues extends Omit<User, 'id' | 'image'> {
  password: string;
  passwordRepeat: string;
}
