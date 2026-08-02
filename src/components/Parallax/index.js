import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Parallax.css';

import Curtain from './Curtain';
import Progress from './Progress';
import Nav from './Nav';
import Hero from './Hero';
import Statement from './Statement';
import Releases from './Releases';
import Numbers from './Numbers';
import Artists from './Artists';
import Studio from './Studio';
import Tour from './Tour';
import Footer from './Footer';

gsap.registerPlugin(ScrollTrigger);

export { default as Curtain } from './Curtain';
export { default as Progress } from './Progress';
export { default as Nav } from './Nav';
export { default as Hero } from './Hero';
export { default as Statement } from './Statement';
export { default as Releases } from './Releases';
export { default as Numbers } from './Numbers';
export { default as Artists } from './Artists';
export { default as Studio } from './Studio';
export { default as Tour } from './Tour';
export { default as Footer } from './Footer';

export default function ParallaxPage() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const curtain = root.querySelector('.curtain');
    const panels = root.querySelectorAll('.curtain__panel');
    const turntable = root.querySelector('#turntable');
    const nav = root.querySelector('#nav');
    const track = root.querySelector('#releasesTrack');
    const pin = root.querySelector('#releasesPin');

    function openCurtain(){
      if (reduceMotion){
        if (curtain) curtain.style.display = 'none';
        if (turntable) turntable.classList.add('is-playing');
        return;
      }
      const tl = gsap.timeline({ defaults:{ ease:'power3.inOut' } });
      tl.to(panels[0], { xPercent:-100, duration:1.0, delay:.15 })
        .to(panels[1], { xPercent:100, duration:1.0 }, '<')
        .set(curtain, { display:'none' })
        .add(()=>{ if (turntable) turntable.classList.add('is-playing'); });
    }

    openCurtain();

    if (nav) ScrollTrigger.create({ start: 60, onUpdate(self){ nav.classList.toggle('is-scrolled', self.scroll() > 60); } });

    const progressEl = root.querySelector('#progress');
    if (progressEl){
      gsap.to(progressEl, { width: '100%', ease: 'none', scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: true } });
    }

    root.querySelectorAll('[data-reveal]').forEach(function(el){
      if (reduceMotion){ el.style.opacity = 1; el.style.transform = 'none'; return; }
      gsap.to(el, { opacity:1, y:0, duration:1, ease:'power3.out', scrollTrigger:{ trigger:el, start:'top 88%' } });
    });

    if (!reduceMotion){
      root.querySelectorAll('[data-speed]').forEach(function(el){
        var speed = parseFloat(el.getAttribute('data-speed')) || 0;
        gsap.to(el, { yPercent: speed * 60, ease:'none', scrollTrigger:{ trigger: el.closest('section, header'), start:'top bottom', end:'bottom top', scrub:true } });
      });
    }

    function initHorizontalScroll(){
      if (!track || !pin) return;
      if (window.innerWidth < 820 || reduceMotion) return;
      gsap.to(track, { x: () => -(track.scrollWidth - pin.offsetWidth + 64), ease:'none', scrollTrigger:{ trigger: pin, start:'top top', end: () => '+=' + (track.scrollWidth - pin.offsetWidth + 64), scrub:1, pin:true, invalidateOnRefresh:true } });
    }
    initHorizontalScroll();

    root.querySelectorAll('[data-count]').forEach(function(el){
      var target = parseInt(el.getAttribute('data-count'), 10) || 0;
      var obj = { val:0 };
      ScrollTrigger.create({ trigger: el, start:'top 85%', once:true, onEnter: function(){ gsap.to(obj, { val: target, duration: reduceMotion ? 0 : 1.6, ease:'power2.out', onUpdate: function(){ el.textContent = Math.floor(obj.val).toLocaleString(); } }); } });
    });

    if (document.querySelector('.hero')){
      ScrollTrigger.create({ trigger: '.hero', start:'bottom 70%', onLeave: function(){ if (turntable) turntable.classList.remove('is-playing'); }, onEnterBack: function(){ if (turntable) turntable.classList.add('is-playing'); } });
    }

    const back = root.querySelector('#backtotop');
    function onBack(){ window.scrollTo({ top:0, behavior: reduceMotion ? 'auto' : 'smooth' }); }
    if (back) back.addEventListener('click', onBack);

    function onResize(){ ScrollTrigger.refresh(); }
    window.addEventListener('resize', onResize);

    return ()=>{
      if (back) back.removeEventListener('click', onBack);
      window.removeEventListener('resize', onResize);
      ScrollTrigger.getAll().forEach(s=>s.kill());
      gsap.killTweensOf('*');
    };
  }, []);

  return (
    <div ref={rootRef}>
      <Curtain />
      <Progress />
      <Nav />
      <Hero />
      <Statement />
      <Releases />
      <Numbers />
      <Artists />
      <Studio />
      <Tour />
      <Footer />
    </div>
  );
}
