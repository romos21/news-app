import { useForm as useRHFForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import type { UseForm } from './types';

export const useForm: UseForm = (options) => {
  const { validationSchema, ...restOptions } = options;
  return useRHFForm({
    ...restOptions,
    resolver: yupResolver(validationSchema),
  });
};
