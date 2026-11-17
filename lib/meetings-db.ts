import 'server-only';
import { neon, type NeonQueryFunction } from '@neondatabase/serverless';
import type { SacramentMeeting } from './types';

const databaseUrl = process.env.DATABASE_URL;
let sqlClient: NeonQueryFunction<false, false> | undefined;

function getSql(): NeonQueryFunction<false, false> {
  if (!databaseUrl) {
    throw new Error('DATABASE_URL is required to read meeting programs.');
  }
  sqlClient ??= neon(databaseUrl);
  return sqlClient;
}

function readMeeting(row: Record<string, unknown>): SacramentMeeting {
  const meetingData = row.meeting_data;
  if (typeof meetingData !== 'object' || meetingData === null || Array.isArray(meetingData)) {
    throw new Error('A stored meeting program contains invalid JSON data.');
  }
  return meetingData as SacramentMeeting;
}

export interface MeetingPage {
  meetings: SacramentMeeting[];
  total: number;
  page: number;
  pageSize: number;
  pageCount: number;
}

function getSearchPattern(query: string): string {
  return `%${query.replace(/[\\%_]/g, '\\$&')}%`;
}

export async function getMeetings(): Promise<SacramentMeeting[]> {
  const sql = getSql();
  const rows = await sql`
    SELECT meeting_data
    FROM sacrament_meetings
    ORDER BY meeting_date DESC, id DESC
  `;
  return rows.map(readMeeting);
}

export async function getMeetingsForDate(date: string): Promise<SacramentMeeting[]> {
  const sql = getSql();
  const rows = await sql`
    SELECT meeting_data
    FROM sacrament_meetings
    WHERE meeting_date = ${date}::date
    ORDER BY id DESC
  `;
  return rows.map(readMeeting);
}

export async function getMeetingsPage(query: string, requestedPage: number, pageSize = 5): Promise<MeetingPage> {
  const sql = getSql();
  const search = query.trim();
  const pattern = getSearchPattern(search);
  const countRows = await sql`
    SELECT COUNT(*)::text AS total
    FROM sacrament_meetings
    WHERE (
      ${search.length === 0}
      OR meeting_data->>'presiding' ILIKE ${pattern}
      OR meeting_data->>'conducting' ILIKE ${pattern}
      OR meeting_data->>'meetingType' ILIKE ${pattern}
      OR EXISTS (
        SELECT 1
        FROM jsonb_array_elements(COALESCE(meeting_data->'speakers', '[]'::jsonb)) AS speaker
        WHERE speaker->>'name' ILIKE ${pattern}
          OR speaker->>'topic' ILIKE ${pattern}
      )
    )
  `;
  const total = Number(countRows[0]?.total ?? 0);
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const page = Math.min(Math.max(1, requestedPage), pageCount);
  const rows = await sql`
    SELECT meeting_data
    FROM sacrament_meetings
    WHERE (
      ${search.length === 0}
      OR meeting_data->>'presiding' ILIKE ${pattern}
      OR meeting_data->>'conducting' ILIKE ${pattern}
      OR meeting_data->>'meetingType' ILIKE ${pattern}
      OR EXISTS (
        SELECT 1
        FROM jsonb_array_elements(COALESCE(meeting_data->'speakers', '[]'::jsonb)) AS speaker
        WHERE speaker->>'name' ILIKE ${pattern}
          OR speaker->>'topic' ILIKE ${pattern}
      )
    )
    ORDER BY meeting_date DESC, id DESC
    LIMIT ${pageSize}
    OFFSET ${(page - 1) * pageSize}
  `;

  return {
    meetings: rows.map(readMeeting),
    total,
    page,
    pageSize,
    pageCount
  };
}

export async function getMeetingById(id: number): Promise<SacramentMeeting | undefined> {
  const sql = getSql();
  const rows = await sql`
    SELECT meeting_data
    FROM sacrament_meetings
    WHERE id = ${id}
    LIMIT 1
  `;
  return rows[0] ? readMeeting(rows[0]) : undefined;
}

export async function getMeetingByDate(date: string): Promise<SacramentMeeting | undefined> {
  const sql = getSql();
  const rows = await sql`
    SELECT meeting_data
    FROM sacrament_meetings
    WHERE meeting_date = ${date}::date
    ORDER BY id DESC
    LIMIT 1
  `;
  return rows[0] ? readMeeting(rows[0]) : undefined;
}
