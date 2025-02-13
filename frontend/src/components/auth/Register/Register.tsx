import React from 'react';
import { Box, TextField, Button, Typography, Link } from '@mui/material';
import { useAuth } from '../../../hooks';
import { validateEmail, validatePassword } from '../../../utils/validation';

interface RegisterProps {
  onSuccess?: () => void;
}

const Register: React.FC<RegisterProps> = ({ onSuccess }) => {
  const { register } = useAuth();
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const name = formData.get('name') as string;
    
    if (validateEmail(email) && validatePassword(password)) {
      await register(email, password, name);
      onSuccess?.();
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        label="Full Name"
        name="name"
        autoFocus
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Email Address"
        name="email"
        type="email"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Register
      </Button>
      <Typography align="center">
        Already have an account? <Link href="/login">Sign In</Link>
      </Typography>
    </Box>
  );
};

export default Register; 