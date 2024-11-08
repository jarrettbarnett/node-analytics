import dotenv from 'dotenv';

dotenv.config();

export const config = {
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379'),
    password: process.env.REDIS_PASSWORD,
  },
  app: {
    port: parseInt(process.env.PORT || '3000'),
    environment: process.env.NODE_ENV || 'development',
  },
  analytics: {
    retentionDays: 90,
    batchSize: 1000,
  },
};
  