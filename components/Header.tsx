import { connection } from 'next/server';
import NavLinks from '@/components/NavLinks';

export default async function Header() {
  await connection();

  const today = new Intl.DateTimeFormat('en', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
  }).format(new Date());

  return (
    <header className="site-header">
      <div className="site-header__content container">
        <h1 className="site-header__title">NEL WARD UG <br /> Meetings</h1>
        <NavLinks />
        <p className="site-header__date">{today}</p>
      </div>
    </header>
  );
}
