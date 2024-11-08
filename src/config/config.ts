import dotenv from 'dotenv';

dotenv.config();

interface Config {
  app: {
    port: string | number;
    nodeEnv: string;
  };
  redis: {
    host: string;
    port: number;
    password: string | undefined;
  };
  db: {
    url: string | undefined;
  };
  analytics: {
    retentionDays: number;
  };
}

export const config: Config = {
  app: {
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'development'
  },
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
    password: process.env.REDIS_PASSWORD
  },
  db: {
    url: process.env.DATABASE_URL
  },
  analytics: {
    retentionDays: parseInt(process.env.ANALYTICS_RETENTION_DAYS || '30', 10),
  },
};
  