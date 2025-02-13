import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import ProductCard from '../ProductCard/ProductCard';
import { useNavigate } from 'react-router-dom';

interface Product {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  rating: number;
}

const ProductList: React.FC = () => {
  const navigate = useNavigate();
  // This would typically come from an API or Redux store
  const products: Product[] = [];

  const handleViewDetails = (id: string) => {
    navigate(`/product/${id}`);
  };

  if (products.length === 0) {
    return (
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          No products available
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} key={product.id}>
          <ProductCard
            {...product}
            onViewDetails={handleViewDetails}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList; 