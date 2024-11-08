import IORedis, { Redis } from 'ioredis';
import { logger } from '../utils/logger';
import { config } from '../config/config';

export class RedisService {
  private static instance: RedisService;
  private client: Redis;

  private constructor() {
    this.client = new IORedis({
      host: config.redis.host,
      port: config.redis.port,
      password: config.redis.password,
      retryStrategy: (times) => {
        return Math.min(times * 50, 2000);
      },
    });

    this.client.on('error', (err) => {
      logger.error('Redis error:', err);
    });
  }

  public static getInstance(): RedisService {
    if (!RedisService.instance) {
      RedisService.instance = new RedisService();
    }
    return RedisService.instance;
  }

  public getClient(): Redis {
    return this.client;
  }

  async incrementEventCount(eventType: string, timestamp: number): Promise<void> {
    const dayKey = this.getDayKey(eventType, timestamp);
    const hourKey = this.getHourKey(eventType, timestamp);

    try {
      await this.client.pipeline()
        .incr(dayKey)
        .expire(dayKey, config.analytics.retentionDays * 24 * 60 * 60)
        .incr(hourKey)
        .expire(hourKey, config.analytics.retentionDays * 24 * 60 * 60)
        .exec();
    } catch (error) {
      logger.error('Error incrementing event count:', error);
      throw error;
    }
  }

  async getEventStats(eventType: string, days: number): Promise<Record<string, number>> {
    const end = Date.now();
    const start = end - (days * 24 * 60 * 60 * 1000);
    const keys = [];

    for (let d = start; d <= end; d += 86400000) {
      keys.push(this.getDayKey(eventType, d));
    }

    try {
      const counts = await this.client.mget(keys);
      return keys.reduce((acc, key, index) => {
        const date = key.split(':')[3];
        acc[date] = parseInt(counts[index] || '0');
        return acc;
      }, {} as Record<string, number>);
    } catch (error) {
      logger.error('Error getting event stats:', error);
      throw error;
    }
  }

  private getDayKey(eventType: string, timestamp: number): string {
    const date = new Date(timestamp).toISOString().split('T')[0];
    return `analytics:daily:${eventType}:${date}`;
  }

  private getHourKey(eventType: string, timestamp: number): string {
    const date = new Date(timestamp);
    const hourKey = `${date.toISOString().split('T')[0]}:${date.getUTCHours()}`;
    return `analytics:hourly:${eventType}:${hourKey}`;
  }

  async quit(): Promise<void> {
    await this.client.quit();
  }
} 