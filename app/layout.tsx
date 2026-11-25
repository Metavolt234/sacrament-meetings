import { Suspense, type ReactNode } from 'react';
import type { Metadata } from 'next';
import { Lora, Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

const inter = Inter({ variable: '--font-inter', subsets: ['latin'] });
const lora = Lora({ variable: '--font-lora', subsets: ['latin'] });
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ?? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Sacrament Meeting Planner',
    template: '%s | Sacrament Meeting Planner'
  },
  description: 'Plan, review, and print sacrament meeting programs.',
  openGraph: {
    title: 'Sacrament Meeting Planner',
    description: 'Plan, review, and print sacrament meeting programs.',
    images: [{
      url: '/chapel.svg',
      width: 620,
      height: 430,
      alt: 'Illustration of a peaceful chapel beneath a sunrise'
    }]
  }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable}`}>
      <body>
        <Suspense fallback={null}>
          <Header />
        </Suspense>
        <main className="site-main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
