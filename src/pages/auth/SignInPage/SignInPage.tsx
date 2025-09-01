import { useEffect, type FC } from 'react';
import { useNavigate } from 'react-router';
import { defaultValues, formFields, validationSchema } from './formConfig';
import { Button } from '@/shared/ui';
import { useSignInMutation, type SignInResponse } from '@/shared/store/api';
import type { SignInFormValues } from './types';
import { Form } from '@/features';
import { PAGE_PATHS } from '@/shared/constants';

export const SignInPage: FC = () => {
  const [signIn, { isLoading, isError, isSuccess, data }] = useSignInMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      navigate(PAGE_PATHS.ME);
    }
  }, [isSuccess]);

  return (
    <main>
      <h1>Sign In Page</h1>
      <Form<SignInFormValues, SignInResponse>
        defaultValues={defaultValues}
        validationSchema={validationSchema}
        formFields={formFields}
        onSubmit={signIn}
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
