import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Analytics } from "@vercel/analytics/react";
import './App.css';
import './Bubble.css';
import FoldersSection from './FoldersSection.js';
import CyberNavbar from './components/CyberNavbar';
import { Curtain, Hero } from './components/Parallax';
import { MarqueeBanner } from './components/MarqueeBanner.jsx';
import { FairyGalleryModal } from './components/FairyGalleryModal.jsx';
import { ContactFormCard } from './components/ContactFormCard.jsx';



const skullSound = typeof window !== 'undefined' ? new Audio('skull.ogg') : null;

const CARDS = [
  {
    title: 'Nebula Explorer',
    description: 'Discover the mysteries of colorful nebulae.',
    color: 'green',
    image: './3d.png',
    extra: 'Nebulae are vast clouds of dust and gas in space, often the birthplace of stars.'
  },
  {
    title: 'Blue Star',
    description: 'Learn about the hottest stars in the galaxy.',
    color: 'blue',
    image: 'electronics.png',
    extra: 'Blue stars are the hottest and most luminous, burning at temperatures above 10,000K.'
  },
  {
    title: 'Purple Planet',
    description: 'Visit distant worlds with vibrant hues.',
    color: 'purple',
    image: 'website.png',
    extra: 'Some exoplanets have atmospheres that scatter light, giving them a purple appearance.'
  },
  {
    title: 'Pink Comet',
    description: 'Chase comets across the cosmic sky.',
    color: 'pink',
    image: 'graphics.png',
    extra: 'Comets are icy bodies that release gas and dust, creating beautiful tails as they approach the sun.'
  },
  {
    title: 'Golden Asteroid',
    description: 'Uncover the secrets of metallic asteroids.',
    color: 'yellow',
    image: 'mech.png',
    extra: 'Metallic asteroids contain precious metals and may be future mining targets.'
  }
];

const ACTIVITIES = [
  { icon: '🎮', name: 'Mapúa Gaming Society' },
  { icon: '🏆', name: 'AcadArena' },
  { icon: '🕹️', name: 'Mapúa Gaming Consensus' },
  { icon: '🔧', name: 'Pambansang Samahan ng Inhenyero Mekanikal' },
  { icon: '🚗', name: 'Mapúa University Collegiate Chapter of SAE International' },
  { icon: '🤖', name: 'ARISE MAPÚA' },
  { icon: '🧬', name: 'BioLOGIC' }
];

