import * as Yup from 'yup';
import type { UserMutationFormValues } from './types';
import { Gender, UserRoles } from '@/entities/user';
import type { FormField } from '@/features';
import { Input, InputMask, InputPassword } from '@/shared/ui';

export enum FieldNames {
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
  EMAIL = 'email',
  PHONE = 'phone',
  USERNAME = 'username',
  PASSWORD = 'password',
  PASSWORD_REPEAT = 'passwordRepeat',
  GENDER = 'gender',
  BIRTH_DATE = 'birthDate',
  ROLE = 'role',
}

export const defaultValues: UserMutationFormValues = {
  [FieldNames.FIRST_NAME]: 'awdawdwad',
  [FieldNames.LAST_NAME]: 'awdawdwad',
  [FieldNames.EMAIL]: 'awdawdwad@wad.ad',
  [FieldNames.PHONE]: '1212121212',
  [FieldNames.USERNAME]: '12121saswad',
  [FieldNames.GENDER]: Gender.MALE,
  [FieldNames.BIRTH_DATE]: new Date(),
  [FieldNames.ROLE]: UserRoles.USER,
  [FieldNames.PASSWORD]: '12345678',
  [FieldNames.PASSWORD_REPEAT]: '12345678',
};

export const validationSchema = Yup.object({
  [FieldNames.FIRST_NAME]: Yup.string().required(),
  [FieldNames.LAST_NAME]: Yup.string().required(),
  [FieldNames.EMAIL]: Yup.string().email().required(),
  [FieldNames.PHONE]: Yup.string().required(),
  [FieldNames.USERNAME]: Yup.string().required(),
  [FieldNames.GENDER]: Yup.string().oneOf(Object.values(Gender)).required(),
  [FieldNames.BIRTH_DATE]: Yup.date().required(),
  [FieldNames.ROLE]: Yup.string().oneOf(Object.values(UserRoles)),
  [FieldNames.PASSWORD]: Yup.string().min(8).max(20).required(),
  [FieldNames.PASSWORD_REPEAT]: Yup.string().min(8).max(20).required(),
});

export const formFields: FormField<UserMutationFormValues>[] = [
  {
    name: FieldNames.FIRST_NAME,
    Component: Input,
  },
  {
    name: FieldNames.LAST_NAME,
    Component: Input,
  },
  {
    name: FieldNames.EMAIL,
    Component: Input,
  },
  {
    name: FieldNames.PHONE,
    Component: InputMask,
  },
  {
    name: FieldNames.USERNAME,
    Component: Input,
  },
  {
    name: FieldNames.GENDER,
    Component: InputMask,
  },
  {
    name: FieldNames.BIRTH_DATE,
    Component: InputMask,
  },
  {
    name: FieldNames.ROLE,
    Component: InputMask,
  },
  {
    name: FieldNames.PASSWORD,
    Component: InputPassword,
  },
  {
    name: FieldNames.PASSWORD_REPEAT,
    Component: InputPassword,
  },
];
