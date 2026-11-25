import { Suspense } from 'react';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import LoginForm from '@/components/LoginForm';
import { getAdminRedirectTo } from '@/lib/auth-redirect';

export const metadata: Metadata = {
  title: 'Bishopric sign in',
  description: 'Sign in to manage sacrament meeting programs.'
};

interface LoginPageProps {
  searchParams: Promise<{ callbackUrl?: string | string[] }>;
}

export default function LoginPage({ searchParams }: LoginPageProps) {
  return (
    <Suspense fallback={<p className="loading-state" role="status">Loading sign in...</p>}>
      <LoginPageContent searchParams={searchParams} />
    </Suspense>
  );
}

async function LoginPageContent({ searchParams }: LoginPageProps) {
  const { callbackUrl } = await searchParams;
  const redirectTo = getAdminRedirectTo(Array.isArray(callbackUrl) ? callbackUrl[0] : callbackUrl);
  const session = await auth();
  if (session?.user) redirect(redirectTo);

  return (
    <section className="container meetings-section login-section">
      <div className="section-intro">
        <span className="eyebrow">LEADER RESOURCES</span>
        <h1>Bishopric sign in</h1>
        <p>Sign in to create and manage sacrament meeting programs.</p>
      </div>
      <LoginForm redirectTo={redirectTo} />
    </section>
  );
}
