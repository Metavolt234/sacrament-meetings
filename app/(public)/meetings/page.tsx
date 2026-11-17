import Link from 'next/link';
import { redirect } from 'next/navigation';
import MeetingCard from '@/components/MeetingCard';
import { getMeetingsPage } from '@/lib/meetings-db';

interface MeetingsPageProps {
  searchParams: Promise<{ q?: string | string[]; page?: string | string[] }>;
}

export default async function MeetingsPage({ searchParams }: MeetingsPageProps) {
  const params = await searchParams;
  const rawQuery = Array.isArray(params.q) ? params.q[0] : params.q;
  const query = rawQuery?.trim() ?? '';
  const rawPage = Array.isArray(params.page) ? params.page[0] : params.page;
  const requestedPage = rawPage && /^\d+$/.test(rawPage) ? Number(rawPage) : 1;
  const result = await getMeetingsPage(query, requestedPage);

  if (rawPage && String(result.page) !== rawPage) {
    const canonicalParams = new URLSearchParams();
    if (query) canonicalParams.set('q', query);
    if (result.page > 1) canonicalParams.set('page', String(result.page));
    redirect(`/meetings${canonicalParams.size ? `?${canonicalParams.toString()}` : ''}`);
  }

  const pageHref = (page: number) => {
    const pageParams = new URLSearchParams();
    if (query) pageParams.set('q', query);
    pageParams.set('page', String(page));
    return `/meetings?${pageParams.toString()}`;
  };

  return (
    <section className="meetings-list" aria-labelledby="meetings-title">
      <div className="list-heading">
        <div><span className="eyebrow">MEETING ARCHIVE</span><h2 id="meetings-title">All meetings</h2></div>
        <span className="record-count">{result.total} {result.total === 1 ? 'program' : 'programs'}</span>
      </div>
      <form className="meeting-search" action="/meetings" method="get" role="search">
        <label htmlFor="meeting-search">Search by speaker, presiding, conducting, or meeting type</label>
        <div className="meeting-search__controls">
          <input id="meeting-search" name="q" type="search" defaultValue={query} />
          <button className="button button-primary" type="submit">Search</button>
          {query && <Link className="text-link" href="/meetings">Clear</Link>}
        </div>
      </form>
      <div className="meeting-grid">
        {result.meetings.map((meeting) => <MeetingCard key={meeting.id} meeting={meeting} />)}
      </div>
      {result.meetings.length === 0 && (
        <p className="empty-state" role="status">No meeting programs match your search.</p>
      )}
      {result.total > 0 && (
        <nav className="pagination" aria-label="Meeting pages">
          {result.page > 1
            ? <Link className="pagination__link" href={pageHref(result.page - 1)}>Previous</Link>
            : <span className="pagination__link pagination__link--disabled" aria-disabled="true">Previous</span>}
          <span className="pagination__status">Page {result.page} of {result.pageCount}</span>
          {result.page < result.pageCount
            ? <Link className="pagination__link" href={pageHref(result.page + 1)}>Next</Link>
            : <span className="pagination__link pagination__link--disabled" aria-disabled="true">Next</span>}
        </nav>
      )}
    </section>
  );
}
