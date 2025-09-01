import type { User } from '../types';

export const getEmptyAvatar = (user: User): string => {
  return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
};
