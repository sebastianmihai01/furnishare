import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Rating,
} from '@mui/material';
import Button from '../Button/Button';

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  rating?: number;
  onViewDetails: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  price,
  imageUrl,
  rating = 0,
  onViewDetails,
}) => {
  return (
    <Card sx={{ maxWidth: 345, borderRadius: 2 }}>
      <CardMedia
        component="img"
        height="200"
        image={imageUrl}
        alt={title}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" color="text.primary">
          {title}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" color="primary">
            ${price.toFixed(2)}
          </Typography>
          <Rating value={rating} readOnly precision={0.5} />
        </Box>
        <Button
          fullWidth
          onClick={() => onViewDetails(id)}
          sx={{ mt: 1 }}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard; 