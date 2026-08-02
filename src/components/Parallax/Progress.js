import React from 'react';
import gsap from 'gsap';
import { useGsapScope } from './useScrollFx';

export default function ProgressBar() {
  const ref = useGsapScope((root) => {
    gsap.to(root, {
      width: '100%',
      ease: 'none',
      scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: true },
    });
  }, []);

  return <div className="progress" ref={ref} />;
}