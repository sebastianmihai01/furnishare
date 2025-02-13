import dotenv from "dotenv";

dotenv.config();

interface Config {
  NODE_ENV: 'development' | 'production' | 'test';
  PORT: number;
  DATABASE: {
    URL: string;
    NAME: string;
    HOST: string;
    PORT: number;
  };
  JWT: {
    SECRET: string;
    REFRESH_SECRET: string;
  };
  AWS: {
    REGION: string;
    BUCKET_NAME: string;
    ACCESS_KEY: string;
    SECRET_KEY: string;
  };
  CORS: {
    ORIGIN: string[];
    CREDENTIALS: boolean;
  };
}

export const config: Config = {
  NODE_ENV: (process.env.NODE_ENV as Config['NODE_ENV']) || 'development',
  PORT: parseInt(process.env.PORT || '5000', 10),
  DATABASE: {
    URL: process.env.MONGODB_URI || 'mongodb://localhost:27017/furnishare',
    NAME: process.env.DB_NAME || 'furnishare',
    HOST: process.env.DB_HOST || 'localhost',
    PORT: parseInt(process.env.DB_PORT || '27017', 10),
  },
  JWT: {
    SECRET: process.env.JWT_SECRET || 'your_jwt_secret',
    REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'your_refresh_secret',
  },
  AWS: {
    REGION: process.env.AWS_REGION || 'us-east-1',
    BUCKET_NAME: process.env.AWS_BUCKET_NAME || 'furnishare-uploads',
    ACCESS_KEY: process.env.AWS_ACCESS_KEY_ID || '',
    SECRET_KEY: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
  CORS: {
    ORIGIN: (process.env.CORS_ORIGIN || 'http://localhost:3000').split(','),
    CREDENTIALS: true,
  },
};

export default config;
