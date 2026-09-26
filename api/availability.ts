const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
const GOOGLE_FREEBUSY_URL = 'https://www.googleapis.com/calendar/v3/freeBusy';

function json(data: unknown, status = 200) {
  return Response.json(data, {
    status,
    headers: {
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

function isValidDate(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(`${value}T00:00:00-03:00`));
}

function getDayRange(date: string) {
  const start = new Date(`${date}T00:00:00-03:00`);
  const end = new Date(start.getTime() + 24 * 60 * 60 * 1000);
  return { start: start.toISOString(), end: end.toISOString() };
}

async function getGoogleAccessToken(): Promise<string> {
  const clientId = process.env.GOOGLE_CALENDAR_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CALENDAR_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_CALENDAR_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error('GOOGLE_CALENDAR_NOT_CONFIGURED');
  }

  const response = await fetch(GOOGLE_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    }),
  });

  if (!response.ok) throw new Error('GOOGLE_CALENDAR_TOKEN_ERROR');

  const payload = (await response.json()) as { access_token?: string };
  if (!payload.access_token) throw new Error('GOOGLE_CALENDAR_TOKEN_MISSING');

  return payload.access_token;
}

async function queryGoogleCalendar(date: string) {
  const calendarId = process.env.GOOGLE_CALENDAR_ID;
  if (!calendarId) throw new Error('GOOGLE_CALENDAR_NOT_CONFIGURED');

  const { start, end } = getDayRange(date);
  const accessToken = await getGoogleAccessToken();

  const response = await fetch(GOOGLE_FREEBUSY_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      timeMin: start,
      timeMax: end,
      timeZone: process.env.GOOGLE_CALENDAR_TIMEZONE || 'America/Argentina/Mendoza',
      items: [{ id: calendarId }],
    }),
  });

  if (!response.ok) throw new Error('GOOGLE_CALENDAR_FREEBUSY_ERROR');

  const payload = (await response.json()) as {
    calendars?: Record<string, { busy?: Array<{ start: string; end: string }> }>;
  };

  const busy = payload.calendars?.[calendarId]?.busy || [];

  return {
    status: busy.length === 0 ? 'available' : 'unavailable',
    busyIntervals: busy,
  } as const;
}

export default async function handler(request: Request) {
  if (request.method !== 'GET') {
    return json({ error: 'Method not allowed' }, 405);
  }

  // Vercel may provide a relative request URL; only query parsing is needed here.\n  const date = new URL(request.url, 'https://invalid.local').searchParams.get('date') || '';

  if (!isValidDate(date)) {
    return json({ error: 'Invalid date. Expected YYYY-MM-DD.' }, 400);
  }

  try {
    const result = await queryGoogleCalendar(date);

    return json({
      date,
      status: result.status,
      source: 'google-calendar',
      message:
        result.status === 'available'
          ? 'La fecha aparece disponible. La confirmación final queda sujeta a revisión operativa.'
          : 'La fecha presenta ocupación en el calendario. Elegí otra fecha o dejá la solicitud para revisión.',
      busyIntervals: result.busyIntervals,
    });
  } catch (error) {
    const code = error instanceof Error ? error.message : 'UNKNOWN';

    if (code === 'GOOGLE_CALENDAR_NOT_CONFIGURED') {
      return json({
        date,
        status: 'unknown',
        source: 'manual',
        message: 'Fecha sujeta a confirmación.',
      });
    }

    console.error('[availability]', code);

    return json({
      date,
      status: 'unknown',
      source: 'manual',
      message: 'No pudimos verificar la agenda ahora. La fecha queda sujeta a confirmación.',
    });
  }
}
