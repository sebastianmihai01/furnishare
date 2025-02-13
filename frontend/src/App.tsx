import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter } from 'react-router-dom';
import { theme } from './theme/theme';
import { store, persistor } from './stores/store';
import { AppProviders } from './contexts';
import AppRoutes from './routes/AppRoutes';
import ErrorBoundary from './Errors/ErrorBoundary';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <AppProviders>
              <CssBaseline />
              <ErrorBoundary>
                <AppRoutes />
              </ErrorBoundary>
            </AppProviders>
          </BrowserRouter>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;