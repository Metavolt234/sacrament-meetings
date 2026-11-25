import { Suspense } from 'react';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import LoginForm from '@/components/LoginForm';

export const metadata: Metadata = {
  title: 'Bishopric sign in',
  description: 'Sign in to manage sacrament meeting programs.'
};

export default function LoginPage() {
  return (
    <Suspense fallback={<p className="loading-state" role="status">Loading sign in...</p>}>
      <LoginPageContent />
    </Suspense>
  );
}

async function LoginPageContent() {
  const session = await auth();
  if (session?.user) redirect('/admin');

  return (
    <section className="container meetings-section login-section">
      <div className="section-intro">
        <span className="eyebrow">LEADER RESOURCES</span>
        <h1>Bishopric sign in</h1>
        <p>Sign in to create and manage sacrament meeting programs.</p>
      </div>
      <LoginForm />
    </section>
  );
}
