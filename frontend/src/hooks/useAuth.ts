import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../stores/hooks';
import { login, register, logout } from '../stores/slices/authSlice';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, isLoading, error } = useAppSelector((state) => state.auth);

  const handleLogin = useCallback(
    async (email: string, password: string) => {
      try {
        await dispatch(login({ email, password })).unwrap();
      } catch (error) {
        throw error;
      }
    },
    [dispatch]
  );

  const handleRegister = useCallback(
    async (email: string, password: string, name: string) => {
      try {
        await dispatch(register({ email, password, name })).unwrap();
      } catch (error) {
        throw error;
      }
    },
    [dispatch]
  );

  const handleLogout = useCallback(async () => {
    await dispatch(logout());
  }, [dispatch]);

  return {
    user,
    isLoading,
    error,
    isAuthenticated: !!user,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
  };
}; 