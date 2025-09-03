import * as Yup from 'yup';
import type { UserMutationFormValues } from './types';
import { Gender, UserRoles } from '@/entities/user';
import type { FormField } from '@/features';
import { DatePicker, Input, InputMask, InputPassword, Select } from '@/shared/ui';

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

const getGenderSelectOptions = (t: (key: string) => string) => [
  { label: t('user:gender:male'), value: Gender.MALE },
  { label: t('user:gender:female'), value: Gender.FEMALE },
];

const getRoleSelectOptions = (t: (key: string) => string) => [
  { label: t('user:role:admin'), value: UserRoles.ADMIN },
  { label: t('user:role:user'), value: UserRoles.USER },
];

export const defaultValues: UserMutationFormValues = {
  [FieldNames.FIRST_NAME]: '',
  [FieldNames.LAST_NAME]: '',
  [FieldNames.EMAIL]: '',
  [FieldNames.PHONE]: '',
  [FieldNames.USERNAME]: '',
  [FieldNames.GENDER]: Gender.MALE,
  [FieldNames.BIRTH_DATE]: new Date(),
  [FieldNames.ROLE]: UserRoles.USER,
  [FieldNames.PASSWORD]: '',
  [FieldNames.PASSWORD_REPEAT]: '',
};

export const getValidationSchema = (t: (key: string) => string) =>
  Yup.object({
    [FieldNames.FIRST_NAME]: Yup.string().required(),
    [FieldNames.LAST_NAME]: Yup.string().required(),
    [FieldNames.EMAIL]: Yup.string().email().required(),
    [FieldNames.PHONE]: Yup.string().required(),
    [FieldNames.USERNAME]: Yup.string().required(),
    [FieldNames.GENDER]: Yup.string().oneOf(Object.values(Gender)).required(),
    [FieldNames.BIRTH_DATE]: Yup.date().required(),
    [FieldNames.ROLE]: Yup.string().oneOf(Object.values(UserRoles)),
    [FieldNames.PASSWORD]: Yup.string().min(8).max(20).required(),
    [FieldNames.PASSWORD_REPEAT]: Yup.string()
      .min(8)
      .max(20)
      .required()
      .oneOf([Yup.ref(FieldNames.PASSWORD)], t('signInPage:formErrors:passwordsMustMatch')),
  });

export const getFormFields = (t: (key: string) => string): FormField<UserMutationFormValues>[] => [
  {
    name: FieldNames.FIRST_NAME,
    Component: (props) => (
      <Input
        {...props}
        label={t('user:formLabels:firstName')}
      />
    ),
    gridProps: { size: { xs: 12, sm: 6 } },
  },
  {
    name: FieldNames.LAST_NAME,
    Component: (props) => (
      <Input
        {...props}
        label={t('user:formLabels:lastName')}
      />
    ),
    gridProps: { size: { xs: 12, sm: 6 } },
  },
  {
    name: FieldNames.EMAIL,
    Component: (props) => (
      <Input
        {...props}
        label={t('user:formLabels:email')}
      />
    ),
    gridProps: { size: { xs: 12 } },
  },
  {
    name: FieldNames.PHONE,
    Component: (props) => (
      <InputMask
        {...props}
        label={t('user:formLabels:phone')}
      />
    ),
    gridProps: { size: { xs: 12 } },
  },
  {
    name: FieldNames.USERNAME,
    Component: (props) => (
      <Input
        {...props}
        label={t('user:formLabels:username')}
      />
    ),
    gridProps: { size: { xs: 12 } },
  },
  {
    name: FieldNames.GENDER,
    Component: (props) => (
      <Select
        {...props}
        options={getGenderSelectOptions(t)}
        label={t('user:formLabels:gender')}
      />
    ),
    gridProps: { size: { xs: 6 } },
  },
  {
    name: FieldNames.ROLE,
    Component: (props) => (
      <Select
        {...props}
        options={getRoleSelectOptions(t)}
        label={t('user:formLabels:role')}
      />
    ),
    gridProps: { size: { xs: 6 } },
  },
  {
    name: FieldNames.BIRTH_DATE,
    Component: (props) => (
      <DatePicker
        {...props}
        label={t('user:formLabels:birthDate')}
      />
    ),
    gridProps: { size: { xs: 12 } },
  },
  {
    name: FieldNames.PASSWORD,
    Component: (props) => (
      <InputPassword
        {...props}
        label={t('user:formLabels:password')}
      />
    ),
    gridProps: { size: { xs: 12, md: 6 } },
  },
  {
    name: FieldNames.PASSWORD_REPEAT,
    Component: (props) => (
      <InputPassword
        {...props}
        label={t('user:formLabels:passwordRepeat')}
      />
    ),
    gridProps: { size: { xs: 12, md: 6 } },
  },
];
