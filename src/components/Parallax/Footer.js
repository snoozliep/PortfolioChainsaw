import React, { useRef } from 'react';

export default function Footer({
  title = (
    <>
      Get the next
      <br />
      pressing <span>first.</span>
    </>
  ),
  brandLine = 'NOCTURNE RECORDS — EST. 2016',
  socialLinks = [
    { href: '#', label: 'Instagram' },
    { href: '#', label: 'Bandcamp' },
    { href: '#', label: 'Discogs' },
  ],
  onSubscribe,
}) {
  const emailRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubscribe) onSubscribe(emailRef.current?.value || '');
  };

  const backToTop = () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer__top">
        <div>
          <h2 className="h-display footer__title">{title}</h2>
        </div>
        <form className="footer__form" onSubmit={handleSubmit}>
          <input ref={emailRef} type="email" placeholder="you@example.com" aria-label="Email address" />
          <button type="submit">Subscribe &rarr;</button>
        </form>
      </div>
      <div className="footer__bottom">
        <span>{brandLine}</span>
        <div className="footer__social">
          {socialLinks.map((s) => (
            <a href={s.href} key={s.label}>
              {s.label}
            </a>
          ))}
        </div>
        <span style={{ cursor: 'pointer' }} onClick={backToTop}>
          Back to top &uarr;
        </span>
      </div>
    </footer>
  );
}