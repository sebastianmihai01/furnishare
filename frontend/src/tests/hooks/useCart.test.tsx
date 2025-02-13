import { renderHook, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../stores/store';
import { useCart } from '../../hooks/useCart';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>{children}</Provider>
);

describe('useCart', () => {
  it('should initialize with empty cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.items).toHaveLength(0);
    expect(result.current.totalAmount).toBe(0);
  });

  it('should add item to cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    act(() => {
      result.current.addItem({
        id: '1',
        title: 'Test Item',
        price: 10,
        imageUrl: 'test.jpg'
      });
    });

    expect(result.current.items).toHaveLength(1);
  });
}); 