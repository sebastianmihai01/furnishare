export {};

interface Config {
  API_URL: string;
  ENV: 'development' | 'production' | 'test';
  AWS_CONFIG: {
    REGION: string;
    S3_BUCKET: string;
    CLOUDFRONT_DOMAIN?: string;
  };
  AUTH: {
    TOKEN_KEY: string;
    REFRESH_TOKEN_KEY: string;
  };
}

const getEnvVar = (key: string): string => {
  const value = process.env[`REACT_APP_${key}`];
  if (!value) {
    console.warn(`Missing environment variable: REACT_APP_${key}`);
    return '';
  }
  return value;
};

export const config: Config = {
  API_URL: getEnvVar('API_URL') || 'http://localhost:8080/api',
  ENV: (getEnvVar('NODE_ENV') || 'development') as Config['ENV'],
  AWS_CONFIG: {
    REGION: getEnvVar('AWS_REGION') || 'us-east-1',
    S3_BUCKET: getEnvVar('S3_BUCKET') || 'furnishare-uploads',
    CLOUDFRONT_DOMAIN: getEnvVar('CLOUDFRONT_DOMAIN'),
  },
  AUTH: {
    TOKEN_KEY: 'furnishare_token',
    REFRESH_TOKEN_KEY: 'furnishare_refresh_token',
  },
};

export const isProduction = config.ENV === 'production';
export const isDevelopment = config.ENV === 'development';
export const isTest = config.ENV === 'test';
