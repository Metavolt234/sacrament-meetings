import { Suspense } from 'react';
import type { ReactNode } from 'react';
import NavLinks from '@/components/NavLinks';

export default function MeetingsLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className="container meetings-section">
      <div className="section-intro">
        <span className="eyebrow">WARD RESOURCES</span>
        <h1>Meeting programs</h1>
        <p>Browse upcoming and past Sunday meeting agendas.</p>
      </div>
      <Suspense fallback={null}>
        <NavLinks />
      </Suspense>
      {children}
    </div>
  );
}
