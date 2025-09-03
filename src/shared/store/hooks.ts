import { UserRoles } from '@/entities/user';
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import type { AppDispatch, RootState } from './types';

export const useAppDispatch = useDispatch<AppDispatch>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAdminGuard = () => {
  return useAppSelector((state) => state.auth.me?.role === UserRoles.ADMIN);
};

export const useAuthGuard = () => {
  return useAppSelector((state) => state.auth.isAuthenticated);
};
