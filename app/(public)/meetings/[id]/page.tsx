import Link from 'next/link';
import { notFound } from 'next/navigation';
import MeetingDetail from '@/components/MeetingDetail';
import { getMeetingById } from '@/lib/meetings-db';
import PrintButton from '@/components/PrintButton';

interface MeetingPageProps {
  params: Promise<{ id: string }>;
}

export default async function MeetingPage({ params }: MeetingPageProps) {
  const { id } = await params;
  const numericId = Number(id);
  if (!Number.isInteger(numericId) || numericId < 1) notFound();

  const meeting = await getMeetingById(numericId);
  if (!meeting) notFound();

  return (
    <div className="detail-page">
      <div className="detail-toolbar">
        <Link className="back-link" href="/meetings">← Back to all meetings</Link>
        <PrintButton />
      </div>
      <MeetingDetail meeting={meeting} />
    </div>
  );
}
