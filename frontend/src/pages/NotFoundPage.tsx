import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();
  
  return (
    <Box textAlign="center" mt={8}>
      <Typography variant="h1">404</Typography>
      <Typography variant="h5" mb={4}>Page Not Found</Typography>
      <Button variant="contained" onClick={() => navigate('/')}>
        Go Home
      </Button>
    </Box>
  );
};

export default NotFoundPage; 