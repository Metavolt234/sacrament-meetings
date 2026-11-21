import Link from 'next/link';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import MeetingForm from '@/components/MeetingForm';
import { getMeetingById } from '@/lib/meetings-db';

interface EditMeetingPageProps {
  params: Promise<{ id: string }>;
}

export default function EditMeetingPage({ params }: EditMeetingPageProps) {
  return (
    <Suspense fallback={<p className="loading-state" role="status">Loading meeting program...</p>}>
      <EditMeetingContent params={params} />
    </Suspense>
  );
}

async function EditMeetingContent({ params }: EditMeetingPageProps) {
  const { id } = await params;
  const numericId = Number(id);
  if (!Number.isSafeInteger(numericId) || numericId < 1) notFound();

  const meeting = await getMeetingById(numericId);
  if (!meeting) notFound();

  return (
    <section className="meeting-editor" aria-labelledby="edit-meeting-title">
      <div className="editor-heading">
        <h2 id="edit-meeting-title">Edit meeting program</h2>
        <Link className="back-link" href="/admin">Back to meeting administration</Link>
      </div>
      <MeetingForm meeting={meeting} />
    </section>
  );
}
