import { Router, Request, Response } from 'express';
import { HealthService } from '../services/HealthService';
import { logger } from '../utils/logger';

const router = Router();
const healthService = new HealthService();

// Simple health check
router.get('/', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Detailed health check
router.get('/detailed', async (req: Request, res: Response) => {
  try {
    const health = await healthService.checkHealth();
    const statusCode = health.status === 'ok' ? 200 : 503;
    res.status(statusCode).json(health);
  } catch (error) {
    logger.error('Health check failed:', error);
    res.status(503).json({
      status: 'error',
      timestamp: new Date().toISOString(),
      error: 'Health check failed'
    });
  }
});

export default router; 