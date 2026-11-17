import Link from 'next/link';
import { connection } from 'next/server';
import { getMeetings } from '@/lib/meetings-db';
import { formatMeetingDate, formatMeetingType } from '@/lib/date-utils';

export default async function AdminPage() {
  await connection();
  const meetings = await getMeetings();

  return (
    <section className="meetings-list" aria-labelledby="admin-meetings-title">
      <div className="list-heading">
        <div>
          <span className="eyebrow">PROGRAM OVERVIEW</span>
          <h2 id="admin-meetings-title">Meeting programs</h2>
        </div>
        <span className="record-count">{meetings.length} {meetings.length === 1 ? 'program' : 'programs'}</span>
      </div>
      <div className="admin-meeting-list">
        {meetings.map((meeting) => (
          <article className="admin-meeting-row" key={meeting.id}>
            <div>
              <h3>{formatMeetingDate(meeting.date)}</h3>
              <p>{formatMeetingType(meeting.meetingType)} meeting · Presiding: {meeting.presiding}</p>
            </div>
            <Link className="text-link" href={`/meetings/${meeting.id}`}>View program</Link>
          </article>
        ))}
        {meetings.length === 0 && <p className="empty-state">No meeting programs have been added.</p>}
      </div>
    </section>
  );
}
