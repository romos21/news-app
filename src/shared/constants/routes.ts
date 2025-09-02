export enum RoutePath {
  ROOT = '',
  AUTH = 'auth',
  SIGN_IN = 'sign-in',
  SIGN_UP = 'sign-up',
  APP = 'app',
  ADMIN = 'admin',
  USERS = 'users',
  POSTS = 'posts',
  ME = 'me',
}

export const PAGE_PATHS = {
  SIGN_IN: `/${RoutePath.AUTH}/${RoutePath.SIGN_IN}`,
  SIGN_UP: `/${RoutePath.AUTH}/${RoutePath.SIGN_UP}`,
  USERS: `/${RoutePath.APP}/${RoutePath.ADMIN}/${RoutePath.USERS}`,
  POSTS: `/${RoutePath.APP}/${RoutePath.POSTS}`,
  ME: `/${RoutePath.APP}/${RoutePath.ME}`,
};
