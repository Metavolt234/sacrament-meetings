'use client';

import Link from 'next/link';
import { useEffect } from 'react';

interface MeetingsErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function MeetingsError({ error, reset }: MeetingsErrorProps) {
  useEffect(() => {
    console.error('Meeting archive failed:', error);
  }, [error]);

  return (
    <section className="route-error" role="alert">
      <h2>Meeting programs are temporarily unavailable</h2>
      <p>We could not load the meeting information. Please try again or return to the archive.</p>
      <div className="form-actions">
        <button className="button button-primary" type="button" onClick={reset}>Try Again</button>
        <Link className="button button-secondary" href="/meetings">Back to meetings</Link>
      </div>
    </section>
  );
}
