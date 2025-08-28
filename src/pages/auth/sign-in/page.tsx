import type { FC } from 'react';
import { useForm } from '@/shared/formManager';
import * as Yup from 'yup';

enum FormFields {
  LOGIN = 'login',
  PASSWORD = 'password',
}

const defaultValues = {
  [FormFields.LOGIN]: '',
  [FormFields.PASSWORD]: '',
};

const validationSchema = Yup.object({
  [FormFields.LOGIN]: Yup.string().required(),
  [FormFields.PASSWORD]: Yup.string().min(8).max(20).required(),
});

export const SignInPage: FC = () => {
  const { handleSubmit, register } = useForm({
    defaultValues,
    validationSchema,
  });

  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <main>
      <section>
        <h1>SignInPage</h1>
        <form onSubmit={onSubmit}>
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
          <button type='submit'>sign-in</button>
        </form>
      </section>
    </main>
  );
};
