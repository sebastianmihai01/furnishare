import React, { useState } from 'react';
import { Container, Grid } from '@mui/material';
import NavBar from './layout/NavBar/NavBar';
import ProductList from './product/ProductList/ProductList';
import Cart from './cart/Cart/Cart';
import Modal from './ui/Modal/Modal';
import { useCart } from '../hooks';

const MainScreen: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { items, totalAmount } = useCart();

  const handleCartOpen = () => {
    setIsCartOpen(true);
  };

  const handleCartClose = () => {
    setIsCartOpen(false);
  };

  return (
    <>
      <NavBar onCartClick={handleCartOpen} cartItemCount={items.length} />
      
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <ProductList />
          </Grid>
        </Grid>
      </Container>

      <Modal
        open={isCartOpen}
        onClose={handleCartClose}
        title="Shopping Cart"
      >
        <Cart 
          items={items}
          total={totalAmount}
          onClose={handleCartClose}
        />
      </Modal>
    </>
  );
};

export default MainScreen;
