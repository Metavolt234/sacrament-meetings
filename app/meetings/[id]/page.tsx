import Link from 'next/link';
import { notFound } from 'next/navigation';
import MeetingDetail from '@/components/MeetingDetail';
import { getMeetingById } from '@/lib/meetings-db';
import { getApiBaseUrl } from '@/lib/server-api';
import type { SacramentMeeting } from '@/lib/types';
import PrintButton from '@/components/PrintButton';

interface MeetingPageProps {
  params: Promise<{ id: string }>;
}

export default async function MeetingPage({ params }: MeetingPageProps) {
  const { id } = await params;
  const numericId = Number(id);
  if (!Number.isInteger(numericId) || numericId < 1) notFound();

  const baseUrl = await getApiBaseUrl();
  const response = await fetch(new URL(`/api/meetings/${numericId}`, baseUrl), { cache: 'no-store' }).catch(() => null);
  const meeting: SacramentMeeting | undefined = response?.ok ? await response.json() as SacramentMeeting : getMeetingById(numericId);
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
