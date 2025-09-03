import { PAGE_PATHS } from '@/shared/constants';
import { useAuthGuard } from '@/shared/store';
import { type FC } from 'react';
import { Navigate, Outlet } from 'react-router';

export const AuthLayout: FC = () => {
  const isAuthenticated = useAuthGuard();

  if (isAuthenticated) {
    return <Navigate to={PAGE_PATHS.ME} />;
  }
  return <Outlet />;
};
