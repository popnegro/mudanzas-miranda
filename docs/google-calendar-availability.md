# Google Calendar availability

## Contract

The theme exposes a server-side availability endpoint at `/api/availability?date=YYYY-MM-DD`.

The frontend never receives Google credentials. The Vercel Function exchanges the configured OAuth refresh token for a short-lived access token and calls Google Calendar's `freeBusy.query` endpoint.

The intended OAuth scope is:

`https://www.googleapis.com/auth/calendar.freebusy`

This is the narrow Calendar scope needed to read availability without reading event details.

## Required Vercel environment variables

- `GOOGLE_CALENDAR_CLIENT_ID`
- `GOOGLE_CALENDAR_CLIENT_SECRET`
- `GOOGLE_CALENDAR_REFRESH_TOKEN`
- `GOOGLE_CALENDAR_ID`
- `GOOGLE_CALENDAR_TIMEZONE` (default: `America/Argentina/Mendoza`)

## Runtime states

- `available`: Google Calendar returned no busy interval for the requested date.
- `unavailable`: Google Calendar returned one or more busy intervals.
- `unknown`: Calendar is not configured or the provider could not be reached.

The UI must never turn `available` into an unconditional booking confirmation. The operational contract remains:

`Solicitada → Revisada → Disponible → Confirmada`

The requested date is always subject to final operational confirmation.

## Important

This endpoint is deliberately limited to availability. It does not publish, calculate, or estimate a moving price.

When the client is ready to activate synchronization, configure the Google Calendar OAuth credentials in Vercel and grant the integration access to the target calendar. A calendar permission such as `freeBusyReader` is sufficient when only free/busy information is required.
