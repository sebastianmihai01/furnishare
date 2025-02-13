import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Badge,
} from '@mui/material';
import { ShoppingCart, Person } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface NavBarProps {
  onCartClick: () => void;
  cartItemCount: number;
}

const NavBar: React.FC<NavBarProps> = ({ onCartClick, cartItemCount }) => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" color="transparent" elevation={1}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, color: 'black', cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          FurniShare
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button color="inherit" onClick={() => navigate('/browse')}>
            Browse
          </Button>
          <Button color="inherit" onClick={() => navigate('/sell')}>
            Sell
          </Button>
          <IconButton color="inherit" onClick={onCartClick}>
            <Badge badgeContent={cartItemCount} color="primary">
              <ShoppingCart />
            </Badge>
          </IconButton>
          <IconButton color="inherit" onClick={() => navigate('/profile')}>
            <Person />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar; 