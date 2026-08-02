import React, { useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGsapScope, initReveal, initHorizontalScroll } from './useScrollFx';

const defaultReleases = [
  { cat: 'N.014', title: 'Low Tide', artist: 'Marlowe Grey', art: 'art-1' },
  { cat: 'N.013', title: 'Amber Room', artist: 'Faye Corvin', art: 'art-2' },
  { cat: 'N.012', title: 'Copper Static', artist: 'The Wire Choir', art: 'art-3' },
  { cat: 'N.011', title: 'Night Bus', artist: 'Odele', art: 'art-4' },
  { cat: 'N.010', title: 'Terraces', artist: 'Marlowe Grey', art: 'art-5' },
  { cat: 'N.009', title: 'Salt & Tape', artist: 'Rowan Says', art: 'art-6' },
];

export default function Releases({
  releases = defaultReleases,
  heading = 'Recent pressings',
  description = 'Scroll to browse the current catalog — six releases, one turning table.',
}) {
  const pinRef = useRef(null);
  const trackRef = useRef(null);

  const sectionRef = useGsapScope((root) => {
    initReveal(root);
    initHorizontalScroll(pinRef.current, trackRef.current);

    // Re-evaluate the pin/scrub distance if the viewport crosses the
    // 820px breakpoint (where this switches to a plain swipeable row).
    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <section className="releases" id="releases" ref={sectionRef}>
      <div className="releases__head">
        <div>
          <p className="eyebrow">Catalog</p>
          <h2 className="h-display" data-reveal>
            {heading}
          </h2>
        </div>
        <p data-reveal>{description}</p>
      </div>

      <div className="releases__pin" ref={pinRef}>
        <div className="releases__track" ref={trackRef}>
          {releases.map((r) => (
            <article className="release-card" key={r.title}>
              <div className={`release-card__art ${r.art}`}>
                <span className="cat">{r.cat}</span>
              </div>
              <div className="release-card__body">
                <h3 className="release-card__title">{r.title}</h3>
                <p className="release-card__artist">{r.artist}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}