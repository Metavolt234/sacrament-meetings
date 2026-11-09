import MeetingCard from '@/components/MeetingCard';
import { getMeetings } from '@/lib/meetings-db';
import { getApiBaseUrl } from '@/lib/server-api';
import type { SacramentMeeting } from '@/lib/types';

export default async function MeetingsPage() {
  const baseUrl = await getApiBaseUrl();
  const response = await fetch(new URL('/api/meetings', baseUrl), { cache: 'no-store' }).catch(() => null);
  const meetings: SacramentMeeting[] = response?.ok ? await response.json() as SacramentMeeting[] : getMeetings();

  return (
    <section className="meetings-list" aria-labelledby="meetings-title">
      <div className="list-heading">
        <div><span className="eyebrow">MEETING ARCHIVE</span><h2 id="meetings-title">All meetings</h2></div>
        <span className="record-count">{meetings.length} programs</span>
      </div>
      <div className="meeting-grid">
        {meetings.map((meeting) => <MeetingCard key={meeting.id} meeting={meeting} />)}
      </div>
    </section>
  );
}
