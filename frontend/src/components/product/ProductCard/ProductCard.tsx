import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../../../utils/format';
import { useCart } from '../../../hooks';

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  description?: string;
  rating: number;
  onViewDetails: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, title, price, imageUrl, description, rating, onViewDetails }) => {
  const navigate = useNavigate();
  const { addItem } = useCart();

  return (
    <Card sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={imageUrl}
        alt={title}
        onClick={() => navigate(`/product/${id}`)}
        sx={{ cursor: 'pointer' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description || 'No description available'}
        </Typography>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" color="primary">
            {formatPrice(price)}
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => addItem({ id, title, price, imageUrl })}
          >
            Add to Cart
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard; 