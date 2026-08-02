import React from 'react';
import { useGsapScope, initReveal } from './useScrollFx';

export default function Statement({ children }) {
  const ref = useGsapScope((root) => initReveal(root), []);

  return (
    <section className="statement" ref={ref}>
      <div className="statement__inner">
        <p className="statement__text" data-reveal>
          {children || (
            <>
              We press <strong>500 copies</strong> at a time, on purpose. Not because we
              can&apos;t press more &mdash; because a record you had to <strong>wait for</strong>{' '}
              sounds different than one you didn&apos;t.
            </>
          )}
        </p>
      </div>
    </section>
  );
}