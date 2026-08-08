import React, { useEffect, useRef, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGsapScope, initParallax } from './useScrollFx';

export default function Hero({
  eyebrow = 'チェンソーマン // BUDDY STORIES',
  title = (
    <>
      CHAOTIC DESIGNS
      <br />
      FOR <span style={{ color: '#e6a902', textShadow: '4px 4px 0px #0f0e0f, -2px -2px 0px #000000' }}>ANYTHING</span>
      <br />
      & WILD ARCHIVES.
    </>
  ),
  subtitle = "Creating designs, from websites to graphics. 3D models, schematics, prototypes, and more. All made with care, for the late hours and slow nights.",
  primaryCta = { href: '#stories', label: 'READ CASE FILES' },
  secondaryCta = { href: '#about-me1', label: 'ABOUT ME' },
}) {
  const turntableRef = useRef(null);
  const defaultMusicUrl = 'https://www.youtube.com/watch?v=MYPVQccHhAQ&list=RDMYPVQccHhAQ&start_radio=1&t=6277s';

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
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&playsinline=1&controls=1&rel=0`;
    } catch (error) {
      return null;
    }
  };

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [embedUrl, setEmbedUrl] = useState(null);

  const playTurntableMusic = () => {
    if (!embedUrl) {
      setEmbedUrl(getYouTubeEmbed(defaultMusicUrl));
    }
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

  useEffect(() => {
    const play = () => turntableRef.current?.classList.add('is-playing');
    window.addEventListener('nocturne:curtain-open', play);
    return () => window.removeEventListener('nocturne:curtain-open', play);
  }, []);

  return (
    <header
      className="hero"
      ref={ref}
      style={{
        position: 'relative',
        backgroundColor: '#2d3030', // Deep Teal Background
        backgroundImage: `
          radial-gradient(circle at 100% 40%, #0e0d0d 0%, #0e0d0d 75%, #6e0d00 110%),
          repeating-linear-gradient(0deg, rgba(0,0,0,0.08) 0px, rgba(0,0,0,0.08) 2px, transparent 2px, transparent 4px),
          repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 16px)
        `,
        color: '#ffffff',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        padding: '90px 28px 80px 28px',
        overflow: 'hidden',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Top Banner Japanese Block Header (Crimson Red Title Box) */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: '1280px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          padding: '0 20px',
          zIndex: 4,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            // backgroundColor: '#6e0009',
            color: '#faf7f7',
            fontSize: 'clamp(2rem, 6vw, 4.2rem)',
            fontWeight: '900',
            fontFamily: '"Impact", "Arial Black", sans-serif',
            letterSpacing: '8px',
            // padding: '8px 24px 32px 24px',
            // borderBottomLeftRadius: '4px',
            // borderBottomRightRadius: '4px',
            // boxShadow: '0px 8px 24px rgba(0,0,0,0.6)',
            lineHeight: '1',
            userSelect: 'none',
            margin: '100px 120px 350px 20px',
          }}
        >
          チェンソーマン
        </div>

        {/* Right English Side Spine Text */}
        <div
          style={{
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            color: '#fdf9f8',
            fontSize: '14px',
            fontWeight: '900',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            paddingTop: '20px',
            userSelect: 'none',
          }}
        >
          CHAINSAW MAN FANATIC
        </div>
      </div>

      {/* Vertical Japanese Katakana Accent Overlay (Right Side) */}
      <div
        style={{
          position: 'absolute',
          right: '30px',
          top: '50%',
          transform: 'translateY(-50%)',
          writingMode: 'vertical-rl',
          textOrientation: 'upright',
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: '900',
          color: '#fcfcfc',
          opacity: 0.85,
          letterSpacing: '10px',
          fontFamily: '"Impact", "Arial Black", sans-serif',
          userSelect: 'none',
          pointerEvents: 'none',
          zIndex: 2,
          // textShadow: '3px 3px 0px #faf7f7, 6px 6px 0px #000000',
        }}
      >
        バディ・ストーリーズ
      </div>

      <div className="hero__glow" data-speed="0.25" />
      <div className="hero__grain" />

      {/* Main Grid Content */}
      <div
        className="hero__grid"
        style={{
          maxWidth: '1100px',
          margin: '40px auto 0',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '48px',
          alignItems: 'center',
          position: 'relative',
          zIndex: 3,
        }}
      >
        <div>
          {/* Author Credits Block Badge */}
          <div
            style={{
              display: 'inline-flex',
              flexDirection: 'column',
              backgroundColor: 'rgba(13, 36, 36, 0.85)',
              // borderLeft: '4px solid #eb6438',
              padding: '10px 16px',
              marginBottom: '24px',
              // boxShadow: '4px 4px 0px #d91424',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#ffd000', fontSize: '12px', fontWeight: '900' }}>原作</span>
              <span style={{ color: '#ffffff', fontSize: '14px', fontWeight: '900', letterSpacing: '1px' }}>藤本タツキ</span>
              <span style={{ color: '#cc0000', fontSize: '11px', fontStyle: 'italic', fontWeight: '700' }}>Arabelle</span>
            </div>
            {/* <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
              <span style={{ color: '#ffd000', fontSize: '12px', fontWeight: '900' }}>小説</span>
              <span style={{ color: '#ffffff', fontSize: '14px', fontWeight: '900', letterSpacing: '1px' }}>菱川さかく</span>
              <span style={{ color: '#eb6438', fontSize: '11px', fontStyle: 'italic', fontWeight: '700' }}>Sakaku Hishikawa</span>
            </div> */}
          </div>

          {/* Title */}
          <h1
            className="h-display hero__title"
            style={{
              fontFamily: '"Impact", "Arial Black", sans-serif',
              fontSize: 'clamp(2.6rem, 5.5vw, 4.6rem)',
              fontWeight: '900',
              lineHeight: '0.98',
              color: '#ffffff',
              textTransform: 'uppercase',
              margin: '0 0 24px 0',
              // textShadow: '4px 4px 0px #5f14d9, 8px 8px 0px #000000',
            }}
          >
            {title}
          </h1>

          {/* Color Accent Stripe Bar */}
          <div
            style={{
              display: 'flex',
              width: '180px',
              height: '8px',
              marginBottom: '28px',
              border: '2px solid #000000',
              // boxShadow: '3px 3px 0px #ffd000',
            }}
          >
            <div style={{ flex: 1, backgroundColor: '#bd0101' }} />
            <div style={{ flex: 1, backgroundColor: '#f8faf8' }} />
            <div style={{ flex: 1, backgroundColor: '#ffae00' }} />
          </div>

          {/* Description Box */}
          <p
            className="hero__sub"
            style={{
              fontSize: '15px',
              fontWeight: '600',
              color: '#e0f2f2',
              lineHeight: '1.65',
              maxWidth: '480px',
              marginBottom: '36px',
              // backgroundColor: '#112c2c',
              // padding: '18px 22px',
              // border: '3px solid #000000',
              // boxShadow: '6px 6px 0px #ffffff',
            }}
          >
            {subtitle}
          </p>

          {/* Action Buttons */}
          <div className="hero__actions" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <a
              href={primaryCta.href}
              className="btn btn--solid"
              onClick={handleHeroLink(primaryCta.href)}
              style={{
                backgroundColor: '#aa0000',
                color: '#ffffff',
                fontSize: '13px',
                fontWeight: '900',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                padding: '16px 30px',
                textDecoration: 'none',
                boxShadow: '5px 5px 0px #000000',
                border: '3px solid #000000',
                transform: 'skewX(-6deg)',
                display: 'inline-block',
                transition: 'all 0.15s ease',
              }}
            >
              {primaryCta.label}
            </a>

            <a
              href={secondaryCta.href}
              className="btn btn--ghost"
              onClick={handleHeroLink(secondaryCta.href)}
              style={{
                backgroundColor: '#ffffff',
                color: '#000000',
                fontSize: '13px',
                fontWeight: '900',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                padding: '16px 30px',
                textDecoration: 'none',
                boxShadow: '5px 5px 0px #000000',
                border: '3px solid #000000',
                transform: 'skewX(-6deg)',
                display: 'inline-block',
                transition: 'all 0.15s ease',
              }}
            >
              {secondaryCta.label}
            </a>
          </div>
        </div>

        {/* Terracotta/Teal Styled Turntable Frame */}
        <div
          className="turntable is-playing"
          ref={turntableRef}
          data-speed="-0.15"
          onClick={playTurntableMusic}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '360px',
            height: '360px',
            margin: '0 auto',
            backgroundColor: '#0e2424',
            border: '5px solid #000000',
            boxShadow: '10px 10px 0px #a30500, 18px 18px 0px #f8f5f6',
            cursor: 'pointer',
            padding: '20px',
            boxSizing: 'border-box',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div className="turntable__deck" />
          <div
            className="turntable__platter"
            style={{
              width: '82%',
              height: '82%',
              borderRadius: '50%',
              backgroundColor: '#1b4343',
              border: '4px solid #fafafa',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            <div
              className="turntable__label"
              style={{
                width: '45%',
                height: '45%',
                backgroundColor: '#fdfdfd',
                color: '#ffffff',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                fontWeight: '900',
                fontSize: '10px',
                letterSpacing: '1px',
                border: '2px solid #000000',
              }}
            >
              <span>
                POWER & DENJI
                <br />
                JAZZING
              </span>
            </div>

            {/* <div
              className="turntable__spindle"
              style={{
                width: '12px',
                height: '12px',
                backgroundColor: '#ffd000',
                borderRadius: '50%',
                position: 'absolute',
                border: '2px solid #000000',
              }}
            /> */}

          </div>
          <div className="turntable__arm" />
        </div>
      </div>

      {/* Bottom Left Novel Publisher Badge */}
      {/* <div
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '28px',
          fontSize: '12px',
          fontWeight: '900',
          letterSpacing: '2px',
          color: '#ffffff',
          backgroundColor: '#d91424',
          padding: '5px 12px',
          border: '2px solid #000000',
          boxShadow: '3px 3px 0px #ffd000',
          zIndex: 3,
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        <span>ABOUT</span>
      </div> */}

      <div className={"hero-transition-overlay" + (isTransitioning ? ' active' : '')} />

      {embedUrl && (
        <div className="music-embed-fixed">
          <iframe
            src={embedUrl}
            title="YouTube music player"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      {/* Scroll Down Cue Badge */}
      <div
        className="hero__scrollcue"
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '11px',
          fontWeight: '900',
          letterSpacing: '3px',
          color: '#080808',
          backgroundColor: '#fafafa',
          padding: '5px 14px',
          border: '2px solid #000000',
          boxShadow: '3px 3px 0px #000000',
          zIndex: 3,
        }}
      >
        SCROLL ▼
      </div>
    </header>
  );
}

/////////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useEffect, useRef, useState } from 'react';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { useGsapScope, initParallax } from './useScrollFx';

// export default function Hero({
//   eyebrow = 'BELLERAMA',
//   title = (
//     <>
//       Designs made
//       <br />
//       for <em style={{ fontStyle: 'italic', color: '#ff5252', fontFamily: '"Georgia", serif' }}>late hours</em>
//       <br />
//       and slow rooms.
//     </>
//   ),
//   subtitle = "Creating designs, from websites to graphics. 3D models, schematics, prototypes, and more. All made with care, for the late hours and slow nights.",
//   primaryCta = { href: '#releases', label: 'BROWSE CATALOG' },
//   secondaryCta = { href: '#about-me1', label: 'STUDIO DETAILS' },
// }) {
//   const turntableRef = useRef(null);
//   const defaultMusicUrl = 'https://www.youtube.com/watch?v=MYPVQccHhAQ&list=RDMYPVQccHhAQ&start_radio=1&t=6277s';

//   const getYouTubeEmbed = (url) => {
//     try {
//       const parsed = new URL(url);
//       const hostname = parsed.hostname.replace('www.', '');
//       let videoId = null;

//       if (hostname === 'youtube.com' || hostname === 'm.youtube.com') {
//         if (parsed.pathname === '/watch') {
//           videoId = parsed.searchParams.get('v');
//         }
//         if (parsed.pathname.startsWith('/shorts/')) {
//           videoId = parsed.pathname.split('/')[2];
//         }
//         if (parsed.pathname.startsWith('/embed/')) {
//           videoId = parsed.pathname.split('/')[2];
//         }
//       }
//       if (hostname === 'youtu.be') {
//         videoId = parsed.pathname.slice(1);
//       }

//       if (!videoId) return null;
//       return `https://www.youtube.com/embed/${videoId}?autoplay=1&playsinline=1&controls=1&rel=0`;
//     } catch (error) {
//       return null;
//     }
//   };

//   const [isTransitioning, setIsTransitioning] = useState(false);
//   const [embedUrl, setEmbedUrl] = useState(null);

//   const playTurntableMusic = () => {
//     if (!embedUrl) {
//       setEmbedUrl(getYouTubeEmbed(defaultMusicUrl));
//     }
//   };

//   const handleHeroLink = (href) => (event) => {
//     event.preventDefault();
//     setIsTransitioning(true);

//     const navigate = () => {
//       if (href.startsWith('#')) {
//         const target = document.querySelector(href);
//         if (target) {
//           target.scrollIntoView({ behavior: 'smooth' });
//         } else {
//           window.location.hash = href;
//         }
//       } else {
//         window.location.href = href;
//       }
//     };

//     window.setTimeout(() => {
//       navigate();
//       window.setTimeout(() => setIsTransitioning(false), 600);
//     }, 120);
//   };

//   const ref = useGsapScope((root) => {
//     initParallax(root);
//     ScrollTrigger.create({
//       trigger: root,
//       start: 'bottom 70%',
//       onLeave: () => turntableRef.current?.classList.remove('is-playing'),
//       onEnterBack: () => turntableRef.current?.classList.add('is-playing'),
//     });
//   }, []);

//   useEffect(() => {
//     const play = () => turntableRef.current?.classList.add('is-playing');
//     window.addEventListener('nocturne:curtain-open', play);
//     return () => window.removeEventListener('nocturne:curtain-open', play);
//   }, []);

//   return (
//     <header
//       className="hero"
//       ref={ref}
//       style={{
//         position: 'relative',
//         backgroundColor: '#0d282a',
//         backgroundImage: `
//           linear-gradient(180deg, #ff5252 0%, #ff5252 140px, transparent 140px),
//           radial-gradient(circle at 50% 30%, #205c5f 0%, #0d282a 80%)
//         `,
//         color: '#fff8e7',
//         fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
//         padding: '60px 24px',
//         minHeight: '100vh',
//         display: 'flex',
//         alignItems: 'center',
//         overflow: 'hidden',
//       }}
//     >
//       {/* Vol. 21 Giant Corner Number */}
//       <div
//         style={{
//           position: 'absolute',
//           top: '10px',
//           left: '24px',
//           fontSize: 'clamp(5rem, 12vw, 9rem)',
//           fontFamily: '"Georgia", "Times New Roman", serif',
//           fontWeight: '700',
//           color: '#fff8e7',
//           lineHeight: '0.8',
//           userSelect: 'none',
//           pointerEvents: 'none',
//           zIndex: 3,
//         }}
//       >
//         21
//       </div>

//       <div className="hero__glow" data-speed="0.25" />
//       <div className="hero__grain" />

//       {/* Main Grid Content */}
//       <div
//         className="hero__grid"
//         style={{
//           maxWidth: '1100px',
//           margin: '80px auto 0',
//           width: '100%',
//           display: 'grid',
//           gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
//           gap: '48px',
//           alignItems: 'center',
//           position: 'relative',
//           zIndex: 2,
//         }}
//       >
//         <div>
//           {/* Author Tag (Matching Vol 21 "Story & Art / Tatsuki Fujimoto") */}
//           <div style={{ marginBottom: '16px' }}>
//             <span
//               style={{
//                 display: 'block',
//                 fontSize: '11px',
//                 fontWeight: '700',
//                 textTransform: 'uppercase',
//                 letterSpacing: '1px',
//                 color: '#fff8e7',
//                 opacity: 0.9,
//               }}
//             >
//               STORY & ART
//             </span>
//             <h3
//               style={{
//                 margin: 0,
//                 fontSize: '1.25rem',
//                 fontWeight: '900',
//                 color: '#fff8e7',
//                 letterSpacing: '-0.5px',
//               }}
//             >
//               {eyebrow}
//             </h3>
//           </div>

//           {/* Headline Title */}
//           <h1
//             className="h-display hero__title"
//             style={{
//               fontFamily: '"Georgia", serif',
//               fontSize: 'clamp(2.5rem, 5vw, 4.25rem)',
//               fontWeight: '400',
//               lineHeight: '1.1',
//               color: '#fff8e7',
//               margin: '0 0 20px 0',
//             }}
//           >
//             {title}
//           </h1>

//           {/* Subtitle Body */}
//           <p
//             className="hero__sub"
//             style={{
//               fontSize: '14px',
//               color: '#d1e5e6',
//               lineHeight: '1.6',
//               maxWidth: '460px',
//               marginBottom: '32px',
//             }}
//           >
//             {subtitle}
//           </p>

//           {/* Chainsaw Banner Action CTA */}
//           <div
//             className="hero__actions"
//             style={{
//               display: 'inline-flex',
//               gap: '12px',
//               backgroundColor: '#111827',
//               padding: '10px 14px',
//               borderRadius: '8px',
//               border: '2px solid #ff5252',
//               boxShadow: '0 10px 25px rgba(0,0,0,0.4)',
//               flexWrap: 'wrap',
//             }}
//           >
//             <a
//               href={primaryCta.href}
//               className="btn btn--solid"
//               onClick={handleHeroLink(primaryCta.href)}
//               style={{
//                 backgroundColor: '#ff5252',
//                 color: '#ffffff',
//                 fontSize: '12px',
//                 fontWeight: '800',
//                 letterSpacing: '1.5px',
//                 textTransform: 'uppercase',
//                 padding: '12px 20px',
//                 borderRadius: '4px',
//                 textDecoration: 'none',
//                 transition: 'transform 0.2s ease',
//               }}
//             >
//               {primaryCta.label}
//             </a>

//             <a
//               href={secondaryCta.href}
//               className="btn btn--ghost"
//               onClick={handleHeroLink(secondaryCta.href)}
//               style={{
//                 backgroundColor: 'transparent',
//                 color: '#fff8e7',
//                 fontSize: '12px',
//                 fontWeight: '800',
//                 letterSpacing: '1.5px',
//                 textTransform: 'uppercase',
//                 padding: '12px 20px',
//                 border: '1px solid rgba(255, 248, 231, 0.3)',
//                 borderRadius: '4px',
//                 textDecoration: 'none',
//                 transition: 'transform 0.2s ease',
//               }}
//             >
//               {secondaryCta.label}
//             </a>
//           </div>
//         </div>

//         {/* Muted Teal / Coral Turntable Frame */}
//         <div
//           className="turntable is-playing"
//           ref={turntableRef}
//           data-speed="-0.15"
//           onClick={playTurntableMusic}
//           style={{
//             position: 'relative',
//             width: '100%',
//             maxWidth: '360px',
//             height: '360px',
//             margin: '0 auto',
//             backgroundColor: '#12393b',
//             border: '2px solid rgba(255, 82, 82, 0.5)',
//             boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
//             borderRadius: '16px',
//             cursor: 'pointer',
//             padding: '20px',
//             boxSizing: 'border-box',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//           }}
//         >
//           <div className="turntable__deck" />
//           <div
//             className="turntable__platter"
//             style={{
//               width: '82%',
//               height: '82%',
//               borderRadius: '50%',
//               backgroundColor: '#091c1d',
//               border: '2px solid #ff5252',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               position: 'relative',
//             }}
//           >
//             <div
//               className="turntable__label"
//               style={{
//                 width: '40%',
//                 height: '40%',
//                 backgroundColor: '#ff5252',
//                 color: '#fff8e7',
//                 borderRadius: '50%',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 textAlign: 'center',
//                 fontWeight: '700',
//                 fontSize: '10px',
//                 letterSpacing: '1px',
//               }}
//             >
//               <span>
//                 NOCTURNE
//                 <br />
//                 SIDE A
//               </span>
//             </div>
//             <div
//               className="turntable__spindle"
//               style={{
//                 width: '10px',
//                 height: '10px',
//                 backgroundColor: '#fff8e7',
//                 borderRadius: '50%',
//                 position: 'absolute',
//               }}
//             />
//           </div>
//           <div className="turntable__arm" />
//         </div>
//       </div>

//       <div className={"hero-transition-overlay" + (isTransitioning ? ' active' : '')} />

//       {embedUrl && (
//         <div className="music-embed-fixed">
//           <iframe
//             src={embedUrl}
//             title="YouTube music player"
//             allow="autoplay; encrypted-media; picture-in-picture"
//             allowFullScreen
//           />
//         </div>
//       )}

//       {/* Scroll Cue */}
//       <div
//         className="hero__scrollcue"
//         style={{
//           position: 'absolute',
//           bottom: '24px',
//           left: '50%',
//           transform: 'translateX(-50%)',
//           fontSize: '10px',
//           fontWeight: '700',
//           letterSpacing: '3px',
//           color: '#fff8e7',
//           opacity: 0.8,
//         }}
//       >
//         <i />
//         SCROLL
//       </div>
//     </header>
//   );
// }

//.//////////////////////////////////////////////////////////////////////////////

// import React, { useEffect, useRef, useState } from 'react';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { useGsapScope, initParallax } from './useScrollFx';

// export default function Hero({
//   eyebrow = '藤本タツキ // TATSUKI FUJIMOTO',
//   title = (
//     <>
//       DESIGNS MADE
//       <br />
//       FOR <span style={{ color: '#00ff2b', textShadow: '4px 4px 0px #000, -2px -2px 0px #ffe600' }}>LATE HOURS</span>
//       <br />
//       & SLOW ROOMS.
//     </>
//   ),
//   subtitle = "Creating raw visuals, from web layouts to manga graphics. 3D models, schematics, prototypes, and dark aesthetics. All crafted for the midnight grind.",
//   primaryCta = { href: '#releases', label: 'BROWSE CATALOG ►' },
//   secondaryCta = { href: '#about-me1', label: 'INSIDE STUDIO [01]' },
// }) {
//   const turntableRef = useRef(null);
//   const defaultMusicUrl = 'https://www.youtube.com/watch?v=MYPVQccHhAQ&list=RDMYPVQccHhAQ&start_radio=1&t=6277s';

//   const getYouTubeEmbed = (url) => {
//     try {
//       const parsed = new URL(url);
//       const hostname = parsed.hostname.replace('www.', '');
//       let videoId = null;

//       if (hostname === 'youtube.com' || hostname === 'm.youtube.com') {
//         if (parsed.pathname === '/watch') {
//           videoId = parsed.searchParams.get('v');
//         }
//         if (parsed.pathname.startsWith('/shorts/')) {
//           videoId = parsed.pathname.split('/')[2];
//         }
//         if (parsed.pathname.startsWith('/embed/')) {
//           videoId = parsed.pathname.split('/')[2];
//         }
//       }
//       if (hostname === 'youtu.be') {
//         videoId = parsed.pathname.slice(1);
//       }

//       if (!videoId) return null;
//       return `https://www.youtube.com/embed/${videoId}?autoplay=1&playsinline=1&controls=1&rel=0`;
//     } catch (error) {
//       return null;
//     }
//   };

//   const [isTransitioning, setIsTransitioning] = useState(false);
//   const [embedUrl, setEmbedUrl] = useState(null);

//   const playTurntableMusic = () => {
//     if (!embedUrl) {
//       setEmbedUrl(getYouTubeEmbed(defaultMusicUrl));
//     }
//   };

//   const handleHeroLink = (href) => (event) => {
//     event.preventDefault();
//     setIsTransitioning(true);

//     const navigate = () => {
//       if (href.startsWith('#')) {
//         const target = document.querySelector(href);
//         if (target) {
//           target.scrollIntoView({ behavior: 'smooth' });
//         } else {
//           window.location.hash = href;
//         }
//       } else {
//         window.location.href = href;
//       }
//     };

//     window.setTimeout(() => {
//       navigate();
//       window.setTimeout(() => setIsTransitioning(false), 600);
//     }, 120);
//   };

//   const ref = useGsapScope((root) => {
//     initParallax(root);
//     ScrollTrigger.create({
//       trigger: root,
//       start: 'bottom 70%',
//       onLeave: () => turntableRef.current?.classList.remove('is-playing'),
//       onEnterBack: () => turntableRef.current?.classList.add('is-playing'),
//     });
//   }, []);

//   useEffect(() => {
//     const play = () => turntableRef.current?.classList.add('is-playing');
//     window.addEventListener('nocturne:curtain-open', play);
//     return () => window.removeEventListener('nocturne:curtain-open', play);
//   }, []);

//   return (
//     <header
//       className="hero"
//       ref={ref}
//       style={{
//         position: 'relative',
//         backgroundColor: '#ff4500',
//         color: '#ffffff',
//         fontFamily: '"Impact", "Arial Black", sans-serif',
//         padding: '80px 24px',
//         overflow: 'hidden',
//         minHeight: '100vh',
//         display: 'flex',
//         alignItems: 'center',
//         backgroundImage: `
//           radial-gradient(circle at 80% 20%, #00ff2b 0%, transparent 45%),
//           radial-gradient(circle at 10% 80%, #111111 0%, transparent 50%),
//           repeating-linear-gradient(45deg, rgba(0,0,0,0.05) 0px, rgba(0,0,0,0.05) 10px, transparent 10px, transparent 20px)
//         `,
//       }}
//     >
//       {/* Giant Background Japanese Katakana (Chainsaw Man Vol 1 Header Title Style) */}
//       <div
//         style={{
//           position: 'absolute',
//           top: '-20px',
//           left: '50%',
//           transform: 'translateX(-50%)',
//           width: '100%',
//           textAlign: 'center',
//           fontSize: 'clamp(5rem, 18vw, 16rem)',
//           fontWeight: '900',
//           color: '#ffe600',
//           opacity: 0.85,
//           userSelect: 'none',
//           pointerEvents: 'none',
//           letterSpacing: '-2px',
//           textShadow: '8px 8px 0px #000000',
//           zIndex: 1,
//           lineHeight: 0.8,
//         }}
//       >
//         チェンソーマン
//       </div>

//       {/* Vol. 1 Corner Badge */}
//       <div
//         style={{
//           position: 'absolute',
//           bottom: '30px',
//           right: '30px',
//           fontSize: 'clamp(6rem, 14vw, 12rem)',
//           fontWeight: '900',
//           color: '#e60000',
//           textShadow: '6px 6px 0px #000',
//           lineHeight: '0.8',
//           userSelect: 'none',
//           pointerEvents: 'none',
//           zIndex: 3,
//         }}
//       >
//         1
//       </div>

//       <div className="hero__glow" data-speed="0.25" />
//       <div className="hero__grain" />

//       {/* Main Grid Content */}
//       <div
//         className="hero__grid"
//         style={{
//           maxWidth: '1200px',
//           margin: '0 auto',
//           width: '100%',
//           display: 'grid',
//           gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
//           gap: '40px',
//           alignItems: 'center',
//           position: 'relative',
//           zIndex: 2,
//         }}
//       >
//         <div>
//           {/* Manga Publisher Tag */}
//           <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
//             <span
//               style={{
//                 backgroundColor: '#000000',
//                 color: '#ffffff',
//                 fontWeight: '900',
//                 padding: '4px 8px',
//                 fontSize: '11px',
//                 letterSpacing: '2px',
//                 transform: 'rotate(-2deg)',
//                 display: 'inline-block',
//                 border: '2px solid #00ff2b',
//               }}
//             >
//               JUMP COMICS
//             </span>
//             <p
//               className="eyebrow hero__eyebrow"
//               style={{
//                 fontSize: '13px',
//                 fontWeight: '900',
//                 textTransform: 'uppercase',
//                 letterSpacing: '2px',
//                 color: '#000000',
//                 margin: 0,
//                 backgroundColor: '#ffe600',
//                 padding: '2px 8px',
//               }}
//             >
//               {eyebrow}
//             </p>
//           </div>

//           {/* Aggressive Manga Header Title */}
//           <h1
//             className="h-display hero__title"
//             style={{
//               fontSize: 'clamp(2.8rem, 6vw, 5rem)',
//               fontWeight: '900',
//               lineHeight: '0.95',
//               color: '#ffffff',
//               textTransform: 'uppercase',
//               letterSpacing: '-1px',
//               margin: '0 0 24px 0',
//               textShadow: '6px 6px 0px #000000',
//             }}
//           >
//             {title}
//           </h1>

//           {/* Green Splatter Divider Bar */}
//           <div
//             style={{
//               width: '100%',
//               maxWidth: '320px',
//               height: '10px',
//               backgroundColor: '#00ff2b',
//               marginBottom: '24px',
//               border: '2px solid #000',
//               boxShadow: '4px 4px 0px #000',
//             }}
//           />

//           {/* Subtitle Box */}
//           <p
//             className="hero__sub"
//             style={{
//               fontFamily: 'system-ui, -apple-system, sans-serif',
//               fontSize: '15px',
//               fontWeight: '700',
//               color: '#ffffff',
//               lineHeight: '1.6',
//               maxWidth: '500px',
//               marginBottom: '36px',
//               backgroundColor: '#111111',
//               padding: '16px',
//               border: '3px solid #000000',
//               boxShadow: '6px 6px 0px #00ff2b',
//             }}
//           >
//             {subtitle}
//           </p>

//           {/* Action CTA Buttons */}
//           <div className="hero__actions" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
//             <a
//               href={primaryCta.href}
//               className="btn btn--solid"
//               onClick={handleHeroLink(primaryCta.href)}
//               style={{
//                 backgroundColor: '#ffe600',
//                 color: '#000000',
//                 fontSize: '14px',
//                 fontWeight: '900',
//                 letterSpacing: '2px',
//                 textTransform: 'uppercase',
//                 padding: '16px 28px',
//                 textDecoration: 'none',
//                 boxShadow: '6px 6px 0px #000000',
//                 border: '3px solid #000000',
//                 transform: 'skewX(-8deg)',
//                 transition: 'all 0.15s ease',
//                 display: 'inline-block',
//               }}
//             >
//               {primaryCta.label}
//             </a>

//             <a
//               href={secondaryCta.href}
//               className="btn btn--ghost"
//               onClick={handleHeroLink(secondaryCta.href)}
//               style={{
//                 backgroundColor: '#00ff2b',
//                 color: '#000000',
//                 fontSize: '14px',
//                 fontWeight: '900',
//                 letterSpacing: '2px',
//                 textTransform: 'uppercase',
//                 padding: '16px 28px',
//                 textDecoration: 'none',
//                 boxShadow: '6px 6px 0px #000000',
//                 border: '3px solid #000000',
//                 transform: 'skewX(-8deg)',
//                 transition: 'all 0.15s ease',
//                 display: 'inline-block',
//               }}
//             >
//               {secondaryCta.label}
//             </a>
//           </div>
//         </div>

//         {/* High-Contrast Turntable Frame */}
//         <div
//           className="turntable is-playing"
//           ref={turntableRef}
//           data-speed="-0.15"
//           onClick={playTurntableMusic}
//           style={{
//             position: 'relative',
//             width: '100%',
//             maxWidth: '380px',
//             height: '380px',
//             margin: '0 auto',
//             backgroundColor: '#111111',
//             border: '5px solid #000000',
//             boxShadow: '12px 12px 0px #00ff2b',
//             borderRadius: '4px',
//             cursor: 'pointer',
//             padding: '20px',
//             boxSizing: 'border-box',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//           }}
//         >
//           <div className="turntable__deck" />
//           <div
//             className="turntable__platter"
//             style={{
//               width: '82%',
//               height: '82%',
//               borderRadius: '50%',
//               border: '4px solid #ffe600',
//               backgroundColor: '#222222',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               position: 'relative',
//               boxShadow: 'inset 0 0 20px #000',
//             }}
//           >
//             <div
//               className="turntable__label"
//               style={{
//                 width: '45%',
//                 height: '45%',
//                 backgroundColor: '#ff4500',
//                 color: '#ffe600',
//                 border: '2px solid #000000',
//                 borderRadius: '50%',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 textAlign: 'center',
//                 fontWeight: '900',
//                 fontSize: '11px',
//                 letterSpacing: '1px',
//               }}
//             >
//               <span>
//                 CHAINSAW
//                 <br />
//                 SIDE A
//               </span>
//             </div>
//             <div
//               className="turntable__spindle"
//               style={{
//                 width: '12px',
//                 height: '12px',
//                 backgroundColor: '#00ff2b',
//                 borderRadius: '50%',
//                 position: 'absolute',
//                 border: '2px solid #000',
//               }}
//             />
//           </div>
//           <div className="turntable__arm" />
//         </div>
//       </div>

//       <div className={"hero-transition-overlay" + (isTransitioning ? ' active' : '')} />

//       {embedUrl && (
//         <div className="music-embed-fixed">
//           <iframe
//             src={embedUrl}
//             title="YouTube music player"
//             allow="autoplay; encrypted-media; picture-in-picture"
//             allowFullScreen
//           />
//         </div>
//       )}

//       {/* Manga Scroll Indicator */}
//       <div
//         className="hero__scrollcue"
//         style={{
//           position: 'absolute',
//           bottom: '20px',
//           left: '50%',
//           transform: 'translateX(-50%)',
//           fontSize: '12px',
//           fontWeight: '900',
//           letterSpacing: '4px',
//           color: '#000000',
//           backgroundColor: '#ffe600',
//           padding: '4px 12px',
//           border: '2px solid #000',
//           boxShadow: '3px 3px 0px #000',
//           display: 'flex',
//           alignItems: 'center',
//           gap: '8px',
//         }}
//       >
//         SCROLL DOWN ▼
//       </div>
//     </header>
//   );
// }