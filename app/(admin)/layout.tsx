import type { ReactNode } from 'react';

export default function AdminLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className="container meetings-section admin-section">
      <div className="section-intro">
        <span className="eyebrow">LEADER RESOURCES</span>
        <h1>Meeting administration</h1>
        <p>Review meeting programs for your ward.</p>
      </div>
      {children}
    </div>
  );
}
