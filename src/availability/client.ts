import type { AvailabilityQuery, AvailabilityResult } from './types';

export async function checkAvailability(query: AvailabilityQuery): Promise<AvailabilityResult> {
  const params = new URLSearchParams({ date: query.date });
  if (query.service) params.set('service', query.service);

  const response = await fetch(`/api/availability?${params.toString()}`, {
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    return {
      status: 'unknown',
      date: query.date,
      source: 'manual',
      message: 'La fecha queda sujeta a confirmación.',
    };
  }

  return response.json() as Promise<AvailabilityResult>;
}
