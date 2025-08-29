import * as Yup from 'yup';

export enum FormFields {
  LOGIN = 'login',
  PASSWORD = 'password',
}

export const defaultValues = {
  [FormFields.LOGIN]: '',
  [FormFields.PASSWORD]: '',
};

export const validationSchema = Yup.object({
  [FormFields.LOGIN]: Yup.string().required(),
  [FormFields.PASSWORD]: Yup.string().min(8).max(20).required(),
});
