import { useEffect, useState } from 'react';
import { useForm, type FieldValues } from '@/shared/formManager';
import { Toaster, Backdrop } from '@/shared/ui';
import type { ApiResponse } from '@/shared/store/api/types';
import type { FormProps, FormToasterState } from './types';

export const Form = <TFormValues extends FieldValues, TResponse extends ApiResponse>({
  onSubmit,
  actionAdornment,
  validationSchema,
  defaultValues,
  isError,
  isSuccess,
  isLoading,
  submitResult,
  formFields,
}: FormProps<TFormValues, TResponse>) => {
  const [toasterState, setToasterState] = useState<FormToasterState | null>(null);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<TFormValues>({
    defaultValues,
    validationSchema,
  });

  useEffect(() => {
    if (isError && submitResult?.message) {
      setToasterState({ message: submitResult?.message, severity: 'error' });
    }
  }, [isError, submitResult]);

  useEffect(() => {
    if (isSuccess && submitResult?.message) {
      setToasterState({ message: submitResult?.message, severity: 'success' });
    }
  }, [isSuccess, submitResult]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {formFields.map(({ Component, name }) => (
          <Component
            key={name}
            {...register(name)}
            error={errors[name]}
          />
        ))}
        {actionAdornment}
      </form>
      <Backdrop open={!!isLoading} />
      <Toaster severity={toasterState?.severity}>{toasterState?.message}</Toaster>
    </>
  );
};
