import Link from 'next/link';

export default function Header() {
  const today = new Intl.DateTimeFormat('en', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
  }).format(new Date());

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" href="/" aria-label="Sacrament Meeting Planner home">
          <span className="brand-mark" aria-hidden="true">✦</span>
          <span><strong>Sacrament Meeting</strong><small>PLANNER</small></span>
        </Link>
        <div className="header-date"><span className="eyebrow">TODAY</span><span>{today}</span></div>
      </div>
    </header>
  );
}
