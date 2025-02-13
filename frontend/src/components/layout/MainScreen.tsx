import React, { useState } from 'react';
import { Container, Grid } from '@mui/material';
import NavBar from './NavBar/NavBar';
import ProductList from '../product/ProductList/ProductList';
import { useCart } from '../../hooks';

const MainScreen: React.FC = () => {
  const { items } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <NavBar 
        onCartClick={() => setIsCartOpen(true)}
        cartItemCount={items.length}
      />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          <ProductList />
        </Grid>
      </Container>
    </>
  );
};

export default MainScreen; 