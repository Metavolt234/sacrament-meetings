# Sacrament Meeting Planner

A Next.js application for planning, reviewing, and printing sacrament meeting programs.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Features

- Meeting programs stored in PostgreSQL on Neon, so data persists across deployments and server restarts.
- Meeting archive with URL-based search and five programs per page.
- Meeting details with announcements, hymns, prayers, ward business, stake business, speakers, and musical numbers.
- Separate public and leader-facing route groups with scoped layouts and loading states.
- Leader-facing create, edit, and delete workflows for meeting programs, with server-side validation and accessible field errors.
- Redirect to the most recent Sunday with a meeting record.
- JSON API routes for meeting collections and individual meetings.
- Print-friendly meeting program view.
- Responsive layout, semantic headings, keyboard focus styles, and descriptive image alt text.

## Database setup

1. Create a Neon PostgreSQL database and set `DATABASE_URL` to its connection string in `.env.local` for local work and in the Vercel project environment settings for deployments. Keep this variable server-side; do not prefix it with `NEXT_PUBLIC_`.
2. Run [`db/migrations/001_create_meetings.sql`](./db/migrations/001_create_meetings.sql) and [`db/migrations/002_seed_pagination_meetings.sql`](./db/migrations/002_seed_pagination_meetings.sql) against that database, in order. They create the meeting table and seed ten sample programs so the archive has two pages of five meetings.
3. Restart the application after setting the environment variable.

The app intentionally does not fall back to in-memory data. Requests that need meeting records will fail explicitly if `DATABASE_URL` is missing or the migration has not been applied.

Route groups are organizational and do not appear in URLs: public pages remain at `/` and `/meetings`, and leader-facing pages are under `/admin`.

## Authentication

The `/admin` area uses Auth.js Credentials authentication. Configure these server-only variables in `.env.local` (and your deployment environment):

```env
AUTH_SECRET=<generate a random secret with npx auth secret>
BISHOPRIC_USERNAME=<bishopric login name>
BISHOPRIC_PASSWORD=<strong bishopric password>
```

Visit `/login` to sign in. The admin layout redirects unauthenticated visitors to the login page, and the meeting create, edit, and delete Server Actions independently verify the session. Use a unique, strong password and keep all three values out of source control.

For deployments outside Vercel, set `NEXT_PUBLIC_SITE_URL` to the canonical site origin at build time and runtime so Open Graph image URLs are absolute. Vercel provides its deployment host automatically. For self-hosted production servers, configure `AUTH_TRUST_HOST=true` only when a trusted proxy controls the incoming host; local development does not need this setting.

Meeting program management is available at `/admin`. Create and edit forms validate all submitted values on the server and display field-level errors; unexpected failures show a retry option.

## Metadata

The root layout provides the site's default title, description, and Open Graph artwork using the existing `public/chapel.svg` illustration. The meeting archive and leader sign-in pages also provide route-specific titles and descriptions.

## API

- `GET /api/meetings`
- `GET /api/meetings?date=2026-11-08`
- `GET /api/meetings?q=John&page=1` returns the matching programs, total count, and pagination metadata (five programs per page).
- `GET /api/meetings/1`

Search matches speaker names/topics, presiding, conducting, and meeting type. The public archive keeps the search term and current page in the URL.
