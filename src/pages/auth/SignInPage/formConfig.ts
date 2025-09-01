import type { FormField } from '@/features';
import * as Yup from 'yup';
import type { SignInFormValues } from './types';
import { Input, InputPassword } from '@/shared/ui';

export enum FieldNames {
  USERNAME = 'username',
  PASSWORD = 'password',
}

export const defaultValues = {
  [FieldNames.USERNAME]: 'emilys',
  [FieldNames.PASSWORD]: 'emilyspass',
};

export const validationSchema = Yup.object({
  [FieldNames.USERNAME]: Yup.string().required(),
  [FieldNames.PASSWORD]: Yup.string().min(8).max(20).required(),
});

export const formFields: FormField<SignInFormValues>[] = [
  {
    name: FieldNames.USERNAME,
    Component: Input,
  },
  {
    name: FieldNames.PASSWORD,
    Component: InputPassword,
  },
];
