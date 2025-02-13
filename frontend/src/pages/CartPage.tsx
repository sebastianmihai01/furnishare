import React from 'react';
import { Container } from '@mui/material';
import { Cart } from '../components';
import { useCart } from '../hooks';

const CartPage = () => {
  const { items, totalAmount, removeItem } = useCart();
  
  return (
    <Container>
      <Cart 
        items={items} 
        total={totalAmount} 
        onClose={() => {}}
      />
    </Container>
  );
};

export default CartPage; 