import React, { useState } from 'react';
import NavBar from '../components/layout/NavBar/NavBar';
import Footer from '../components/layout/Footer';
import { Box, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Notifications } from '../components/ui/Notifications';
import { useNotifications, useCart } from '../hooks';

const MainLayout: React.FC = () => {
  const { notifications } = useNotifications();
  const { items } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: 'background.default',
      }}
    >
      <NavBar 
        onCartClick={() => setIsCartOpen(true)}
        cartItemCount={items.length}
      />
      <Container
        component="main"
        maxWidth="lg"
        sx={{
          flexGrow: 1,
          py: 4,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Outlet />
      </Container>
      <Footer />
      <Notifications notifications={notifications} />
    </Box>
  );
};

export default MainLayout;