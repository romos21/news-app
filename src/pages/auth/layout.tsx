import { type FC } from 'react';
import { Outlet } from 'react-router';

export const AuthLayout: FC = () => {
  return (
    <div>
      <h1>Auth Layout component</h1>
      <Outlet />
    </div>
  );
};
