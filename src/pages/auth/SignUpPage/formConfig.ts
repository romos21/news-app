import * as Yup from 'yup';

export enum FormFields {
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
  EMAIL = 'email',
  PHONE = 'phone',
  LOGIN = 'login',
  PASSWORD = 'password',
  PASSWORD_REPEAT = 'passwordRepeat',
}

export const defaultValues = {
  [FormFields.FIRST_NAME]: '',
  [FormFields.LAST_NAME]: '',
  [FormFields.EMAIL]: '',
  [FormFields.PHONE]: '',
  [FormFields.LOGIN]: '',
  [FormFields.PASSWORD]: '',
  [FormFields.PASSWORD_REPEAT]: '',
};

export const validationSchema = Yup.object({
  [FormFields.FIRST_NAME]: Yup.string().required(),
  [FormFields.LAST_NAME]: Yup.string().required(),
  [FormFields.EMAIL]: Yup.string().email().required(),
  [FormFields.PHONE]: Yup.string().required(),
  [FormFields.LOGIN]: Yup.string().required(),
  [FormFields.PASSWORD]: Yup.string().min(8).max(20).required(),
  [FormFields.PASSWORD_REPEAT]: Yup.string().min(8).max(20).required(),
});
