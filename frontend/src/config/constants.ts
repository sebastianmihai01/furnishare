export {};

export const APP_CONFIG = {
  APP_NAME: 'FurniShare',
  API_VERSION: 'v1',
  IMAGE_UPLOAD: {
    MAX_SIZE: 5 * 1024 * 1024, // 5MB
    ACCEPTED_TYPES: ['image/jpeg', 'image/png'],
    ASPECT_RATIO: 4 / 3,
  },
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 12,
    MAX_PAGE_SIZE: 48,
  },
  PRODUCT: {
    MIN_PRICE: 0,
    MAX_PRICE: 100000,
    MAX_TITLE_LENGTH: 100,
    MAX_DESCRIPTION_LENGTH: 1000,
  },
};

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh-token',
  },
  PRODUCTS: {
    LIST: '/products',
    DETAIL: (id: string) => `/products/${id}`,
    CREATE: '/products',
    UPDATE: (id: string) => `/products/${id}`,
    DELETE: (id: string) => `/products/${id}`,
    UPLOAD_IMAGE: '/products/upload-image',
  },
  USER: {
    PROFILE: '/user/profile',
    LISTINGS: '/user/listings',
    FAVORITES: '/user/favorites',
  },
};

export const AWS_CONFIG = {
  REGION: process.env.REACT_APP_AWS_REGION || 'us-east-1',
  S3: {
    BUCKET_NAME: process.env.REACT_APP_S3_BUCKET || 'furnishare-uploads',
    IMAGE_PATH: 'product-images/',
  },
  CLOUDFRONT: {
    DOMAIN: process.env.REACT_APP_CLOUDFRONT_DOMAIN,
  },
};

export const THEME_COLORS = {
  primary: {
    main: '#FF6B00', // Orange
    light: '#FF8533',
    dark: '#CC5500',
  },
  secondary: {
    main: '#FFFFFF', // White
    dark: '#F5F5F5',
  },
  text: {
    primary: '#000000',
    secondary: '#666666',
  },
  error: '#FF3B30',
  success: '#34C759',
  warning: '#FF9500',
};
