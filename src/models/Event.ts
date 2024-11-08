export interface AnalyticsEvent {
  eventId?: string;
  eventType: string;
  userId?: string;
  timestamp?: number;
  metadata: Record<string, any>;
}

export interface EventStats {
  date: string;
  count: number;
}