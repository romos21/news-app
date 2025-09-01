import { createBrowserRouter } from 'react-router';
import {
  AuthLayout,
  SignInPage,
  SignUpPage,
  PostsPage,
  PostPage,
  MePage,
  UsersPage,
  UserPage,
  AdminLayout,
  AppLayout,
} from '@/pages';
import { RoutePath } from '@/shared/constants';

export const router = createBrowserRouter([
  {
    path: RoutePath.AUTH,
    Component: AuthLayout,
    children: [
      { path: RoutePath.SIGN_IN, Component: SignInPage },
      { path: RoutePath.SIGN_UP, Component: SignUpPage },
    ],
  },
  {
    path: RoutePath.APP,
    Component: AppLayout,
    children: [
      {
        path: RoutePath.POSTS,
        children: [
          { index: true, Component: PostsPage },
          { path: ':id', Component: PostPage },
        ],
      },
      { path: RoutePath.ME, Component: MePage },
      {
        path: RoutePath.ADMIN,
        Component: AdminLayout,
        children: [
          {
            path: RoutePath.USERS,
            children: [
              { index: true, Component: UsersPage },
              { path: ':id', Component: UserPage },
            ],
          },
        ],
      },
    ],
  },
]);
