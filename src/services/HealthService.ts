import { RedisService } from './RedisService';
import prisma from '../lib/prisma';
import { logger } from '../utils/logger';

export class HealthService {
  private redis: RedisService;

  constructor() {
    this.redis = RedisService.getInstance();
  }

  async checkHealth() {
    const health = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      services: {
        redis: false,
        database: false
      }
    };

    try {
      // Check Redis
      await this.redis.getClient().ping();
      health.services.redis = true;
    } catch (error) {
      logger.error('Redis health check failed:', error);
    }

    try {
      // Check Database
      await prisma.$queryRaw`SELECT 1`;
      health.services.database = true;
    } catch (error) {
      logger.error('Database health check failed:', error);
    }

    // Overall status
    health.status = Object.values(health.services).every(Boolean) ? 'ok' : 'degraded';

    return health;
  }
} 