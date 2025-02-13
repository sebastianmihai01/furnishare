import React from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  TextField, 
  Button, 
  Card, 
  CardContent,
  useTheme
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks';
import { validateEmail, validatePassword } from '../utils/validation';

const LandingPage = () => {
  const { isAuthenticated, register } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const name = formData.get('name') as string;

    if (validateEmail(email) && validatePassword(password)) {
      try {
        await register(email, password, name);
        navigate('/browse');
      } catch (error) {
        console.error('Registration failed:', error);
      }
    }
  };

  if (isAuthenticated) {
    navigate('/browse');
    return null;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Grid container spacing={4} alignItems="center">
          {/* Left side - Image */}
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="/furniture-hero.jpg"
              alt="Modern Furniture"
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: 2,
                boxShadow: 3,
              }}
            />
          </Grid>

          {/* Right side - Sign Up Form */}
          <Grid item xs={12} md={6}>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                p: 4,
              }}
            >
              <Typography variant="h4" component="h1" gutterBottom>
                Join Our Furniture Marketplace
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                Buy and sell quality furniture with ease
              </Typography>
              
              <TextField
                required
                fullWidth
                label="Full Name"
                name="name"
                variant="outlined"
              />
              
              <TextField
                required
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                variant="outlined"
              />
              
              <TextField
                required
                fullWidth
                label="Password"
                name="password"
                type="password"
                variant="outlined"
              />
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ mt: 2 }}
              >
                Get Started
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Features Section */}
      <Box sx={{ bgcolor: 'background.paper', py: 8, mt: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" align="center" gutterBottom>
            Why Choose FurniShare?
          </Typography>
          <Grid container spacing={4} sx={{ mt: 4 }}>
            {features.map((feature) => (
              <Grid item xs={12} md={4} key={feature.title}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

const features = [
  {
    title: 'Quality Assurance',
    description: 'All furniture listings are verified for quality and authenticity.',
  },
  {
    title: 'Easy Transactions',
    description: 'Secure payment system and hassle-free buying process.',
  },
  {
    title: 'Local Community',
    description: 'Connect with furniture enthusiasts in your area.',
  },
];

export default LandingPage;