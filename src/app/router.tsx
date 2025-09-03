import { createBrowserRouter, Navigate } from 'react-router';
import {
  AuthLayout,
  SignInPage,
  PostsPage,
  PostPage,
  MePage,
  UsersPage,
  UserPage,
  AdminLayout,
  AppLayout,
} from '@/pages';
import { RoutePath, PAGE_PATHS } from '@/shared/constants';

export const router = createBrowserRouter([
  {
    path: RoutePath.ROOT,
    element: (
      <Navigate
        to={PAGE_PATHS.POSTS}
        replace
      />
    ),
  },
  {
    path: RoutePath.AUTH,
    element: <AuthLayout />,
    children: [{ path: RoutePath.SIGN_IN, element: <SignInPage /> }],
  },
  {
    path: RoutePath.APP,
    element: <AppLayout />,
    children: [
      {
        path: RoutePath.POSTS,
        children: [
          { index: true, element: <PostsPage /> },
          { path: ':id', element: <PostPage /> },
        ],
      },
      { path: RoutePath.ME, element: <MePage /> },
      {
        path: RoutePath.ADMIN,
        element: <AdminLayout />,
        children: [
          {
            path: RoutePath.USERS,
            children: [
              { index: true, element: <UsersPage /> },
              { path: ':id', element: <UserPage /> },
            ],
          },
        ],
      },
    ],
  },
]);
