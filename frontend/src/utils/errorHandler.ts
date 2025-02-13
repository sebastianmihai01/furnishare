import { BaseError } from '../Errors/BaseError';

interface ErrorResponse {
  message: string;
  code?: string;
  status?: number;
}

export const handleApiError = (error: any): ErrorResponse => {
  if (error instanceof BaseError) {
    return {
      message: error.description,
      code: error.name,
      status: error.statusCode,
    };
  }

  if (error.response) {
    return {
      message: error.response.data.message || 'An error occurred',
      status: error.response.status,
    };
  }

  if (error.request) {
    return {
      message: 'No response received from server',
      code: 'NETWORK_ERROR',
    };
  }

  return {
    message: error.message || 'An unexpected error occurred',
    code: 'UNKNOWN_ERROR',
  };
}; 