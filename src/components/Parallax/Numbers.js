import React from 'react';
import { useGsapScope, initParallax, initCountUp } from './useScrollFx';

const defaultStats = [
  { value: 1842, label: 'Records pressed' },
  { value: 37, label: 'Artists signed' },
  { value: 12, label: 'Cities on this tour' },
  { value: 9, label: 'Years running' },
];

export default function Numbers({ stats = defaultStats }) {
  const ref = useGsapScope((root) => {
    initParallax(root);
    initCountUp(root);
  }, []);

  return (
    <section className="numbers" ref={ref}>
      <div className="numbers__rings" data-speed="0.2" />
      <div className="numbers__grid">
        {stats.map((s) => (
          <div className="stat" key={s.label}>
            <div className="h-display stat__value" data-count={s.value}>
              0
            </div>
            <p className="stat__label">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}