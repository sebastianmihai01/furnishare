import { Location } from 'react-router-dom';

export const getReturnUrl = (location: Location): string => {
  const state = location.state as { from?: Location };
  return state?.from?.pathname || '/';
};

export const isProtectedRoute = (pathname: string): boolean => {
  const protectedPaths = ['/sell', '/profile', '/cart'];
  return protectedPaths.some(path => pathname.startsWith(path));
};

export const isSamePath = (path1: string, path2: string): boolean => {
  return path1.replace(/\/+$/, '') === path2.replace(/\/+$/, '');
}; 