import { NextRequest, NextResponse } from 'next/server';
import { getMeetings } from '@/lib/meetings-db';

export function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get('date');
  const meetings = getMeetings();
  if (date && !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: 'Date must use YYYY-MM-DD format.' }, { status: 400 });
  }
  const result = date ? meetings.filter((meeting) => meeting.date === date) : meetings;
  return NextResponse.json(result);
}
