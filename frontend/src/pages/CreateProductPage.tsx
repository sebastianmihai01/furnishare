import React from 'react';
import { Container } from '@mui/material';
import { ProductForm } from '../components';

const CreateProductPage = () => (
  <Container>
    <ProductForm onSubmit={console.log} />
  </Container>
);

export default CreateProductPage; 