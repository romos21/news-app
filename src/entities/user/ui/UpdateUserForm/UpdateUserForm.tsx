import { useCallback, useEffect, type FC } from 'react';
import { defaultValues, getFormFields, getValidationSchema } from './formConfig';
import { Button } from '@/shared/ui';
import { useUpdateUserMutation, type UpdateUserResponse } from '@/shared/store/api';
import type { UserMutationFormValues } from './types';
import { Form } from '@/features';
import type { User } from '../../types';
import { useTranslation } from '@/shared/i18n';

interface UpdateUserFormProps {
  user: User;
  onSuccess?: () => void;
}

export const UpdateUserForm: FC<UpdateUserFormProps> = ({ user, onSuccess }) => {
  const [updateUser, { isLoading, isError, isSuccess, data }] = useUpdateUserMutation();
  const { t } = useTranslation(['common', 'user']);

  const onSubmit = useCallback(
    (values: UserMutationFormValues) => {
      updateUser(values);
    },
    [updateUser],
  );

  useEffect(() => {
    isSuccess && onSuccess?.();
  }, [isSuccess, onSuccess]);

  return (
    <Form<UserMutationFormValues, UpdateUserResponse>
      defaultValues={user || defaultValues}
      validationSchema={getValidationSchema(t)}
      formFields={getFormFields(t)}
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
