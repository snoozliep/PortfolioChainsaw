import React from 'react';
import { useGsapScope, initReveal } from './useScrollFx';

const defaultDates = [
  { date: 'Sep 12', city: 'Lisbon', venue: 'Sala Escura', href: '#' },
  { date: 'Sep 20', city: 'Rotterdam', venue: 'Het Depot', href: '#' },
  { date: 'Oct 03', city: 'Glasgow', venue: 'The Attic Room', href: '#' },
  { date: 'Oct 18', city: 'Marseille', venue: 'Quai Nord', href: '#' },
];

export default function Tour({ dates = defaultDates, heading = 'Upcoming dates' }) {
  const ref = useGsapScope((root) => initReveal(root), []);

  return (
    <section className="tour" id="tour" ref={ref}>
      <div className="tour__head">
        <div>
          <p className="eyebrow">On the road</p>
          <h2 className="h-display" data-reveal>
            {heading}
          </h2>
        </div>
      </div>
      <div className="tour__list">
        {dates.map((d) => (
          <div className="tour-row" data-reveal key={`${d.city}-${d.date}`}>
            <span className="tour-row__date">{d.date}</span>
            <span className="tour-row__city">{d.city}</span>
            <span className="tour-row__venue">{d.venue}</span>
            <a href={d.href} className="tour-row__link">
              Tickets &rarr;
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}