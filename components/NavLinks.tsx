'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Home' },
  { href: '/meetings', label: 'Meetings' },
  { href: '/meetings/current', label: 'Current Meeting' }
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="site-nav" aria-label="Primary navigation">
      {links.map((link) => {
        const active = pathname === link.href
          || (link.href === '/meetings' && pathname.startsWith('/meetings/') && pathname !== '/meetings/current');
        return (
          <Link key={link.href} href={link.href} className={active ? 'site-nav-link active' : 'site-nav-link'} aria-current={active ? 'page' : undefined}>
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
