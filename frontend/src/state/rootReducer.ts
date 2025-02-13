import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../stores/slices/authSlice';
import productReducer from '../stores/slices/productSlice';
import cartReducer from '../stores/slices/cartSlice';
import uiReducer from '../stores/slices/uiSlice';

export const rootReducer = combineReducers({
  auth: authReducer,
  products: productReducer,
  cart: cartReducer,
  ui: uiReducer,
}); 