function App() {
  const [isLightMode, setIsLightMode] = useState(false);
  const [skullClicked, setSkullClicked] = useState(false);
  const [popupCard, setPopupCard] = useState(null);
  const [showAllCardsPopup] = useState(false);
  const [popupFolder, setPopupFolder] = useState(null);
  const [lightPos, setLightPos] = useState({ x: 0, y: 0 });

  const bubbles = useMemo(() => 
    Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      size: Math.random() * 50 + 20,
      left: Math.random() * 100,
      delay: Math.random() * 12,
      duration: Math.random() * 10 + 10,
      randomX: Math.random() * 200 - 100,
    })), 
  []);

  useEffect(() => {
    let animationFrameId = null;

    const handleMouseMove = (e) => {
      if (animationFrameId) return;
      animationFrameId = requestAnimationFrame(() => {
        setLightPos({ x: e.clientX, y: e.clientY });
        animationFrameId = null;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const toggleTheme = useCallback(() => setIsLightMode(prev => !prev), []);
  const closePopup = useCallback(() => setPopupCard(null), []);

  const handleSkullClick = useCallback(() => {
    setSkullClicked(prev => !prev);
    if (skullSound) {
      skullSound.currentTime = 0;
      skullSound.play().catch(() => {});
    }
  }, []);

  return (
    <>
      <div className="bubble-container">
        {bubbles.map((bubble) => (
          <div
            key={bubble.id}
            className="smoke"
            style={{
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              left: `${bubble.left}vw`,
              animationDelay: `${bubble.delay}s`,
              animationDuration: `${bubble.duration}s`,
              '--random-x': `${bubble.randomX}px`,
            }}
          />
        ))}
      </div>

      <div
        className={
          isLightMode
            ? 'light-mode knife-cursor'
            : (skullClicked ? 'flashlight-cursor' : 'knife-cursor')
        }
        style={{ position: 'relative', overflow: 'hidden' }}
      >
        {!isLightMode && skullClicked && (
          <div
            style={{
              pointerEvents: 'none',
              position: 'fixed',
              left: 0,
              top: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 10000,
              background: `radial-gradient(circle 180px at ${lightPos.x}px ${lightPos.y}px, rgba(0,0,0,0) 0%, rgba(0,0,0,0.92) 100%)`,
              transition: 'background 0.08s',
            }}
          />
        )}

        <div
          style={{
            position: 'fixed',
            right: 24,
            bottom: 24,
            zIndex: 10001,
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <button
            type="button"
            aria-label="Toggle flashlight effect"
            style={{
              background: 'none',
              border: 'none',
              fontSize: '2.2rem',
              cursor: 'pointer',
              transition: 'transform 0.15s',
              userSelect: 'none',
              padding: 0
            }}
            onClick={handleSkullClick}
          >
            💀
          </button>
          <button
            type="button"
            style={{
              padding: '10px 18px',
              borderRadius: '8px',
              border: 'none',
              background: isLightMode ? '#222' : '#fff',
              color: isLightMode ? '#fff' : '#222',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.12)'
            }}
            onClick={toggleTheme}
          >
            {isLightMode ? '🌙 Dark Mode' : '☀️ Light Mode'}
          </button>
        </div>

        <Curtain />
        
        <CyberNavbar />
        <Hero />
        <div  id="about-me"></div>
        <div className="w-full min-h-screen bg-slate-900 py-10">
          <MarqueeBanner />
        </div>

        <main className="about-body" id="about-me1">
          <section className="about-bento about-me">
            <h2 className="galaxy-header">About Me</h2>
            <p style={{ fontSize: '0.92rem', lineHeight: '1.7' }}>
              I am a Mechanical Engineering student, juggling multiple skills and hobbies to make a living while staying creative. Learn more about me from my <a href="https://azie13.carrd.co/" target="_blank" rel="noreferrer">carrd.co</a>. To check my certifications, visit my LinkedIn! My hobbies include gaming, music, art, and web development.
            </p>
          </section>

          <section className="about-bento skills">
            <h2 className="galaxy-header">Skills & Interests</h2>
            <ul>
              <li>🌌 Space Enthusiast</li>
              <li>💻 Web Developer</li>
              <li>🎨 Creative Designer</li>
              <li>🚀 Lifelong Learner</li>
            </ul>
          </section>

          <section className="about-bento projects">
            <h2 className="galaxy-header">Activities & Societies</h2>
            <ul style={{
              listStyle: 'none',
              display: 'block',
              margin: '8px 0 0 24px',
              paddingLeft: '12px',
              color: '#e0e0ff',
              fontSize: '0.85rem',
            }}>
              {ACTIVITIES.map((item, idx) => (
                <li key={idx} style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '.18rem',
                  background: 'transparent',
                  color: '#fff',
                  padding: '0.08rem 0.18rem',
                  borderRadius: '12px',
                  fontWeight: 500,
                  letterSpacing: '0.05em'
                }}>
                  <span style={{ marginRight: '6px', fontSize: '1.1em' }}>{item.icon}</span>
                  {item.name}
                </li>
              ))}
            </ul>
          </section>

          <section className="about-bento contact">
            <h2 className="galaxy-header">Contact & Works</h2>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '0px', justifyContent: 'center', alignItems: 'center', marginTop: '8px', width: '100%' }}>
              <ul className="actions prettier-actions" style={{ flex: 1, textAlign: 'center', margin: 0 }}>
                <li>
                  <a href="https://ko-fi.com/ceyla13" className="button scrolly prettier-btn ko-fi" target="_blank" rel="noreferrer">
                    <span role="img" aria-label="Ko-Fi" style={{ marginRight: '-5px' }}>☕</span>Ko-Fi
                  </a>
                </li>
                <li>
                  <a href="#paypal" className="button scrolly prettier-btn paypal" target="_blank" rel="noreferrer">
                    <span role="img" aria-label="Paypal" style={{ marginRight: '-5px' }}>💸</span>Paypal
                  </a>
                </li>
                <li>
                  <a href="https://open.spotify.com/user/31obpbuz7oxvsrhwn6ijquvmejtq" className="button scrolly prettier-btn spotify" target="_blank" rel="noreferrer">
                    <span role="img" aria-label="Spotify" style={{ marginRight: '-5px' }}>🎵</span>Spotify
                  </a>
                </li>
                <li>
                  <a href="https://azie13.carrd.co/" className="button scrolly prettier-btn carrd" target="_blank" rel="noreferrer">
                    <span role="img" aria-label="Carrd" style={{ marginRight: '-5px' }}>🪐</span>Carrd.io
                  </a>
                </li>
              </ul>
              <ul className="actions prettier-actions" style={{ flex: 1, textAlign: 'center', margin: 0 }}>
                <li>
                  <a href="https://www.behance.net/snoozliep" className="button scrolly prettier-btn carrd" target="_blank" rel="noreferrer">
                    Behance
                  </a>
                </li>
                <li>
                  <a href="https://github.com/snoozliep" className="button scrolly prettier-btn paypal" target="_blank" rel="noreferrer">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="https://deserted-dust-7d5.notion.site/Template-1-1515e3ffa0e780e4b4b0c72bb7687537?pvs=4" className="button scrolly prettier-btn ko-fi" target="_blank" rel="noreferrer">
                    Notion
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/arabelle-l-406911222/" className="button scrolly prettier-btn linkedin" target="_blank" rel="noreferrer">
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </section>

          <section className="about-bento extra">
            <div className="info-card education-card">
              <h2 className="galaxy-header">Education</h2>
              <div className="info-card-title">🎓 Mapúa University</div>
              <div className="info-card-detail">BS Mechanical Engineering</div>
            </div>
            <div className="info-card work-card">
              <h2 className="galaxy-header">Work</h2>
              <div className="info-card-title">🛠️ Freelance Web Developer</div>
              <div className="info-card-detail">Various clients & personal projects</div>
            </div>
          </section>
        </main>

        {showAllCardsPopup && (
          <div className="card-grid">
            {CARDS.map((card, idx) => (
              <div key={idx} className={`galaxy-card ${card.color}`} style={{ cursor: 'pointer' }} onClick={() => setPopupCard(card)}>
                <h2 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '8px' }}>{card.title}</h2>
                <p style={{ fontSize: '0.98rem', color: '#e0e0ff', marginBottom: '8px' }}>{card.description}</p>
              </div>
            ))}
          </div>
        )}

        {popupCard && (
          <div className="card-popup-overlay" onClick={closePopup}>
            <div className={`card-popup ${popupCard.color}`} onClick={e => e.stopPropagation()}>
              <button type="button" className="card-popup-close" onClick={closePopup}>&times;</button>
              <h2>{popupCard.title}</h2>
              <p>{popupCard.description}</p>
              {popupCard.image && (
                <img src={popupCard.image} alt={popupCard.title} style={{ maxWidth: '100%', borderRadius: '8px', margin: '18px 0' }} />
              )}
              {popupCard.extra && (
                <div style={{ marginTop: '10px', fontSize: '1.08rem', color: '#e0e0ff' }}>
                  {popupCard.extra}
                </div>
              )}
            </div>
          </div>
        )}

        <div className="w-full min-h-screen bg-slate-900 py-10" style={{ transform: 'rotate(2deg)' }}>
          <MarqueeBanner />
        </div>

        <FoldersSection popupFolder={popupFolder} setPopupFolder={setPopupFolder} />
        <FairyGalleryModal />
        <div id="contact" className="contact-wrapper">
        <ContactFormCard />
        </div>

        <footer className="galaxy-footer">
          <p>© 2025 Arabelle. All rights reserved.</p>
        </footer>
        <Analytics />
      </div>
    </>
  );
}

export default App;