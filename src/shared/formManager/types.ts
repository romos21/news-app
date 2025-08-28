import type { FieldValues, UseFormProps, UseFormReturn } from 'react-hook-form';
import type { ObjectSchema } from 'yup';

export type Options = Omit<UseFormProps, 'resolver'> & {
  validationSchema: ObjectSchema<FieldValues, any, FieldValues, any>;
};

export type UseForm = (options: Options) => UseFormReturn;
