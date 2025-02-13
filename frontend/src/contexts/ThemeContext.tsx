import React, { createContext, useContext, useState, useCallback } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import { THEME_COLORS } from '../config/constants';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>('light');

  const toggleTheme = useCallback(() => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  }, []);

  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: THEME_COLORS.primary.main,
        light: THEME_COLORS.primary.light,
        dark: THEME_COLORS.primary.dark,
      },
      text: {
        primary: THEME_COLORS.text.primary,
        secondary: THEME_COLORS.text.secondary,
      },
      background: {
        default: mode === 'light' ? THEME_COLORS.secondary.main : '#121212',
        paper: mode === 'light' ? THEME_COLORS.secondary.main : '#1E1E1E',
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
  });

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 