import React from 'react';
import { Box, List, ListItem, Typography, Button, Divider } from '@mui/material';
import { formatPrice } from '../../../utils/format';
import { CartItem } from '../../../stores/slices/cartSlice';

interface CartProps {
  items: CartItem[];
  total: number;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ items, total, onClose }) => {
  return (
    <Box sx={{ width: '100%', maxWidth: 360 }}>
      <List>
        {items.map((item) => (
          <ListItem key={item.id}>
            <Box sx={{ width: '100%' }}>
              <Typography variant="subtitle1">{item.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {formatPrice(item.price)} x {item.quantity}
              </Typography>
            </Box>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Typography variant="h6">Total: {formatPrice(total)}</Typography>
        <Button 
          variant="contained" 
          fullWidth 
          sx={{ mt: 2 }}
          onClick={onClose}
        >
          Checkout
        </Button>
      </Box>
    </Box>
  );
};

export default Cart; 