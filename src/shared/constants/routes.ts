export enum RoutePath {
  ROOT = '',
  AUTH = 'auth',
  SIGN_IN = 'sign-in',
  APP = 'app',
  ADMIN = 'admin',
  USERS = 'users',
  POSTS = 'posts',
  ME = 'me',
}

export const PAGE_PATHS = {
  SIGN_IN: `/${RoutePath.AUTH}/${RoutePath.SIGN_IN}`,
  USERS: `/${RoutePath.APP}/${RoutePath.ADMIN}/${RoutePath.USERS}`,
  POSTS: `/${RoutePath.APP}/${RoutePath.POSTS}`,
  ME: `/${RoutePath.APP}/${RoutePath.ME}`,
};
