import type {
  FieldValues as RHFFormValues,
  DefaultValues,
  UseFormReturn,
  FormState as RHFFormState,
  SubmitHandler as RHFSubmitHandler,
  FieldPath as RHFFieldPath,
  UseFormRegisterReturn,
  DeepPartialSkipArrayKey,
  ControllerRenderProps as RHFControllerRenderProps,
} from 'react-hook-form';
import type { ObjectSchema } from 'yup';

export type FieldValues = RHFFormValues;
export type SubmitHandler<T extends FieldValues = FieldValues> = RHFSubmitHandler<T>;
export type FieldPath<T extends FieldValues = FieldValues> = RHFFieldPath<T>;
export type RegisteredFormField = UseFormRegisterReturn;
export type ControllerRenderProps = RHFControllerRenderProps;

export type FormOptions<T extends FieldValues = FieldValues> = {
  defaultValues: DefaultValues<T>;
  validationSchema: ObjectSchema<Partial<T>>;
};

type FormState<T extends FieldValues = FieldValues> = Omit<RHFFormState<T>, 'errors'> & {
  errors: { [k: string]: string | undefined };
};

export type FormReturn<T extends FieldValues = FieldValues> = Omit<UseFormReturn<T>, 'formState'> & {
  formState: FormState<T>;
  values: DeepPartialSkipArrayKey<T>;
};
