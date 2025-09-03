import { useCallback, type FC } from 'react';
import { defaultValues, formFields, validationSchema } from './formConfig';
import { Button } from '@/shared/ui';
import type { CommentMutationFormValues } from './types';
import { Form } from '@/features';
import { useCreateCommentMutation, useGetMeQuery, type CreateCommentResponse } from '@/shared/store/api';

interface CreateCommentFormProps {
  postId: number;
}

export const CreateCommentForm: FC<CreateCommentFormProps> = ({ postId }) => {
  const { data: me, isLoading: loadingMe, isError: meError } = useGetMeQuery();
  const [
    createComment,
    { isLoading: creatingComment, isError: creatingCommentError, isSuccess: creatingCommentSuccess, data },
  ] = useCreateCommentMutation();

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
      formFields={formFields}
      onSubmit={onSubmit}
      isError={isError}
      isLoading={isLoading}
      isSuccess={creatingCommentSuccess}
      submitResult={data}
      gridProps={{ columnSpacing: 2 }}
      actionAdornment={
        <Button
          type='submit'
          variant='contained'
        >
          Post Comment
        </Button>
      }
    />
  );
};
