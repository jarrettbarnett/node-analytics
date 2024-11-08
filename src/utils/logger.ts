import pino from 'pino';
import { config } from '../config/config';

export const logger = pino({
  level: config.app.environment === 'development' ? 'debug' : 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
}); 