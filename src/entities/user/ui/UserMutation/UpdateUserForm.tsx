import { useCallback, type FC } from 'react';
import { defaultValues, formFields, validationSchema } from './formConfig';
import { Button } from '@/shared/ui';
import { useUpdateUserMutation, type UpdateUserResponse } from '@/shared/store/api';
import type { UserMutationFormValues } from './types';
import { Form } from '@/features';
import type { User } from '../../types';

interface UpdateUserFormProps {
  user: User;
}

export const UpdateUserForm: FC<UpdateUserFormProps> = ({ user }) => {
  const [updateUser, { isLoading, isError, isSuccess, data }] = useUpdateUserMutation();

  const onSubmit = useCallback(
    (values: UserMutationFormValues) => {
      updateUser(values);
    },
    [updateUser],
  );

  return (
    <Form<UserMutationFormValues, UpdateUserResponse>
      defaultValues={user || defaultValues}
      validationSchema={validationSchema}
      formFields={formFields}
      gridProps={{ spacing: 2 }}
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
          Save
        </Button>
      }
    />
  );
};
