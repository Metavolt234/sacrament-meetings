import { Suspense } from 'react';
import type { ReactNode } from 'react';
import { signOutAction } from '@/app/login/actions';
import { requireAuth } from '@/lib/require-auth';

export default function AdminLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <Suspense fallback={<p className="loading-state" role="status">Checking bishopric access...</p>}>
      <AuthenticatedAdminContent>{children}</AuthenticatedAdminContent>
    </Suspense>
  );
}

async function AuthenticatedAdminContent({ children }: Readonly<{ children: ReactNode }>) {
  await requireAuth();

  return (
    <div className="container meetings-section admin-section">
      <div className="section-intro">
        <span className="eyebrow">LEADER RESOURCES</span>
        <h1>Meeting administration</h1>
        <p>Review meeting programs for your ward.</p>
        <form className="admin-session-actions" action={signOutAction}>
          <button className="text-link" type="submit">Sign out</button>
        </form>
      </div>
      {children}
    </div>
  );
}
