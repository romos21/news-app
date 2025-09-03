import * as Yup from 'yup';
import type { UserMutationFormValues } from './types';
import { Gender, UserRoles } from '@/entities/user';
import type { FormField } from '@/features';
import { Input, InputMask, InputPassword, Select } from '@/shared/ui';

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

const GENDER_SELECT_OPTIONS = [
  { label: 'Male', value: Gender.MALE },
  { label: 'Female', value: Gender.FEMALE },
];

const ROLE_SELECT_OPTIONS = [
  { label: 'Admin', value: UserRoles.ADMIN },
  { label: 'User', value: UserRoles.USER },
];

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
    gridProps: { size: { xs: 12, sm: 6 } },
  },
  {
    name: FieldNames.LAST_NAME,
    Component: Input,
    gridProps: { size: { xs: 12, sm: 6 } },
  },
  {
    name: FieldNames.EMAIL,
    Component: Input,
    gridProps: { size: { xs: 12 } },
  },
  {
    name: FieldNames.PHONE,
    Component: InputMask,
    gridProps: { size: { xs: 12 } },
  },
  {
    name: FieldNames.USERNAME,
    Component: Input,
    gridProps: { size: { xs: 12 } },
  },
  {
    name: FieldNames.GENDER,
    Component: (props) => (
      <Select
        {...props}
        options={GENDER_SELECT_OPTIONS}
      />
    ),
    gridProps: { size: { xs: 6 } },
  },
  {
    name: FieldNames.ROLE,
    Component: (props) => (
      <Select
        {...props}
        options={ROLE_SELECT_OPTIONS}
      />
    ),
    gridProps: { size: { xs: 6 } },
  },
  {
    name: FieldNames.BIRTH_DATE,
    Component: InputMask,
    gridProps: { size: { xs: 12 } },
  },
  {
    name: FieldNames.PASSWORD,
    Component: InputPassword,
    gridProps: { size: { xs: 12, md: 6 } },
  },
  {
    name: FieldNames.PASSWORD_REPEAT,
    Component: InputPassword,
    gridProps: { size: { xs: 12, md: 6 } },
  },
];
