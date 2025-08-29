import type { FC } from 'react';
import { useForm } from '@/shared/formManager';
import { FormFields, defaultValues, validationSchema } from './formConfig';

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
