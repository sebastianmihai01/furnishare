import React from 'react';
import { Box, Container } from '@mui/material';
import { ProductDetail } from '../components';

const ProductDetailPage = () => (
  <Container>
    <Box mt={4}>
      <ProductDetail />
    </Box>
  </Container>
);

export default ProductDetailPage; 