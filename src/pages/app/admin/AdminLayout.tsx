import { PAGE_PATHS } from '@/shared/constants';
import { useAdminGuard } from '@/shared/store';
import { type FC } from 'react';
import { Navigate, Outlet } from 'react-router';

export const AdminLayout: FC = () => {
  const isAdmin = useAdminGuard();

  if (!isAdmin) {
    return <Navigate to={PAGE_PATHS.POSTS} />;
  }
  return <Outlet />;
};
