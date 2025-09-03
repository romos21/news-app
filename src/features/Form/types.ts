import type { FC, ReactNode } from 'react';
import type { FieldPath, FieldValues, FormOptions, ControllerRenderProps } from '@/shared/formManager';
import type { GridProps, ToasterSeverity } from '@/shared/ui';
import type { ApiResponse } from '@/shared/store/api/types';

export type FormFieldComponent<TValue = any> = FC<ControllerRenderProps & { error?: string; value: TValue }>;

export type FormField<TFormValues extends FieldValues> = {
  name: FieldPath<TFormValues>;
  Component: FormFieldComponent;
  gridProps?: GridProps;
};

export type FormProps<TFormValues extends FieldValues, TResponse extends ApiResponse> = FormOptions<TFormValues> & {
  isError?: boolean;
  isSuccess?: boolean;
  isLoading?: boolean;
  submitResult: TResponse | undefined;
  actionAdornment?: ReactNode;
  onSubmit: (values: TFormValues) => void;
  formFields: FormField<TFormValues>[];
  gridProps?: GridProps;
};

export type FormToasterState = { message: string; severity: ToasterSeverity };
