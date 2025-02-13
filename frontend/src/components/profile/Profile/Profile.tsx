import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { useAuth } from '../../../hooks';

const Profile: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>Profile</Typography>
        <Typography>Email: {user?.email}</Typography>
      </CardContent>
    </Card>
  );
};

export default Profile; 