import { useCallback, type FC } from 'react';
import { defaultValues, getFormFields, validationSchema } from './formConfig';
import { Button, Container, Typography } from '@/shared/ui';
import { useSignInMutation, type SignInResponse } from '@/shared/store/api';
import type { SignInFormValues } from './types';
import { Form } from '@/features';
import { useTranslation } from '@/shared/i18n';

export const SignInPage: FC = () => {
  const [signIn, { isLoading, isError, isSuccess, data }] = useSignInMutation();
  const { t } = useTranslation(['common', 'signInPage']);

  const onSubmit = useCallback(
    (values: SignInFormValues) => {
      signIn(values);
    },
    [signIn],
  );

  return (
    <Container
      sx={{
        maxWidth: 600,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
      display='flex'
      flexDirection='column'
      justifyContent='space-between'
      alignItems='center'
      rowGap={4}
    >
      <Container
        display='flex'
        flexDirection='column'
        justifyContent='flex-start'
        alignItems='center'
      >
        <Typography variant='h2'>{t('signInPage:title')}</Typography>
        <Typography variant='subtitle1'>{t('signInPage:subtitle')}</Typography>
      </Container>
      <Form<SignInFormValues, SignInResponse>
        defaultValues={defaultValues}
        validationSchema={validationSchema}
        formFields={getFormFields(t)}
        onSubmit={onSubmit}
        isError={isError}
        gridProps={{ spacing: 2 }}
        isSuccess={isSuccess}
        submitResult={data}
        actionAdornment={
          <Button
            type='submit'
            variant='contained'
            size='large'
            sx={{ my: 4, mx: 'auto' }}
            loading={isLoading}
          >
            {t('signInPage:submitBtn')}
          </Button>
        }
      />
    </Container>
  );
};
