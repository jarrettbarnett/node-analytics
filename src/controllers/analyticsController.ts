import { Request, Response } from 'express';
import { AnalyticsService } from '../services/AnalyticsService';
import { logger } from '../utils/logger';

export class AnalyticsController {
  private service: AnalyticsService;

  constructor() {
    this.service = new AnalyticsService();
  }

  async trackEvent(req: Request, res: Response): Promise<void> {
    try {
      await this.service.trackEvent(req.body);
      res.status(202).json({ message: 'Event tracked successfully' });
    } catch (error) {
      logger.error('Error in trackEvent controller:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getStats(req: Request, res: Response): Promise<void> {
    try {
      const { eventType, days } = req.query;
      const stats = await this.service.getStats(
        eventType as string,
        parseInt(days as string)
      );
      res.json(stats);
    } catch (error) {
      logger.error('Error in getStats controller:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
} 