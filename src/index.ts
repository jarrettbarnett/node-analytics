import app from './app';
import { logger } from './utils/logger';
import { config } from './config/config';

const port = config.app.port || 3000;

const server = app.listen(port, () => {
  logger.info(`Server running at http://localhost:${port}`);
});

// Handle server shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    logger.info('HTTP server closed');
  });
}); 