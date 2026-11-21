import Link from 'next/link';

export default function MeetingEditNotFound() {
  return (
    <section className="route-error" aria-labelledby="meeting-not-found-title">
      <h2 id="meeting-not-found-title">Meeting not found</h2>
      <p>This meeting may have been deleted, or the address may be incorrect.</p>
      <div className="form-actions">
        <Link className="button button-primary" href="/admin">Back to administration</Link>
        <Link className="button button-secondary" href="/meetings">Browse meetings</Link>
      </div>
    </section>
  );
}
