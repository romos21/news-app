import { useCallback, type FC } from 'react';
import { defaultValues, getFormFields, validationSchema } from './formConfig';
import { IconButton } from '@/shared/ui';
import type { CommentMutationFormValues } from './types';
import { Form } from '@/features';
import { useCreateCommentMutation, useGetMeQuery, type CreateCommentResponse } from '@/shared/store/api';
import { Send } from '@/shared/ui/icons';
import { useTranslation } from '@/shared/i18n';

interface CreateCommentFormProps {
  postId: number;
}

export const CreateCommentForm: FC<CreateCommentFormProps> = ({ postId }) => {
  const { data: me, isLoading: loadingMe, isError: meError } = useGetMeQuery();
  const [
    createComment,
    { isLoading: creatingComment, isError: creatingCommentError, isSuccess: creatingCommentSuccess, data },
  ] = useCreateCommentMutation();
  const { t } = useTranslation(['comment']);

  const isLoading = loadingMe || creatingComment;
  const isError = meError || creatingCommentError;

  const onSubmit = useCallback(
    (values: CommentMutationFormValues) => {
      me?.id && createComment({ ...values, userId: me.id, postId });
    },
    [createComment, me?.id, postId],
  );

  return (
    <Form<CommentMutationFormValues, CreateCommentResponse>
      defaultValues={defaultValues}
      validationSchema={validationSchema}
      formFields={getFormFields(t)}
      onSubmit={onSubmit}
      isError={isError}
      isLoading={isLoading}
      isSuccess={creatingCommentSuccess}
      submitResult={data}
      gridProps={{ columnSpacing: 2 }}
      actionAdornment={
        <IconButton type='submit'>
          <Send />
        </IconButton>
      }
    />
  );
};
