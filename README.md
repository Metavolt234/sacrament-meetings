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
- Redirect to the most recent Sunday with a meeting record.
- JSON API routes for meeting collections and individual meetings.
- Print-friendly meeting program view.
- Responsive layout, semantic headings, keyboard focus styles, and descriptive image alt text.

## Database setup

1. Create a Neon PostgreSQL database and set `DATABASE_URL` to its connection string in `.env.local` for local work and in the Vercel project environment settings for deployments. Keep this variable server-side; do not prefix it with `NEXT_PUBLIC_`.
2. Run [`db/migrations/001_create_meetings.sql`](./db/migrations/001_create_meetings.sql) against that database. It creates the meeting table and seeds the five existing sample programs without overwriting existing records.
3. Restart the application after setting the environment variable.

The app intentionally does not fall back to in-memory data. Requests that need meeting records will fail explicitly if `DATABASE_URL` is missing or the migration has not been applied.

Route groups are organizational and do not appear in URLs: public pages remain at `/` and `/meetings`, and leader-facing pages are under `/admin`. A route group is not an authentication boundary; enable Vercel Deployment Protection or add application authentication before using `/admin` for private information.

## API

- `GET /api/meetings`
- `GET /api/meetings?date=2026-11-08`
- `GET /api/meetings?q=John&page=1` returns the matching programs, total count, and pagination metadata (five programs per page).
- `GET /api/meetings/1`

Search matches speaker names/topics, presiding, conducting, and meeting type. The public archive keeps the search term and current page in the URL.
