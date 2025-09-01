import type { User } from '../types';

export const getFullName = (user: User): string => {
  return `${user.firstName} ${user.lastName}`;
};
