import { PAGE_PATHS } from '@/shared/constants';
import { useAuthGuard } from '@/shared/store';
import { Container } from '@/shared/ui';
import { type FC } from 'react';
import { Navigate, Outlet } from 'react-router';
import { AppBar } from './ui';

export const AppLayout: FC = () => {
  const isAuthenticated = useAuthGuard();

  if (!isAuthenticated) {
    return <Navigate to={PAGE_PATHS.SIGN_IN} />;
  }
  return (
    <Container>
      <AppBar />
      <Container sx={{ margin: '40px auto', maxWidth: 1400 }}>
        <Outlet />
      </Container>
    </Container>
  );
};
