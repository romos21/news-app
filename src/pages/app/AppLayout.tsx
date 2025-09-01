import { PAGE_PATHS } from '@/shared/constants';
import { useAppSelector } from '@/shared/store';
import { type FC } from 'react';
import { Navigate, Outlet } from 'react-router';

export const AppLayout: FC = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={PAGE_PATHS.SIGN_IN} />;
  }
  return <Outlet />;
};
