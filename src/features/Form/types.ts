import type { FC, ReactNode } from 'react';
import type { FieldPath, FieldValues, FormOptions, RegisteredFormField, SubmitHandler } from '@/shared/formManager';
import type { ToasterSeverity } from '@/shared/ui';
import type { ApiResponse } from '@/shared/store/api/types';

export type FormField<TFormValues extends FieldValues> = {
  name: FieldPath<TFormValues>;
  Component: FC<RegisteredFormField & { error?: string }>;
};

export type FormProps<TFormValues extends FieldValues, TResponse extends ApiResponse> = FormOptions<TFormValues> & {
  isError?: boolean;
  isSuccess?: boolean;
  isLoading?: boolean;
  submitResult: TResponse | undefined;
  actionAdornment?: ReactNode;
  onSubmit: (values: TFormValues) => void;
  formFields: FormField<TFormValues>[];
};

export type FormToasterState = { message: string; severity: ToasterSeverity };
