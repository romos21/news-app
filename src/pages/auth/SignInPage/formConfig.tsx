import type { FormField } from '@/features';
import * as Yup from 'yup';
import type { SignInFormValues } from './types';
import { Input, InputPassword } from '@/shared/ui';

export enum FieldNames {
  USERNAME = 'username',
  PASSWORD = 'password',
}

export const defaultValues: SignInFormValues = {
  [FieldNames.USERNAME]: '',
  [FieldNames.PASSWORD]: '',
};

export const validationSchema = Yup.object({
  [FieldNames.USERNAME]: Yup.string().required(),
  [FieldNames.PASSWORD]: Yup.string().min(8).max(20).required(),
});

export const getFormFields = (t: (key: string) => string): FormField<SignInFormValues>[] => [
  {
    name: FieldNames.USERNAME,
    Component: (props) => (
      <Input
        {...props}
        label={t('signInPage:formLabels:username')}
      />
    ),
    gridProps: { size: 12 },
  },
  {
    name: FieldNames.PASSWORD,
    Component: (props) => (
      <InputPassword
        {...props}
        label={t('signInPage:formLabels:password')}
      />
    ),
    gridProps: { size: 12 },
  },
];
