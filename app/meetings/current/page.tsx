import { redirect } from 'next/navigation';
import { connection } from 'next/server';
import { getMeetingByDate } from '@/lib/meetings-db';
import { getMostRecentSunday } from '@/lib/date-utils';

export default async function CurrentMeetingPage() {
  await connection();

  const meeting = getMeetingByDate(getMostRecentSunday(new Date()));
  if (!meeting) {
    redirect('/meetings');
  }
  redirect(`/meetings/${meeting.id}`);
}
