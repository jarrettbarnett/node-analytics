import { RedisService } from './RedisService';
import { PrismaClient } from '@prisma/client';
import { logger } from '../utils/logger';
import { AnalyticsEvent } from '../models/Event';

export class AnalyticsService {
  private redis: RedisService;
  private prisma: PrismaClient;

  constructor() {
    this.redis = RedisService.getInstance();
    this.prisma = new PrismaClient();
  }

  async trackEvent(event: AnalyticsEvent): Promise<void> {
    try {
      const timestamp = Date.now();
      
      // Store in Redis for real-time analytics
      await this.redis.incrementEventCount(event.eventType, timestamp);

      // Store raw event in database for persistence
      await this.prisma.event.create({
        data: {
          eventType: event.eventType,
          userId: event.userId,
          timestamp: new Date(timestamp),
          metadata: event.metadata,
        },
      });
    } catch (error) {
      logger.error('Error tracking event:', error);
      throw error;
    }
  }

  async getStats(eventType: string, days: number): Promise<Record<string, number>> {
    try {
      return await this.redis.getEventStats(eventType, days);
    } catch (error) {
      logger.error('Error getting stats:', error);
      throw error;
    }
  }
} 