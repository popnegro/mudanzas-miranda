export type AvailabilityStatus = 'available' | 'unavailable' | 'unknown';

export interface AvailabilityQuery {
  date: string;
  service?: string;
}

export interface AvailabilityResult {
  status: AvailabilityStatus;
  date: string;
  source: 'google-calendar' | 'manual';
  message: string;
  busyIntervals?: Array<{ start: string; end: string }>;
}
