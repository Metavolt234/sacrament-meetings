import { connection } from 'next/server';

export default async function Header() {
  await connection();

  const today = new Intl.DateTimeFormat('en', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
  }).format(new Date());

  return (
    <header className="site-header">
      <div className="site-header__content container flex items-center justify-between gap-6">
        <h1 className="site-header__title">Cedar Grove <br /> Ward Meetings</h1>
        
        <p className="site-header__date">{today}</p>
      </div>
    </header>
  );
}
