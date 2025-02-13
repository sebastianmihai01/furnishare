import { useState, useCallback } from 'react';
import { uploadToS3 } from '../services/awsService';

export const useImageUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const uploadImage = useCallback(async (file: File) => {
    try {
      setIsUploading(true);
      setError(null);
      const imageUrl = await uploadToS3(file);
      return imageUrl;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsUploading(false);
    }
  }, []);

  return {
    isUploading,
    error,
    uploadImage,
  };
}; 