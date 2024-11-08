import express from 'express';
import { config } from './config/config';
import { logger } from './utils/logger';

const app = express();

app.use(express.json());

// Add your routes here

const port = config.app.port;

app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});

export default app; 