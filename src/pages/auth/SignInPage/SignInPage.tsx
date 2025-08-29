import type { FC } from 'react';
import { useForm } from '@/shared/formManager';
import { FormFields, defaultValues, validationSchema } from './formConfig';

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
