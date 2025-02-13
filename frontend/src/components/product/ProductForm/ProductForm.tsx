import React from 'react';
import {
  Box,
  TextField,
  Button,
  Grid,
  Typography,
} from '@mui/material';
import ImageUpload from '../../ImageUpload/ImageUpload';
import { APP_CONFIG } from '../../../config/constants';

interface ProductFormProps {
  onSubmit: (data: FormData) => void;
  isLoading?: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit, isLoading }) => {
  const [imageUrl, setImageUrl] = React.useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.append('imageUrl', imageUrl);
    onSubmit(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6">Product Details</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Title"
            name="title"
            inputProps={{ maxLength: APP_CONFIG.PRODUCT.MAX_TITLE_LENGTH }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            multiline
            rows={4}
            label="Description"
            name="description"
            inputProps={{ maxLength: APP_CONFIG.PRODUCT.MAX_DESCRIPTION_LENGTH }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            type="number"
            label="Price"
            name="price"
            inputProps={{
              min: APP_CONFIG.PRODUCT.MIN_PRICE,
              max: APP_CONFIG.PRODUCT.MAX_PRICE,
              step: '0.01'
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <ImageUpload
            onUploadSuccess={(url: string) => setImageUrl(url)}
            onUploadError={(error: Error) => console.error('Upload failed:', error.message)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'List Product'}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductForm; 