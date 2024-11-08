import { Router, Request, Response } from 'express';
import { AnalyticsService } from '../services/AnalyticsService';
import { logger } from '../utils/logger';

const router = Router();
const analyticsService = new AnalyticsService();

interface EventRequest {
  eventType: string;
  userId: string;
  metadata: Record<string, any>;
}

// Helper function to handle both types of requests
const handleEventTracking = async (eventData: EventRequest, res: Response) => {
  try {
    await analyticsService.trackEvent(eventData);
    res.status(200).json({ success: true });
  } catch (error) {
    logger.error('Error tracking event:', error);
    res.status(500).json({ error: 'Failed to track event' });
  }
};

// Handle POST requests
router.post('/event', async (req: Request<{}, any, EventRequest>, res: Response) => {
  const event = req.body;
  await handleEventTracking(event, res);
});

// Handle GET requests
router.get('/event', async (req: Request, res: Response) => {
  const { eventType, userId, metadata } = req.query;
  
  if (!eventType || !userId) {
    res.status(400).json({ error: 'Missing required parameters' });
    return;
  }

  const event = {
    eventType: eventType as string,
    userId: userId as string,
    metadata: metadata ? JSON.parse(metadata as string) : {}
  };

  await handleEventTracking(event, res);
});

router.get('/stats', async (req: Request, res: Response) => {
  try {
    const { eventType, days } = req.query;
    if (!eventType || !days) {
      res.status(400).json({ error: 'Missing required parameters' });
      return;
    }
    const stats = await analyticsService.getStats(
      eventType as string, 
      parseInt(days as string, 10)
    );
    res.status(200).json(stats);
  } catch (error) {
    logger.error('Error getting stats:', error);
    res.status(500).json({ error: 'Failed to get stats' });
  }
});

export default router;