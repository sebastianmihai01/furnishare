import React, { createContext, useContext, useState, useCallback } from 'react';
import { api } from '../config/api';
import { API_ENDPOINTS } from '../config/constants';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  seller: {
    id: string;
    name: string;
  };
  createdAt: string;
}

interface ProductContextType {
  products: Product[];
  isLoading: boolean;
  error: Error | null;
  fetchProducts: (page?: number) => Promise<void>;
  createProduct: (productData: FormData) => Promise<void>;
  updateProduct: (id: string, productData: FormData) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchProducts = useCallback(async (page = 1) => {
    try {
      setIsLoading(true);
      const response = await api.get(`${API_ENDPOINTS.PRODUCTS.LIST}?page=${page}`);
      setProducts(response.data.products);
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createProduct = useCallback(async (productData: FormData) => {
    try {
      setIsLoading(true);
      const response = await api.post(API_ENDPOINTS.PRODUCTS.CREATE, productData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setProducts((prev) => [response.data.product, ...prev]);
    } catch (error) {
      setError(error as Error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateProduct = useCallback(async (id: string, productData: FormData) => {
    try {
      setIsLoading(true);
      const response = await api.put(API_ENDPOINTS.PRODUCTS.UPDATE(id), productData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setProducts((prev) =>
        prev.map((product) =>
          product.id === id ? response.data.product : product
        )
      );
    } catch (error) {
      setError(error as Error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteProduct = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      await api.delete(API_ENDPOINTS.PRODUCTS.DELETE(id));
      setProducts((prev) => prev.filter((product) => product.id !== id));
    } catch (error) {
      setError(error as Error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        isLoading,
        error,
        fetchProducts,
        createProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}; 