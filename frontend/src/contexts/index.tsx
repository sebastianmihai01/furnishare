import React from "react";
import { AuthProvider, useAuth } from "./AuthContext";
import { ThemeProvider as CustomThemeProvider, useTheme } from "./ThemeContext";
import { ProductProvider, useProducts } from "./ProductContext";

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <CustomThemeProvider>
    <AuthProvider>
      <ProductProvider>{children}</ProductProvider>
    </AuthProvider>
  </CustomThemeProvider>
);

export { useAuth, useTheme, useProducts };
