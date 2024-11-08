import { PrismaClient } from '@prisma/client';
import { logger } from '../utils/logger';

const prisma = new PrismaClient();

async function initDb() {
  try {
    // Test database connection
    await prisma.$connect();
    logger.info('Database connection successful');

    // Run any initialization logic here
    
    await prisma.$disconnect();
    logger.info('Database initialization complete');
    
  } catch (error) {
    logger.error('Database initialization failed:', error);
    process.exit(1);
  }
}

initDb(); 