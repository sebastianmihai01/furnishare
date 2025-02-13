import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../stores/hooks';
import { fetchProducts, createProduct } from '../stores/slices/productSlice';

export const useProducts = (page: number = 1) => {
  const dispatch = useAppDispatch();
  const { items, isLoading, error, pagination } = useAppSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts(page));
  }, [dispatch, page]);

  const handleCreateProduct = useCallback(
    async (productData: FormData) => {
      try {
        await dispatch(createProduct(productData)).unwrap();
      } catch (error) {
        throw error;
      }
    },
    [dispatch]
  );

  return {
    products: items,
    isLoading,
    error,
    pagination,
    createProduct: handleCreateProduct,
  };
}; 