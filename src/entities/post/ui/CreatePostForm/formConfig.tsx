import * as Yup from 'yup';
import type { PostMutationFormValues } from './types';
import type { FormField } from '@/features';
import { Input } from '@/shared/ui';

export enum FieldNames {
  TITLE = 'title',
  BODY = 'body',
}

export const defaultValues: PostMutationFormValues = {
  [FieldNames.TITLE]: '',
  [FieldNames.BODY]: '',
};

export const validationSchema = Yup.object({
  [FieldNames.TITLE]: Yup.string().required(),
  [FieldNames.BODY]: Yup.string().required(),
});

export const formFields: FormField<PostMutationFormValues>[] = [
  {
    name: FieldNames.TITLE,
    Component: (props) => (
      <Input
        fullWidth
        label={'Title'}
        {...props}
      />
    ),
    gridProps: { size: 12 },
  },
  {
    name: FieldNames.BODY,
    Component: (props) => (
      <Input
        fullWidth
        multiline
        rows={2}
        label={'Post Content'}
        {...props}
      />
    ),
    gridProps: { size: 12 },
  },
];
