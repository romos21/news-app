import { useEffect, useState } from 'react';
import { useForm, Controller, type FieldValues } from '@/shared/formManager';
import { Toaster, Backdrop, GridContainer } from '@/shared/ui';
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
  gridProps,
}: FormProps<TFormValues, TResponse>) => {
  const [toasterState, setToasterState] = useState<FormToasterState | null>(null);

  const {
    handleSubmit,
    formState: { errors },
    control,
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
        <GridContainer
          container
          {...gridProps}
        >
          {formFields.map(({ Component, name, gridProps }) => (
            <GridContainer
              {...gridProps}
              key={name}
            >
              <Controller
                name={name}
                control={control}
                render={({ field, fieldState }) => (
                  <Component
                    {...field}
                    error={fieldState.error?.message}
                  />
                )}
              />
            </GridContainer>
          ))}
          {actionAdornment}
        </GridContainer>
      </form>
      <Backdrop open={!!isLoading} />
      <Toaster severity={toasterState?.severity}>{toasterState?.message}</Toaster>
    </>
  );
};
