import { Request as ExpressRequest } from 'express';
import { AnalyticsEvent } from '../analytics';

declare global {
  namespace Express {
    export interface Request extends ExpressRequest {
      body: AnalyticsEvent;
    }
  }
} 