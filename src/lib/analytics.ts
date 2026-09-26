export type AnalyticsEvent =
  | 'whatsapp_click'
  | 'quote_start'
  | 'quote_submit'
  | 'availability_check'
  | 'phone_click'
  | 'email_click'
  | 'service_view'
  | 'location_view';

interface AnalyticsPayload {
  [key: string]: string | number | boolean | undefined;
}

interface GtagWindow extends Window {
  dataLayer?: Array<Record<string, unknown>>;
  gtag?: (...args: unknown[]) => void;
}

export function trackEvent(event: AnalyticsEvent, payload: AnalyticsPayload = {}): void {
  if (typeof window === 'undefined') return;
  const analyticsWindow = window as GtagWindow;
  const eventPayload = { event, ...payload };

  analyticsWindow.dataLayer?.push(eventPayload);
  analyticsWindow.gtag?.('event', event, payload);
}
