import React from 'react';
import { useGsapScope, initParallax } from './useScrollFx';

export default function Studio({
  eyebrow = 'The studio',
  title = (
    <>
      Where the tape hiss
      <br />
      becomes the tone.
    </>
  ),
  text = 'Every Nocturne record is cut from a physical master, in a converted dock warehouse, by two engineers who still argue about which desk sounds warmer.',
}) {
  const ref = useGsapScope((root) => initParallax(root), []);

  return (
    <section className="studio" id="studio" ref={ref}>
      <div className="studio__layer studio__layer--back" data-speed="0.15" />
      <div className="studio__layer studio__layer--mid" data-speed="0.4" />
      <div className="studio__content" data-speed="-0.1">
        <p className="eyebrow studio__eyebrow">{eyebrow}</p>
        <h2 className="h-display studio__title">{title}</h2>
        <p className="studio__text">{text}</p>
      </div>
    </section>
  );
}