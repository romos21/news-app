import { useForm as useRHFForm, useWatch, type Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import type { FieldValues, FormOptions, FormReturn } from './types';

export const useForm = <T extends FieldValues>(options: FormOptions<T>): FormReturn<T> => {
  const { validationSchema, ...restOptions } = options;

  const form = useRHFForm<T>({
    ...restOptions,
    resolver: yupResolver(validationSchema) as unknown as Resolver<T>,
  });

  const values = useWatch({ control: form.control });

  const formattedErrors = Object.fromEntries(
    Object.entries(form.formState.errors).map(([key, error]) => [
      key,
      typeof error?.message === 'string' ? error.message : undefined,
    ]),
  );

  return {
    ...form,
    formState: {
      ...form.formState,
      errors: formattedErrors,
    },
    values,
  };
};
