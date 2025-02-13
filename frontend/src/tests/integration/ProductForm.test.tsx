import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../state/store';
import ProductForm from '../../components/product/ProductForm/ProductForm';
import { productService } from '../../services/productService';

jest.mock('../../services/productService');

const renderWithProviders = (component: React.ReactNode) => {
  return render(<Provider store={store}>{component}</Provider>);
};

describe('ProductForm Integration', () => {
  it('submits form data correctly', async () => {
    const mockOnSubmit = jest.fn();
    renderWithProviders(<ProductForm onSubmit={mockOnSubmit} />);

    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: 'Test Product' },
    });

    fireEvent.change(screen.getByLabelText(/price/i), {
      target: { value: '99.99' },
    });

    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: 'Test description' },
    });

    fireEvent.click(screen.getByText(/list product/i));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled();
    });
  });
}); 