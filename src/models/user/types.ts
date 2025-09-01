export enum UserRoles {
  ADMIN = 'admin',
  USER = 'user',
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  gender: Gender;
  email: string;
  phone: string;
  username: string;
  birthDate: Date | string;
  role: UserRoles;
}
