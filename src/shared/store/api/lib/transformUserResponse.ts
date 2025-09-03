import type { User } from '@/entities/user';
import type { ApiResponse } from '../types';

export const transformUserResponse = (res: Record<string, any>): ApiResponse<User> => ({
  id: res.id,
  firstName: res.firstName,
  lastName: res.lastName,
  gender: res.gender,
  email: res.email,
  phone: res.phone,
  username: res.username,
  birthDate: res.birthDate,
  role: res.role,
  image: res.image,
});
