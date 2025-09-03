import { useTranslation } from '@/shared/i18n';
import { skipToken, useGetUserQuery } from '@/shared/store/api';
import { Toaster, AbsoluteCircularProgress } from '@/shared/ui';
import { lazy, Suspense, type FC } from 'react';
import { useParams } from 'react-router';

const UserProfile = lazy(async () => {
  const module = await import('@/entities/user');
  return { default: module.UserProfile };
});

export const UserPage: FC = () => {
  const { id } = useParams();
  const { data, isLoading, isError, isSuccess } = useGetUserQuery(id ?? skipToken);
  const { t } = useTranslation(['common']);

  if (isLoading) {
    return <AbsoluteCircularProgress />;
  }
  if (isError) {
    return <Toaster severity='error'>{t('common:oops')}</Toaster>;
  }
  return (
    isSuccess && (
      <Suspense fallback={<AbsoluteCircularProgress />}>
        <UserProfile user={data} />
      </Suspense>
    )
  );
};
