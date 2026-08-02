import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

/**
 * mode="auto"  -> opens automatically once the page finishes loading
 * mode="click" -> stays closed, opens on the first click anywhere on it
 *
 * Fires "nocturne:curtain-open" on window right as it starts opening,
 * so e.g. a Hero component's turntable can react without prop drilling.
 */
export default function Curtain({ mode = 'auto', leftLabel = 'N.001', rightLabel = 'NOCTURNE' }) {
  const curtainRef = useRef(null);
  const [opened, setOpened] = useState(false);
  const [visible, setVisible] = useState(true);

  const runOpen = () => {
    if (opened) return;
    setOpened(true);

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.dispatchEvent(new CustomEvent('nocturne:curtain-open'));

    if (reduceMotion) {
      setVisible(false);
      return;
    }

    const panels = curtainRef.current.querySelectorAll('.curtain__panel');
    gsap
      .timeline({ defaults: { ease: 'power3.inOut' } })
      .to(panels[0], { xPercent: -100, duration: 1.0, delay: mode === 'auto' ? 0.15 : 0 })
      .to(panels[1], { xPercent: 100, duration: 1.0 }, '<')
      .add(() => setVisible(false));
  };

  useEffect(() => {
    if (mode !== 'auto') return undefined;
    if (document.readyState === 'complete') {
      runOpen();
      return undefined;
    }
    window.addEventListener('load', runOpen);
    return () => window.removeEventListener('load', runOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  if (!visible) return null;

  return (
    <div
      ref={curtainRef}
      className="curtain"
      style={{
        pointerEvents: mode === 'click' ? 'auto' : 'none',
        cursor: mode === 'click' ? 'pointer' : 'default',
      }}
      onClick={mode === 'click' ? runOpen : undefined}
      aria-hidden="true"
    >
      <div className="curtain__panel">
        <span className="curtain__mark">{leftLabel}</span>
      </div>
      <div className="curtain__panel">
        <span className="curtain__mark">{rightLabel}</span>
      </div>
      {mode === 'click' && !opened && <div className="curtain__hint">CLICK ANYWHERE TO ENTER</div>}
    </div>
  );
}