import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import PrivateRoute from './PrivateRoute';

// Pages
import {
  LandingPage,
  ProductListPage,
  ProductDetailPage,
  CreateProductPage,
  ProfilePage,
  CartPage,
  NotFoundPage
} from '../pages';

const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/browse" element={<ProductListPage />} />
      <Route path="/product/:id" element={<ProductDetailPage />} />
      
      {/* Protected Routes */}
      <Route
        path="/sell"
        element={
          <PrivateRoute>
            <CreateProductPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/cart"
        element={
          <PrivateRoute>
            <CartPage />
          </PrivateRoute>
        }
      />

      {/* Redirect to home if logged in */}
      <Route
        path="/login"
        element={
          isAuthenticated ? <Navigate to="/" replace /> : <LandingPage />
        }
      />

      {/* 404 Route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;