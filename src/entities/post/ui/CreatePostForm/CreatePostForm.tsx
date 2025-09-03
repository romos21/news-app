import { memo, useCallback, useEffect, type FC } from 'react';
import { defaultValues, getFormFields, validationSchema } from './formConfig';
import { Button } from '@/shared/ui';
import type { PostMutationFormValues } from './types';
import { Form } from '@/features';
import { useCreatePostMutation, useGetMeQuery, type CreatePostResponse } from '@/shared/store/api';
import { useTranslation } from '@/shared/i18n';

interface CreatePostForm {
  onSuccess?: () => void;
}

export const CreatePostForm: FC<CreatePostForm> = memo(({ onSuccess }) => {
  const { data: me, isLoading: loadingMe, isError: meError } = useGetMeQuery();
  const [createPost, { isLoading: creatingPost, isError: creatingPostError, isSuccess: creatingPostSuccess, data }] =
    useCreatePostMutation();
  const { t } = useTranslation('post');

  const isLoading = loadingMe || creatingPost;
  const isError = meError || creatingPostError;

  useEffect(() => {
    creatingPostSuccess && onSuccess?.();
  }, [creatingPostSuccess, onSuccess]);

  const onSubmit = useCallback(
    (values: PostMutationFormValues) => {
      me?.id && createPost({ ...values, userId: me.id });
    },
    [createPost, me?.id],
  );

  return (
    <Form<PostMutationFormValues, CreatePostResponse>
      defaultValues={defaultValues}
      validationSchema={validationSchema}
      formFields={getFormFields(t)}
      onSubmit={onSubmit}
      isError={isError}
      isLoading={isLoading}
      isSuccess={creatingPostSuccess}
      submitResult={data}
      gridProps={{ spacing: 2 }}
      actionAdornment={
        <Button
          type='submit'
          variant='contained'
        >
          {t('post:createPostForm:submitBtn')}
        </Button>
      }
    />
  );
});
