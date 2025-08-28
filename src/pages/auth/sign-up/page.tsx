import type { FC } from 'react';
import { useForm } from '@/shared/formManager';
import * as Yup from 'yup';

enum FormFields {
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
  EMAIL = 'email',
  PHONE = 'phone',
  LOGIN = 'login',
  PASSWORD = 'password',
  PASSWORD_REPEAT = 'passwordRepeat',
}

const defaultValues = {
  [FormFields.FIRST_NAME]: '',
  [FormFields.LAST_NAME]: '',
  [FormFields.EMAIL]: '',
  [FormFields.PHONE]: '',
  [FormFields.LOGIN]: '',
  [FormFields.PASSWORD]: '',
  [FormFields.PASSWORD_REPEAT]: '',
};

const validationSchema = Yup.object({
  [FormFields.FIRST_NAME]: Yup.string().required(),
  [FormFields.LAST_NAME]: Yup.string().required(),
  [FormFields.EMAIL]: Yup.string().email().required(),
  [FormFields.PHONE]: Yup.string().required(),
  [FormFields.LOGIN]: Yup.string().required(),
  [FormFields.PASSWORD]: Yup.string().min(8).max(20).required(),
  [FormFields.PASSWORD_REPEAT]: Yup.string().min(8).max(20).required(),
});

export const SignUpPage: FC = () => {
  const { handleSubmit, register } = useForm({
    defaultValues,
    validationSchema,
  });

  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <main>
      <section>
        <h1>Sign Up Page</h1>
        <form onSubmit={onSubmit}>
          <label>
            First Name
            <input {...register(FormFields.FIRST_NAME)} />
          </label>
          <label>
            Last Name
            <input {...register(FormFields.LAST_NAME)} />
          </label>
          <label>
            Email
            <input {...register(FormFields.EMAIL)} />
          </label>
          <label>
            Phone
            <input {...register(FormFields.PHONE)} />
          </label>
          <label>
            Login
            <input {...register(FormFields.LOGIN)} />
          </label>
          <label>
            Password
            <input
              type='password'
              {...register(FormFields.PASSWORD)}
            />
          </label>
          <label>
            Repeat Password
            <input
              type='password'
              {...register(FormFields.PASSWORD)}
            />
          </label>
          <button type='submit'>sign-in</button>
        </form>
      </section>
    </main>
  );
};
