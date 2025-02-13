export const ROUTES = {
  HOME: '/',
  BROWSE: '/browse',
  PRODUCT_DETAIL: '/product/:id',
  CREATE_PRODUCT: '/sell',
  PROFILE: '/profile',
  CART: '/cart',
  LOGIN: '/login',
  REGISTER: '/register',
} as const;

// Helper function to generate product detail route
export const getProductDetailRoute = (id: string) => `/product/${id}`; 