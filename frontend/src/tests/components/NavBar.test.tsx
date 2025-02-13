import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../state/store';
import NavBar from '../../components/layout/NavBar/NavBar';

const renderWithProviders = (component: React.ReactNode) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>{component}</BrowserRouter>
    </Provider>
  );
};

describe('NavBar', () => {
  it('renders logo and navigation links', () => {
    renderWithProviders(
      <NavBar 
        onCartClick={() => {}} 
        cartItemCount={0}
      />
    );
    
    // expect(screen.getByText('FurniShare')).toBeInTheDocument();
    // expect(screen.getByText('Browse')).toBeInTheDocument();
    // expect(screen.getByText('Sell')).toBeInTheDocument();
  });

  it('navigates when links are clicked', () => {
    // renderWithProviders(<NavBar />);
    
    fireEvent.click(screen.getByText('Browse'));
    expect(window.location.pathname).toBe('/browse');
  });
}); 