import * as Yup from 'yup';
import type { CommentMutationFormValues } from './types';
import type { FormField } from '@/features';
import { Input } from '@/shared/ui';

export enum FieldNames {
  BODY = 'body',
}

export const defaultValues: CommentMutationFormValues = {
  [FieldNames.BODY]: '',
};

export const validationSchema = Yup.object({
  [FieldNames.BODY]: Yup.string().required(),
});

export const formFields: FormField<CommentMutationFormValues>[] = [
  {
    name: FieldNames.BODY,
    Component: (props) => (
      <Input
        fullWidth
        multiline
        rows={2}
        {...props}
      />
    ),
  },
];
