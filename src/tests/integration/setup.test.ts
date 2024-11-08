import { RedisService } from '../../services/RedisService';
import { PrismaClient } from '@prisma/client';
import { config } from '../../config/config';

describe('Integration Setup Tests', () => {
  let redis: RedisService;
  let prisma: PrismaClient;

  beforeAll(() => {
    redis = RedisService.getInstance();
    prisma = new PrismaClient();
  });

  it('should connect to Redis', async () => {
    const testKey = 'test:connection';
    await redis.getClient().set(testKey, 'working');
    const value = await redis.getClient().get(testKey);
    expect(value).toBe('working');
  });

  it('should connect to PostgreSQL', async () => {
    const result = await prisma.$queryRaw`SELECT 1 as result`;
    expect(result).toBeTruthy();
  });

  afterAll(async () => {
    await prisma.$disconnect();
    await redis.getClient().quit();
  });
}); 