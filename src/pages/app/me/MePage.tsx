import { useTranslation } from '@/shared/i18n';
import { useGetMeQuery } from '@/shared/store/api';
import { AbsoluteCircularProgress, Toaster } from '@/shared/ui';
import { lazy, Suspense, type FC } from 'react';

const UserProfile = lazy(async () => {
  const module = await import('@/entities/user');
  return { default: module.UserProfile };
});

export const MePage: FC = () => {
  const { data, isLoading, isError, isSuccess } = useGetMeQuery();
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
        <UserProfile
          isMe
          user={data}
        />
      </Suspense>
    )
  );
};
