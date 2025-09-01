import type { FC } from 'react';
import { defaultValues, formFields, validationSchema } from './formConfig';
import { Button } from '@/shared/ui';
import { useCreateUserMutation, type CreateUserResponse } from '@/shared/store/api';
import type { SignUpFormValues } from './types';
import { Form } from '@/features';

export const SignUpPage: FC = () => {
  const [signUp, { isLoading, isError, isSuccess, data }] = useCreateUserMutation();

  return (
    <main>
      <h1>Sign Up Page</h1>
      <Form<SignUpFormValues, CreateUserResponse>
        defaultValues={defaultValues}
        validationSchema={validationSchema}
        formFields={formFields}
        onSubmit={signUp}
        isError={isError}
        isLoading={isLoading}
        isSuccess={isSuccess}
        submitResult={data}
        actionAdornment={
          <Button
            type='submit'
            variant='contained'
          >
            Sign Up
          </Button>
        }
      />
    </main>
  );
};
