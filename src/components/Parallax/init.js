import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initNocturne() {
  if (typeof window === 'undefined') return;
  if (window.__nocturneInitialized) return;
  window.__nocturneInitialized = true;

  gsap.registerPlugin(ScrollTrigger);

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Load curtain */
  var curtain = document.querySelector('.curtain');
  var panels = document.querySelectorAll('.curtain__panel');
  var turntable = document.getElementById('turntable');
  function openCurtain(){
    if (!curtain) return;
    if (reduceMotion){
      curtain.style.display = 'none';
      if (turntable) turntable.classList.add('is-playing');
      return;
    }
    var tl = gsap.timeline({ defaults:{ ease:'power3.inOut' } });
    tl.to(panels[0], { xPercent:-100, duration:1.0, delay:.15 })
      .to(panels[1], { xPercent:100, duration:1.0 }, '<')
      .set(curtain, { display:'none' })
      .add(function(){ if (turntable) turntable.classList.add('is-playing'); });
  }
  // If the document has already loaded (SPA navigation), run immediately; otherwise wait for load
  if (document.readyState === 'complete') {
    openCurtain();
  } else {
    window.addEventListener('load', openCurtain);
  }

  /* Nav background on scroll */
  var nav = document.getElementById('nav');
  if (nav){
    ScrollTrigger.create({ start: 60, onUpdate: function(self){ nav.classList.toggle('is-scrolled', self.scroll() > 60); } });
  }

  /* Scroll progress bar */
  var progressEl = document.getElementById('progress');
  if (progressEl){
    gsap.to(progressEl, { width: '100%', ease: 'none', scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: true } });
  }

  /* reveal-on-scroll */
  document.querySelectorAll('[data-reveal]').forEach(function(el){
    if (reduceMotion){ el.style.opacity = 1; el.style.transform = 'none'; return; }
    gsap.to(el, { opacity:1, y:0, duration:1, ease:'power3.out', scrollTrigger:{ trigger:el, start:'top 88%' } });
  });

  /* parallax via data-speed */
  if (!reduceMotion){
    document.querySelectorAll('[data-speed]').forEach(function(el){
      var speed = parseFloat(el.getAttribute('data-speed')) || 0;
      var parent = el.closest('section, header') || document.body;
      gsap.to(el, { yPercent: speed * 60, ease:'none', scrollTrigger:{ trigger: parent, start:'top bottom', end:'bottom top', scrub:true } });
    });
  }

  /* Horizontal releases */
  var track = document.getElementById('releasesTrack');
  var pin = document.getElementById('releasesPin');
  function initHorizontalScroll(){
    if (!track || !pin) return;
    if (window.innerWidth < 820 || reduceMotion) return;
    gsap.to(track, {
      x: () => -(track.scrollWidth - pin.offsetWidth + 64), ease:'none',
      scrollTrigger:{ trigger: pin, start:'top top', end: () => '+=' + (track.scrollWidth - pin.offsetWidth + 64), scrub:1, pin:true, invalidateOnRefresh:true }
    });
  }
  initHorizontalScroll();

  /* Count-up stats */
  document.querySelectorAll('[data-count]').forEach(function(el){
    var target = parseInt(el.getAttribute('data-count'), 10) || 0;
    var obj = { val:0 };
    ScrollTrigger.create({ trigger: el, start:'top 85%', once:true, onEnter: function(){
      gsap.to(obj, { val: target, duration: reduceMotion ? 0 : 1.6, ease:'power2.out', onUpdate: function(){ el.textContent = Math.floor(obj.val).toLocaleString(); } });
    }});
  });

  /* Tonearm */
  if (document.querySelector('.hero')){
    ScrollTrigger.create({ trigger: '.hero', start:'bottom 70%', onLeave: function(){ if (turntable) turntable.classList.remove('is-playing'); }, onEnterBack: function(){ if (turntable) turntable.classList.add('is-playing'); } });
  }

  /* Back to top */
  var back = document.getElementById('backtotop');
  if (back){ back.addEventListener('click', function(){ window.scrollTo({ top:0, behavior: reduceMotion ? 'auto' : 'smooth' }); }); }

  window.addEventListener('resize', function(){ initHorizontalScroll(); ScrollTrigger.refresh(); });
}

export default initNocturne;
