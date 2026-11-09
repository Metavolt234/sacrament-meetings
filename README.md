# Sacrament Meeting Planner

A Next.js application for planning, reviewing, and printing sacrament meeting programs.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Features

- Meeting archive with five sample Sunday meetings.
- Meeting details with announcements, hymns, prayers, ward business, stake business, speakers, and musical numbers.
- Redirect to the most recent Sunday with a meeting record.
- JSON API routes for meeting collections and individual meetings.
- Print-friendly meeting program view.
- Responsive layout, semantic headings, keyboard focus styles, and descriptive image alt text.

## API

- `GET /api/meetings`
- `GET /api/meetings?date=2026-11-08`
- `GET /api/meetings/1`

The data is held in memory for this assignment and resets when the server restarts.
