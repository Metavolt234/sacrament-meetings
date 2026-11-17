import { NextRequest, NextResponse } from 'next/server';
import { getMeetings, getMeetingsForDate, getMeetingsPage } from '@/lib/meetings-db';

function isValidDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const date = params.get('date');
  if (date && !isValidDate(date)) {
    return NextResponse.json({ error: 'Date must use YYYY-MM-DD format.' }, { status: 400 });
  }
  if (date) {
    return NextResponse.json(await getMeetingsForDate(date));
  }

  if (params.has('q') || params.has('page')) {
    const rawPage = params.get('page') ?? '1';
    if (!/^\d+$/.test(rawPage) || Number(rawPage) < 1) {
      return NextResponse.json({ error: 'Page must be a positive integer.' }, { status: 400 });
    }
    return NextResponse.json(await getMeetingsPage(params.get('q') ?? '', Number(rawPage)));
  }

  return NextResponse.json(await getMeetings());
}
