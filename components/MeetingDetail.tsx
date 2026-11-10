import type { ReactNode } from 'react';
import type { SacramentMeeting } from '@/lib/types';
import { formatMeetingDate, formatMeetingType } from '@/lib/date-utils';

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

function ProgramRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="program-row">
      <h3>{label}</h3>
      <div className="program-content min-w-0">{children}</div>
    </div>
  );
}

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
  return (
    <article className="program-sheet">
      <div className="program-heading">
        <span className="eyebrow">SACRAMENT MEETING PROGRAM</span>
        <h1>{formatMeetingDate(meeting.date)}</h1>
        <p>{formatMeetingType(meeting.meetingType)} meeting</p>
      </div>
      <div className="leadership-grid">
        <div><span>Presiding</span><strong>{meeting.presiding}</strong></div>
        <div><span>Conducting</span><strong>{meeting.conducting}</strong></div>
      </div>
      {meeting.announcements && meeting.announcements.length > 0 && (
        <ProgramRow label="Announcements">
          <ul>{meeting.announcements.map((item) => <li key={item}>{item}</li>)}</ul>
        </ProgramRow>
      )}
      <ProgramRow label="Opening hymn"><p><strong>{meeting.openingHymn.number}.</strong> {meeting.openingHymn.title}</p></ProgramRow>
      <ProgramRow label="Opening prayer"><p>{meeting.openingPrayer}</p></ProgramRow>
      {meeting.wardBusiness.length > 0 && (
        <ProgramRow label="Ward business">
          <ul>{meeting.wardBusiness.map((item, index) => <li key={`${item.description}-${index}`}>{item.description}</li>)}</ul>
        </ProgramRow>
      )}
      <ProgramRow label="Stake business"><p>{meeting.stakeBusiness ? 'Stake business will be conducted.' : 'No stake business'}</p></ProgramRow>
      <ProgramRow label="Sacrament hymn"><p><strong>{meeting.sacramentHymn.number}.</strong> {meeting.sacramentHymn.title}</p></ProgramRow>
      {meeting.speakers.length > 0 && (
        <ProgramRow label="Speakers & musical numbers">
          <ul className="program-people">
            {meeting.speakers.map((item, index) => (
              <li key={`${item.name}-${index}`}>
                <span className="person-type">{item.type === 'speaker' ? 'Speaker' : 'Musical number'}</span>
                <strong>{item.name}</strong>
                <span>{item.topic}</span>
              </li>
            ))}
          </ul>
        </ProgramRow>
      )}
      <ProgramRow label="Closing hymn"><p><strong>{meeting.closingHymn.number}.</strong> {meeting.closingHymn.title}</p></ProgramRow>
      <ProgramRow label="Closing prayer"><p>{meeting.closingPrayer}</p></ProgramRow>
      <div className="program-end">Thank you for worshipping with us.</div>
    </article>
  );
}
