import { ROUTES } from './constants';

export type RouteKeys = keyof typeof ROUTES;
export type RoutePaths = typeof ROUTES[RouteKeys];

export interface BreadcrumbItem {
  label: string;
  path: string;
}

export interface RouteConfig {
  path: RoutePaths;
  breadcrumb: string;
  isProtected: boolean;
}

export const routeConfigs: Record<RouteKeys, RouteConfig> = {
  HOME: {
    path: ROUTES.HOME,
    breadcrumb: 'Home',
    isProtected: false,
  },
  BROWSE: {
    path: ROUTES.BROWSE,
    breadcrumb: 'Browse',
    isProtected: false,
  },
  PRODUCT_DETAIL: {
    path: ROUTES.PRODUCT_DETAIL,
    breadcrumb: 'Product Details',
    isProtected: false,
  },
  CREATE_PRODUCT: {
    path: ROUTES.CREATE_PRODUCT,
    breadcrumb: 'Sell Item',
    isProtected: true,
  },
  PROFILE: {
    path: ROUTES.PROFILE,
    breadcrumb: 'Profile',
    isProtected: true,
  },
  CART: {
    path: ROUTES.CART,
    breadcrumb: 'Shopping Cart',
    isProtected: true,
  },
  LOGIN: {
    path: ROUTES.LOGIN,
    breadcrumb: 'Login',
    isProtected: false,
  },
  REGISTER: {
    path: ROUTES.REGISTER,
    breadcrumb: 'Register',
    isProtected: false,
  },
}; 