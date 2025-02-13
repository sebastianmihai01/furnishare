import { api } from './api';
import { API_ENDPOINTS } from '../config/constants';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
}

export const authService = {
  login: async (credentials: LoginCredentials) => {
    const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
    return response.data;
  },

  register: async (userData: RegisterData) => {
    const response = await api.post(API_ENDPOINTS.AUTH.REGISTER, userData);
    return response.data;
  },

  logout: async () => {
    const response = await api.post(API_ENDPOINTS.AUTH.LOGOUT);
    return response.data;
  },

  refreshToken: async () => {
    const response = await api.post(API_ENDPOINTS.AUTH.REFRESH_TOKEN);
    return response.data;
  },
}; 