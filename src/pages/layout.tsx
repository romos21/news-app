import { type FC } from 'react';
import { Outlet } from 'react-router';

export const RootLayout: FC = () => {
  return (
    <div>
      <h1>Root component</h1>
      <Outlet />
    </div>
  );
};
