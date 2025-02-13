import { api } from './api';
import { API_ENDPOINTS } from '../config/constants';

export interface ProductData {
  title: string;
  description: string;
  price: number;
  imageUrl: string;
}

export const productService = {
  getProducts: async (page: number = 1) => {
    const response = await api.get(`${API_ENDPOINTS.PRODUCTS.LIST}?page=${page}`);
    return response.data;
  },

  getProductById: async (id: string) => {
    const response = await api.get(API_ENDPOINTS.PRODUCTS.DETAIL(id));
    return response.data;
  },

  createProduct: async (productData: FormData) => {
    const response = await api.post(API_ENDPOINTS.PRODUCTS.CREATE, productData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  updateProduct: async (id: string, productData: FormData) => {
    const response = await api.put(
      API_ENDPOINTS.PRODUCTS.UPDATE(id),
      productData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
    return response.data;
  },

  deleteProduct: async (id: string) => {
    const response = await api.delete(API_ENDPOINTS.PRODUCTS.DELETE(id));
    return response.data;
  },
}; 