'use client';

import Link from 'next/link';
import { useEffect } from 'react';

interface AdminErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function AdminError({ error, reset }: AdminErrorProps) {
  useEffect(() => {
    console.error('Meeting administration failed:', error);
  }, [error]);

  return (
    <section className="route-error" role="alert">
      <h2>Meeting administration is temporarily unavailable</h2>
      <p>We could not complete that request. Please try again or return to the meeting list.</p>
      <div className="form-actions">
        <button className="button button-primary" type="button" onClick={reset}>Try Again</button>
        <Link className="button button-secondary" href="/admin">Back to administration</Link>
      </div>
    </section>
  );
}
