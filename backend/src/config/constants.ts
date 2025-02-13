export const CONSTANTS = {
  API: {
    PREFIX: '/api',
    VERSION: 'v1',
    ROUTES: {
      AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        LOGOUT: '/auth/logout',
        REFRESH_TOKEN: '/auth/refresh-token',
      },
      PRODUCTS: {
        ROOT: '/products',
        DETAIL: (id: string) => `/products/${id}`,
        UPLOAD: '/products/upload',
      },
      USERS: {
        PROFILE: '/users/profile',
        LISTINGS: '/users/listings',
      },
      CART: {
        ROOT: '/cart',
        ADD: '/cart/add',
        REMOVE: (id: string) => `/cart/${id}`,
        CLEAR: '/cart/clear',
      },
    },
  },
  AUTH: {
    TOKEN_EXPIRY: '30d',
    REFRESH_TOKEN_EXPIRY: '7d',
    SALT_ROUNDS: 10,
  },
  PAGINATION: {
    DEFAULT_LIMIT: 12,
    MAX_LIMIT: 50,
  },
  UPLOAD: {
    MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
    ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  },
};
