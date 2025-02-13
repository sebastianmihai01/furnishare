import React, { useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import Button from '../Button/Button';
import { uploadToS3 } from '../../services/awsService';

interface ImageUploadProps {
  onUploadSuccess: (imageUrl: string) => void;
  onUploadError: (error: Error) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUploadSuccess, onUploadError }) => {
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const imageUrl = await uploadToS3(file);
      onUploadSuccess(imageUrl);
    } catch (error) {
      onUploadError(error as Error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="image-upload"
        type="file"
        onChange={handleFileSelect}
      />
      <label htmlFor="image-upload">
        <Button
          component="span"
          variant="outlined"
          disabled={uploading}
          sx={{ mt: 2 }}
        >
          {uploading ? (
            <CircularProgress size={24} />
          ) : (
            'Upload Image'
          )}
        </Button>
      </label>
      <Typography variant="caption" display="block" sx={{ mt: 1 }}>
        Supported formats: JPG, PNG (max 5MB)
      </Typography>
    </Box>
  );
};

export default ImageUpload; 