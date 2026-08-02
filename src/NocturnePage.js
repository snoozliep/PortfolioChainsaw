import React, { useEffect } from 'react';
import './NocturneTemplate.css';

const navLinks = [
  { href: '#releases', label: 'Releases' },
  { href: '#artists', label: 'Artists' },
  { href: '#studio', label: 'Studio' },
  { href: '#tour', label: 'Tour' },
];

const releases = [
  { id: 'N.014', title: 'Low Tide', artist: 'Marlowe Grey', artClass: 'art-1' },
  { id: 'N.013', title: 'Amber Room', artist: 'Faye Corvin', artClass: 'art-2' },
  { id: 'N.012', title: 'Copper Static', artist: 'The Wire Choir', artClass: 'art-3' },
  { id: 'N.011', title: 'Night Bus', artist: 'Odele', artClass: 'art-4' },
  { id: 'N.010', title: 'Terraces', artist: 'Marlowe Grey', artClass: 'art-5' },
  { id: 'N.009', title: 'Salt & Tape', artist: 'Rowan Says', artClass: 'art-6' },
];

const stats = [
  { value: 1842, label: 'Records pressed' },
  { value: 37, label: 'Artists signed' },
  { value: 12, label: 'Cities on this tour' },
  { value: 9, label: 'Years running' },
];

const artists = [
  { initials: 'MG', name: 'Marlowe Grey', genre: 'Ambient / Dub' },
  { initials: 'FC', name: 'Faye Corvin', genre: 'Downtempo' },
  { initials: 'TW', name: 'The Wire Choir', genre: 'Post-Rock' },
  { initials: 'OD', name: 'Odele', genre: 'Neo-Soul' },
  { initials: 'RS', name: 'Rowan Says', genre: 'Folktronica' },
  { initials: 'KL', name: 'Kite Lines', genre: 'Slowcore' },
];

const tourDates = [
  { date: 'Sep 12', city: 'Lisbon', venue: 'Sala Escura', ticketLabel: 'Tickets →', href: '#' },
  { date: 'Sep 20', city: 'Rotterdam', venue: 'Het Depot', ticketLabel: 'Tickets →', href: '#' },
  { date: 'Oct 03', city: 'Glasgow', venue: 'The Attic Room', ticketLabel: 'Tickets →', href: '#' },
  { date: 'Oct 18', city: 'Marseille', venue: 'Quai Nord', ticketLabel: 'Tickets →', href: '#' },
];

const socialLinks = [
  { href: '#', label: 'Instagram' },
  { href: '#', label: 'Bandcamp' },
  { href: '#', label: 'Discogs' },
];

export const ButtonLink = ({ href, variant = 'ghost', children }) => (
  <a href={href} className={`btn ${variant === 'solid' ? 'btn--solid' : 'btn--ghost'}`}>
    {children}
  </a>
);

export const Curtain = () => (
  <div className="curtain" aria-hidden="true">
    <div className="curtain__panel">
      <span className="curtain__mark">N.001</span>
    </div>
    <div className="curtain__panel">
      <span className="curtain__mark">NOCTURNE</span>
    </div>
  </div>
);

export const NavBar = () => (
  <nav className="nav" id="nav">
    <a href="#" className="nav__mark">
      NOCT<span>URNE</span>
    </a>
    <div className="nav__links">
      {navLinks.map((link) => (
        <a key={link.href} href={link.href}>
          {link.label}
        </a>
      ))}
    </div>
    <a href="#" className="nav__cta">
      Listen
    </a>
    <button className="nav__burger" aria-label="Menu">
      &#9776;
    </button>
  </nav>
);

export const HeroSection = () => (
  <header className="hero">
    <div className="hero__glow" data-speed="0.25" />
    <div className="hero__grain" />
    <div className="hero__grid">
      <div>
        <p className="eyebrow hero__eyebrow">Independent label — est. 2016</p>
        <h1 className="h-display hero__title">
          Records made
          <br />for <em>late hours</em>
          <br />and slow rooms.
        </h1>
        <p className="hero__sub">
          Nocturne presses limited-run vinyl for artists who build songs the way this city builds fog — slowly, and from the ground up.
        </p>
        <div className="hero__actions">
          <ButtonLink href="#releases" variant="solid">
            Browse the catalog
          </ButtonLink>
          <ButtonLink href="#studio">Inside the studio</ButtonLink>
        </div>
      </div>
      <div className="turntable" id="turntable" data-speed="-0.15">
        <div className="turntable__deck" />
        <div className="turntable__platter">
          <div className="turntable__label">
            <span>NOCTURNE<br />SIDE A</span>
          </div>
          <div className="turntable__spindle" />
        </div>
        <div className="turntable__arm" />
      </div>
    </div>
    <div className="hero__scrollcue">
      <i />SCROLL
    </div>
  </header>
);

export const StatementSection = () => (
  <section className="statement">
    <div className="statement__inner">
      <p className="statement__text" data-reveal>
        We press <strong>500 copies</strong> at a time, on purpose.
        Not because we can't press more — because a record you had to
        <strong>wait for</strong> sounds different than one you didn't.
      </p>
    </div>
  </section>
);

