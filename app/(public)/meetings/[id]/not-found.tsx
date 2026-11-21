import Link from 'next/link';

export default function MeetingNotFound() {
  return (
    <section className="route-error" aria-labelledby="meeting-not-found-title">
      <h2 id="meeting-not-found-title">Meeting not found</h2>
      <p>This meeting may have been deleted, or the address may be incorrect.</p>
      <Link className="button button-primary" href="/meetings">Back to meetings</Link>
    </section>
  );
}
