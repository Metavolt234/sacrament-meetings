import Link from 'next/link';
import { Suspense } from 'react';
import { connection } from 'next/server';
import { getMeetings } from '@/lib/meetings-db';
import { formatMeetingDate, formatMeetingType } from '@/lib/date-utils';
import { deleteMeeting } from '@/lib/actions';

export default function AdminPage() {
  return (
    <Suspense fallback={<p className="loading-state" role="status">Loading meeting programs...</p>}>
      <AdminMeetingList />
    </Suspense>
  );
}

async function AdminMeetingList() {
  await connection();
  const meetings = await getMeetings();

  return (
    <section className="meetings-list" aria-labelledby="admin-meetings-title">
      <div className="list-heading">
        <div>
          <span className="eyebrow">PROGRAM OVERVIEW</span>
          <h2 id="admin-meetings-title">Meeting programs</h2>
        </div>
        <div className="admin-list-actions">
          <span className="record-count">{meetings.length} {meetings.length === 1 ? 'program' : 'programs'}</span>
          <Link className="button button-primary" href="/admin/meetings/new">Create meeting</Link>
        </div>
      </div>
      <div className="admin-meeting-list">
        {meetings.map((meeting) => (
          <article className="admin-meeting-row" key={meeting.id}>
            <div>
              <h3>{formatMeetingDate(meeting.date)}</h3>
              <p>{formatMeetingType(meeting.meetingType)} meeting · Presiding: {meeting.presiding}</p>
            </div>
            <div className="admin-row-actions">
              <Link className="text-link" href={`/meetings/${meeting.id}`}>View program</Link>
              <Link className="text-link" href={`/admin/meetings/${meeting.id}/edit`}>Edit</Link>
              <form action={deleteMeeting}>
                <input type="hidden" name="id" value={meeting.id} />
                <button className="text-link delete-link" type="submit"
                  aria-label={`Delete ${formatMeetingDate(meeting.date)} meeting`}>Delete</button>
              </form>
            </div>
          </article>
        ))}
        {meetings.length === 0 && <p className="empty-state">No meeting programs have been added.</p>}
      </div>
    </section>
  );
}
