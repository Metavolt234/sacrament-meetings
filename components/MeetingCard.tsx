import Link from 'next/link';
import type { SacramentMeeting } from '@/lib/types';
import { formatMeetingDate, formatMeetingType } from '@/lib/date-utils';

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
  const itemCount = meeting.speakers.length;

  return (
    <article className="meeting-card h-full">
      <div className="card-topline">
        <span className="date-label">{formatMeetingDate(meeting.date)}</span>
        <span className="type-pill">{formatMeetingType(meeting.meetingType)}</span>
      </div>
      <h2>{formatMeetingType(meeting.meetingType)} meeting</h2>
      <p className="card-meta">Presiding: {meeting.presiding}</p>
      <div className="card-bottom">
        <span>{itemCount} {itemCount === 1 ? 'program item' : 'program items'}</span>
        <Link className="text-link" href={`/meetings/${meeting.id}`}>View program <span aria-hidden="true">→</span></Link>
      </div>
    </article>
  );
}
