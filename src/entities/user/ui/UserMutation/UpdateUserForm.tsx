import type { FC } from 'react';
import { defaultValues, formFields, validationSchema } from './formConfig';
import { Button } from '@/shared/ui';
import { skipToken, useGetUserQuery, useUpdateUserMutation, type UpdateUserResponse } from '@/shared/store/api';
import type { UserMutationFormValues } from './types';
import { Form } from '@/features';
import { useParams } from 'react-router';

export const UpdateUserForm: FC = () => {
  const { id } = useParams();
  const [updateUser, { isLoading: isUpdating, isError: isUpdatingError, isSuccess, data }] = useUpdateUserMutation();

  const { data: userData, isLoading: isDataLoading, isError: isDataLoadingError } = useGetUserQuery(id ?? skipToken);

  return (
    <Form<UserMutationFormValues, UpdateUserResponse>
      defaultValues={userData || defaultValues}
      validationSchema={validationSchema}
      formFields={formFields}
      onSubmit={updateUser}
      isError={isDataLoadingError || isUpdatingError}
      isLoading={isDataLoading || isUpdating}
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
