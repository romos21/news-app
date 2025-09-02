import { UserRoles } from '@/entities/user';
import { PAGE_PATHS } from '@/shared/constants';
import { useAppSelector } from '@/shared/store';
import { type FC } from 'react';
import { Navigate, Outlet } from 'react-router';

export const AdminLayout: FC = () => {
  const me = useAppSelector((state) => state.auth.me);

  if (me?.role !== UserRoles.ADMIN) {
    return <Navigate to={PAGE_PATHS.POSTS} />;
  }
  return <Outlet />;
};
