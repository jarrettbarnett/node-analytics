export interface AnalyticsEvent {
  eventType: string;
  userId: string;
  metadata: Record<string, any>;
}

export interface EventStats {
  [date: string]: number;
} 