export const ReleasesSection = () => (
  <section className="releases" id="releases">
    <div className="releases__head">
      <div>
        <p className="eyebrow">Catalog</p>
        <h2 className="h-display" data-reveal>
          Recent pressings
        </h2>
      </div>
      <p data-reveal>
        Scroll to browse the current catalog — six releases, one turning table.
      </p>
    </div>

    <div className="releases__pin" id="releasesPin">
      <div className="releases__track" id="releasesTrack">
        {releases.map((release) => (
          <article className="release-card" key={release.id}>
            <div className={`release-card__art ${release.artClass}`}>
              <span className="cat">{release.id}</span>
            </div>
            <div className="release-card__body">
              <h3 className="release-card__title">{release.title}</h3>
              <p className="release-card__artist">{release.artist}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export const NumbersSection = () => (
  <section className="numbers">
    <div className="numbers__rings" data-speed="0.2" />
    <div className="numbers__grid">
      {stats.map((stat) => (
        <div className="stat" key={stat.label}>
          <div className="h-display stat__value" data-count={stat.value}>
            {stat.value.toLocaleString()}
          </div>
          <p className="stat__label">{stat.label}</p>
        </div>
      ))}
    </div>
  </section>
);

export const ArtistsSection = () => (
  <section className="artists" id="artists">
    <div className="artists__head">
      <p className="eyebrow">Roster</p>
      <h2 className="h-display" data-reveal>
        The artists
      </h2>
      <p data-reveal>Six acts, one shared instinct for restraint.</p>
    </div>
    <div className="artists__grid">
      {artists.map((artist) => (
        <div className="artist-card" data-reveal key={artist.name}>
          <div className="artist-card__mono">{artist.initials}</div>
          <div>
            <h3 className="artist-card__name">{artist.name}</h3>
            <p className="artist-card__genre">{artist.genre}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export const StudioSection = () => (
  <section className="studio" id="studio">
    <div className="studio__layer studio__layer--back" data-speed="0.15" />
    <div className="studio__layer studio__layer--mid" data-speed="0.4" />
    <div className="studio__content" data-speed="-0.1">
      <p className="eyebrow studio__eyebrow">The studio</p>
      <h2 className="h-display studio__title">
        Where the tape hiss
        <br />becomes the tone.
      </h2>
      <p className="studio__text">
        Every Nocturne record is cut from a physical master, in a converted dock warehouse, by two engineers who still argue about which desk sounds warmer.
      </p>
    </div>
  </section>
);

export const TourSection = () => (
  <section className="tour" id="tour">
    <div className="tour__head">
      <div>
        <p className="eyebrow">On the road</p>
        <h2 className="h-display" data-reveal>
          Upcoming dates
        </h2>
      </div>
    </div>
    <div className="tour__list">
      {tourDates.map((tour) => (
        <div className="tour-row" data-reveal key={`${tour.city}-${tour.date}`}>
          <span className="tour-row__date">{tour.date}</span>
          <span className="tour-row__city">{tour.city}</span>
          <span className="tour-row__venue">{tour.venue}</span>
          <a className="tour-row__link" href={tour.href}>
            {tour.ticketLabel}
          </a>
        </div>
      ))}
    </div>
  </section>
);

export const FooterSection = () => (
  <footer className="footer">
    <div className="footer__top">
      <div>
        <h2 className="h-display footer__title">
          Get the next
          <br />pressing <span>first.</span>
        </h2>
      </div>
      <form className="footer__form" onSubmit={(event) => event.preventDefault()}>
        <input type="email" placeholder="you@example.com" aria-label="Email address" />
        <button type="submit">Subscribe →</button>
      </form>
    </div>
    <div className="footer__bottom">
      <span>NOCTURNE RECORDS — EST. 2016</span>
      <div className="footer__social">
        {socialLinks.map((link) => (
          <a key={link.label} href={link.href}>
            {link.label}
          </a>
        ))}
      </div>
      <span id="backtotop" style={{ cursor: 'pointer' }}>
        Back to top ↑
      </span>
    </div>
  </footer>
);

export default function NocturneTemplate() {
  useEffect(() => {
    const curtain = document.querySelector('.curtain');
    if (curtain) {
      curtain.style.display = 'none';
    }

    const nav = document.getElementById('nav');
    const progress = document.getElementById('progress');
    const hero = document.querySelector('.hero');
    const turntable = document.getElementById('turntable');
    const backToTop = document.getElementById('backtotop');

    const handleScroll = () => {
      if (nav) {
        nav.classList.toggle('is-scrolled', window.scrollY > 60);
      }
      if (progress) {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const percent = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
        progress.style.width = `${percent}%`;
      }
      if (turntable) {
        const heroBottom = hero ? hero.getBoundingClientRect().bottom : 0;
        turntable.classList.toggle('is-playing', heroBottom > window.innerHeight * 0.3);
      }
    };

    const handleBackToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    if (backToTop) {
      backToTop.addEventListener('click', handleBackToTop);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (backToTop) {
        backToTop.removeEventListener('click', handleBackToTop);
      }
    };
  }, []);

  return (
    <div className="nocturne-template">
      <Curtain />
      <div className="progress" id="progress" />
      <NavBar />
      <HeroSection />
      <StatementSection />
      <ReleasesSection />
      <NumbersSection />
      <ArtistsSection />
      <StudioSection />
      <TourSection />
      <FooterSection />
    </div>
  );
}
