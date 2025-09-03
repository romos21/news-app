import { useCallback, type FC } from 'react';
import { defaultValues, formFields, validationSchema } from './formConfig';
import { Button } from '@/shared/ui';
import { useCreateUserMutation, type CreateUserResponse } from '@/shared/store/api';
import type { UserMutationFormValues } from './types';
import { Form } from '@/features';

export const CreateUserForm: FC = () => {
  const [createUser, { isLoading, isError, isSuccess, data }] = useCreateUserMutation();

  const onSubmit = useCallback(
    (values: UserMutationFormValues) => {
      createUser(values);
    },
    [createUser],
  );

  return (
    <Form<UserMutationFormValues, CreateUserResponse>
      defaultValues={defaultValues}
      validationSchema={validationSchema}
      formFields={formFields}
      onSubmit={onSubmit}
      gridProps={{ spacing: 2 }}
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
