import { createBrowserRouter } from "react-router";
import {
  RootLayout,
  AuthLayout,
  SignInPage,
  SignUpPage,
  PostsPage,
  PostPage,
  SettingsPage,
  UsersPage,
  UserPage
} from "@/pages";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        path: 'posts',
        children: [
          { index: true, Component: PostsPage },
          { path: ":id", Component: PostPage },
        ],
      },
      {
        path: 'users',
        children: [
          { index: true, Component: UsersPage },
          { path: ":id", Component: UserPage },
        ],
      },
      { path: "settings", Component: SettingsPage },
      {
        path: "auth",
        Component: AuthLayout,
        children: [
          { path: "sign-in", Component: SignInPage },
          { path: "sign-up", Component: SignUpPage },
        ],
      },
    ],
  },
]);