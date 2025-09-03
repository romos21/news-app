import { useCallback, type FC } from 'react';
import { defaultValues, formFields, validationSchema } from './formConfig';
import { Button } from '@/shared/ui';
import { useSignInMutation, type SignInResponse } from '@/shared/store/api';
import type { SignInFormValues } from './types';
import { Form } from '@/features';

export const SignInPage: FC = () => {
  const [signIn, { isLoading, isError, isSuccess, data }] = useSignInMutation();

  const onSubmit = useCallback(
    (values: SignInFormValues) => {
      signIn(values);
    },
    [signIn],
  );

  return (
    <Form<SignInFormValues, SignInResponse>
      defaultValues={defaultValues}
      validationSchema={validationSchema}
      formFields={formFields}
      onSubmit={onSubmit}
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
  );
};
