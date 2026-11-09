import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container home-page">
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">WORSHIP · PLAN · REMEMBER</span>
          <h1>Make room for what matters most.</h1>
          <p>A simple, thoughtful place for ward leaders to organize Sunday meetings and for members to view the program.</p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/meetings">Explore meeting programs</Link>
            <Link className="button button-secondary" href="/meetings/current">View this Sunday</Link>
          </div>
        </div>
        <div className="hero-art">
          <Image src="/chapel.svg" alt="Illustration of a peaceful chapel beneath a sunrise" width={620} height={430} priority />
        </div>
      </section>
      <section className="home-features" aria-label="Planner features">
        <div><span className="feature-number">01</span><h2>Plan clearly</h2><p>Keep hymns, prayers, announcements, and speakers together in one agenda.</p></div>
        <div><span className="feature-number">02</span><h2>Review easily</h2><p>Navigate current and past meeting programs whenever you need them.</p></div>
        <div><span className="feature-number">03</span><h2>Print simply</h2><p>Prepare a clean, printer-friendly program for Sunday worship.</p></div>
      </section>
    </div>
  );
}
