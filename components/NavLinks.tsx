'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/meetings', label: 'All meetings' },
  { href: '/meetings/current', label: 'This Sunday' }
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="section-nav" aria-label="Meeting navigation">
      {links.map((link) => {
        const active = pathname === link.href
          || (link.href === '/meetings' && pathname.startsWith('/meetings/') && pathname !== '/meetings/current');
        return (
          <Link key={link.href} href={link.href} className={active ? 'nav-link active' : 'nav-link'} aria-current={active ? 'page' : undefined}>
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
