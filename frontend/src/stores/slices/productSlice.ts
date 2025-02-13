import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../config/api';
import { API_ENDPOINTS } from '../../config/constants';

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

interface ProductsState {
  items: Product[];
  selectedProduct: Product | null;
  isLoading: boolean;
  error: string | null;
  pagination: {
    page: number;
    totalPages: number;
    hasMore: boolean;
  };
}

const initialState: ProductsState = {
  items: [],
  selectedProduct: null,
  isLoading: false,
  error: null,
  pagination: {
    page: 1,
    totalPages: 1,
    hasMore: false,
  },
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (page: number = 1) => {
    const response = await api.get(`${API_ENDPOINTS.PRODUCTS.LIST}?page=${page}`);
    return response.data;
  }
);

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (productData: FormData) => {
    const response = await api.post(API_ENDPOINTS.PRODUCTS.CREATE, productData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.products;
        state.pagination = {
          page: action.payload.page,
          totalPages: action.payload.totalPages,
          hasMore: action.payload.hasMore,
        };
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch products';
      })
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.unshift(action.payload.product);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to create product';
      });
  },
});

export const { setSelectedProduct, clearError } = productSlice.actions;
export default productSlice.reducer; 