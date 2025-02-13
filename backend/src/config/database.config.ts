import { ConnectOptions } from 'mongoose';
import { config } from './env';

export const dbConfig: ConnectOptions = {
  autoIndex: true,
  minPoolSize: 5,
  maxPoolSize: 10,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
};

export const getMongoURI = (): string => {
  const { DATABASE } = config;
  
  if (DATABASE.URL) {
    return DATABASE.URL;
  }

  return `mongodb://${DATABASE.HOST}:${DATABASE.PORT}/${DATABASE.NAME}`;
}; 