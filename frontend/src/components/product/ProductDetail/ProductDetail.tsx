import React from 'react';
import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  
  return (
    <Box>
      <Typography variant="h4">Product Details</Typography>
      <Typography>Product ID: {id}</Typography>
    </Box>
  );
};

export default ProductDetail; 