import React, { useEffect, useRef, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGsapScope, initParallax } from './useScrollFx';

export default function Hero({
  eyebrow = 'Independent artist — est. 2002',
  title = (
    <>
      Designs made
      <br />
      for <em>late hours</em>
      <br />
      and slow rooms.
    </>
  ),
  subtitle = "Creating designs, from websites to graphics. 3D models, schematics, prototypes, and more. All made with care, for the late hours and slow nights.",
  primaryCta = { href: '#releases', label: 'Browse the catalog' },
  secondaryCta = { href: '#about-me1', label: 'Inside the studio' },
}) {
  const turntableRef = useRef(null);
  const audioRef = useRef(null);
  const defaultMusicUrl = 'https://www.youtube.com/watch?v=MYPVQccHhAQ&list=RDMYPVQccHhAQ&start_radio=1&t=6277s';
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showMusicPopup, setShowMusicPopup] = useState(false);
  const [musicUrl, setMusicUrl] = useState(defaultMusicUrl);
  const [musicError, setMusicError] = useState(null);

  useEffect(() => {
    const initialEmbed = getYouTubeEmbed(defaultMusicUrl);
    if (initialEmbed) {
      setEmbedUrl(initialEmbed);
    }
  }, []);

  const openMusicPopup = () => {
    setShowMusicPopup(true);
    setMusicError(null);
  };

  const closeMusicPopup = () => {
    setShowMusicPopup(false);
  };

  const handleMusicPlay = (event) => {
    event.preventDefault();
    setMusicError(null);

    const url = musicUrl.trim();
    if (!url) {
      setMusicError('Paste a valid audio or YouTube URL.');
      return;
    }

    const youtubeEmbed = getYouTubeEmbed(url);
    if (youtubeEmbed) {
      stopMusic();
      setEmbedUrl(youtubeEmbed);
      setShowMusicPopup(false);
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    const audio = new Audio(url);
    audio.volume = 0.85;
    audio.play().catch(() => {
      setMusicError('Unable to play this link. Use a direct audio URL or YouTube URL.');
    });

    audioRef.current = audio;
    setEmbedUrl(null);
    setShowMusicPopup(false);
  };

  const [embedUrl, setEmbedUrl] = useState(null);

  const getYouTubeEmbed = (url) => {
    try {
      const parsed = new URL(url);
      const hostname = parsed.hostname.replace('www.', '');
      let videoId = null;

      if (hostname === 'youtube.com' || hostname === 'm.youtube.com') {
        if (parsed.pathname === '/watch') {
          videoId = parsed.searchParams.get('v');
        }
        if (parsed.pathname.startsWith('/shorts/')) {
          videoId = parsed.pathname.split('/')[2];
        }
        if (parsed.pathname.startsWith('/embed/')) {
          videoId = parsed.pathname.split('/')[2];
        }
      }
      if (hostname === 'youtu.be') {
        videoId = parsed.pathname.slice(1);
      }

      if (!videoId) return null;
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&rel=0`;
    } catch (error) {
      return null;
    }
  };

  const stopMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setEmbedUrl(null);
  };

  const playTurntableMusic = () => {
    openMusicPopup();
  };

  const handleHeroLink = (href) => (event) => {
    event.preventDefault();
    setIsTransitioning(true);

    const navigate = () => {
      if (href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.location.hash = href;
        }
      } else {
        window.location.href = href;
      }
    };

    window.setTimeout(() => {
      navigate();
      window.setTimeout(() => setIsTransitioning(false), 600);
    }, 120);
  };

  const ref = useGsapScope((root) => {
    initParallax(root);
    ScrollTrigger.create({
      trigger: root,
      start: 'bottom 70%',
      onLeave: () => turntableRef.current?.classList.remove('is-playing'),
      onEnterBack: () => turntableRef.current?.classList.add('is-playing'),
    });
  }, []);

  // If a <Curtain /> is used elsewhere on the page, re-affirm the
  // spinning-arm state right as it opens (harmless no-op otherwise,
  // since the turntable already starts in the "is-playing" state below).
  useEffect(() => {
    const play = () => turntableRef.current?.classList.add('is-playing');
    window.addEventListener('nocturne:curtain-open', play);
    return () => window.removeEventListener('nocturne:curtain-open', play);
  }, []);

  return (
    <header className="hero" ref={ref}>
      <div className="hero__glow" data-speed="0.25" />
      <div className="hero__grain" />
      <div className="hero__grid">
        <div>
          <p className="eyebrow hero__eyebrow">{eyebrow}</p>
          <h1 className="h-display hero__title">{title}</h1>
          <p className="hero__sub">{subtitle}</p>
          <div className="hero__actions">
            <a href={primaryCta.href} className="btn btn--solid" onClick={handleHeroLink(primaryCta.href)}>
              {primaryCta.label}
            </a>
            <a href={secondaryCta.href} className="btn btn--ghost" onClick={handleHeroLink(secondaryCta.href)}>
              {secondaryCta.label}
            </a>
          </div>
        </div>
        <div className="turntable is-playing" ref={turntableRef} data-speed="-0.15" onClick={playTurntableMusic}>
          <div className="turntable__deck" />
          <div className="turntable__platter">
            <div className="turntable__label">
              <span>
                NOCTURNE
                <br />
                SIDE A
              </span>
            </div>
            <div className="turntable__spindle" />
          </div>
          <div className="turntable__arm" />
        </div>
      </div>
      <div className={"hero-transition-overlay" + (isTransitioning ? ' active' : '')} />
      {showMusicPopup && (
        <div className="music-popup-overlay" onClick={closeMusicPopup}>
          <div className="music-popup" onClick={(e) => e.stopPropagation()}>
            <button className="music-popup-close" onClick={closeMusicPopup}>&times;</button>
            <h2>Paste music link</h2>
            <form onSubmit={handleMusicPlay}>
              <input
                type="text"
                value={musicUrl}
                onChange={(e) => setMusicUrl(e.target.value)}
                placeholder="https://example.com/song.mp3 or YouTube URL"
              />
              {musicError && <p className="music-popup-error">{musicError}</p>}
              <div className="music-popup-actions">
                <button type="submit" className="btn btn--solid">Play</button>
                <button type="button" className="btn btn--ghost" onClick={stopMusic}>Stop</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {embedUrl && (
        <div className="music-embed-fixed">
          <iframe
            src={embedUrl}
            title="YouTube music player"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
      )}
      <div className="hero__scrollcue">
        <i />
        SCROLL
      </div>
    </header>
  );
}