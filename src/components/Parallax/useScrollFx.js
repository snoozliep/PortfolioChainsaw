import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function useGsapScope(effect, deps = []) {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || typeof window === 'undefined') return;

    const ctx = gsap.context(() => effect(root), root);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}

export function initParallax(root) {
  if (!root || typeof window === 'undefined' || prefersReducedMotion()) return;

  root.querySelectorAll('[data-speed]').forEach((el) => {
    const speed = parseFloat(el.dataset.speed) || 0;
    const parent = el.closest('section, header') || document.body;

    gsap.to(el, {
      yPercent: speed * 60,
      ease: 'none',
      scrollTrigger: {
        trigger: parent,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  });
}

export function initReveal(root) {
  if (!root || typeof window === 'undefined') return;

  const reduceMotion = prefersReducedMotion();
  root.querySelectorAll('[data-reveal]').forEach((el) => {
    if (reduceMotion) {
      el.style.opacity = '1';
      el.style.transform = 'none';
      return;
    }

    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
      },
    });
  });
}

export function initHorizontalScroll(pin, track) {
  if (!pin || !track || typeof window === 'undefined' || prefersReducedMotion()) return;
  if (window.innerWidth < 820) return;

  gsap.to(track, {
    x: () => -(track.scrollWidth - pin.offsetWidth + 64),
    ease: 'none',
    scrollTrigger: {
      trigger: pin,
      start: 'top top',
      end: () => `+=${track.scrollWidth - pin.offsetWidth + 64}`,
      scrub: 1,
      pin: true,
      invalidateOnRefresh: true,
    },
  });
}

export function initCountUp(root) {
  if (!root || typeof window === 'undefined') return;

  const reduceMotion = prefersReducedMotion();
  root.querySelectorAll('[data-count]').forEach((el) => {
    const target = parseInt(el.dataset.count, 10) || 0;
    const obj = { val: 0 };

    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: target,
          duration: reduceMotion ? 0 : 1.6,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = Math.floor(obj.val).toLocaleString();
          },
        });
      },
    });
  });
}
