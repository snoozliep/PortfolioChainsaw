
import React, { useState } from 'react';
import './App.css';
import FoldersSection from './FoldersSection';

const cards = [
  {
    title: 'Nebula Explorer',
    description: 'Discover the mysteries of colorful nebulae.',
    color: 'green',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    extra: 'Nebulae are vast clouds of dust and gas in space, often the birthplace of stars.'
  },
  {
    title: 'Blue Star',
    description: 'Learn about the hottest stars in the galaxy.',
    color: 'blue',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    extra: 'Blue stars are the hottest and most luminous, burning at temperatures above 10,000K.'
  },
  {
    title: 'Purple Planet',
    description: 'Visit distant worlds with vibrant hues.',
    color: 'purple',
    image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=400&q=80',
    extra: 'Some exoplanets have atmospheres that scatter light, giving them a purple appearance.'
  },
  {
    title: 'Pink Comet',
    description: 'Chase comets across the cosmic sky.',
    color: 'pink',
    image: 'https://images.unsplash.com/photo-1465101178521-c1a4c8a0f0c5?auto=format&fit=crop&w=400&q=80',
    extra: 'Comets are icy bodies that release gas and dust, creating beautiful tails as they approach the sun.'
  },
];


function App() {
  const [popupCard, setPopupCard] = useState(null);
  const [isLightMode, setIsLightMode] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const [lightPos, setLightPos] = useState({ x: -9999, y: -9999 });
  const [landingLit, setLandingLit] = useState(false);
  const [skullClicked, setSkullClicked] = useState(false);

  React.useEffect(() => {
    const handleMouseMove = (e) => {
      setLightPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleCardClick = (card) => {
    setPopupCard(card);
  };

  const closePopup = () => {
    setPopupCard(null);
  };

  const toggleTheme = () => {
    setIsLightMode((prev) => !prev);
  };

  const handleShowCards = () => {
    setShowCards((prev) => !prev);
  };

  // Use torch cursor in dark mode with flashlight effect
  const flashlightActive = !isLightMode && !skullClicked;
  // Torch cursor only when skull is clicked (flashlight mode)
  const showTorchCursor = !isLightMode && !skullClicked;
  return (
    <div
      className={
        (isLightMode ? 'light-mode knife-cursor' : (showTorchCursor ? 'flashlight-cursor' : 'knife-cursor'))
      }
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* Flashlight effect overlay in dark mode, disappears only when skull emoji is clicked */}
      {!isLightMode && !skullClicked && (
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
      <button
        style={{
          position: 'fixed',
          right: 24,
          bottom: 24,
          zIndex: 10001,
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
      {/* ...existing code... */}
      <section className="landing-page">
        <div className="container">
          <h1>Arabelle's Portfolio</h1>
          {/* <p>Join our community and receive the care you deserve.</p> */}
          <a
            href="#about-me"
            className="cta-button"
            title="Learn More"
            style={{fontSize: '2.2rem', display: 'inline-block', textDecoration: 'none'}}
            onClick={e => {
              e.preventDefault();
              setSkullClicked(prev => !prev);
            }}
          >
            <span role="img" aria-label="skull">💀</span>
          </a>
        </div>
      </section>
      <div className="galaxy-bg">
        <div className="header-bar">
        <div className="header-left" onClick={handleShowCards} style={{cursor: 'pointer'}}>
          <img src="https://www.pngmart.com/files/23/Pochita-PNG.png" alt="Logo" />
        </div>
        <nav className="header-right">
          <a
            href="#home"
            onClick={e => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >Home</a>
          <a
            href="#about-me"
            onClick={e => {
              e.preventDefault();
              document.getElementById('about-me')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >About</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>

      
      <main className="about-body">
        {/* Bento Block 1: Personal Intro */}
        <section className="about-bento about-me" id="about-me">
          <h2 className="galaxy-header">About Me</h2>
          <p>
            I am a Mechanical Engineering student, juggling multiple skills and hobbies for me to make a living whilst being creative. Learn more about me from my <a href="https://aziee13.uwu.ai/#blog">carrd.io.</a> To check my certificates, visit my Linkedln!
          </p>
        </section>

        {/* Bento Block 2: Skills & Interests */}
        <section className="about-bento skills">
          <h2 className="galaxy-header">Skills & Interests</h2>
          <ul>
            <li>🌌 Space Enthusiast</li>
            <li>💻 Web Developer</li>
            <li>🎨 Creative Designer</li>
            <li>🚀 Lifelong Learner</li>
          </ul>
        </section>

        {/* Bento Block 3: Projects */}
        <section className="about-bento projects">
          <h2 className="galaxy-header">Activities and Societies:</h2>
          <ul style={{
            listStyle: 'none',
            display: 'block',
            margin: '8px 0 0 24px',
            paddingLeft: '12px',
            color: '#e0e0ff',
            fontSize: '0.85rem',
          }}>
            <li style={{display: 'flex', alignItems: 'center', marginBottom: '.18rem', background: 'transparent', color: '#fff', padding: '0.08rem 0.18rem', borderRadius: '12px', fontWeight: 500, fontSize: '0.85rem', boxShadow: 'none', letterSpacing: '0.05em'}}><span style={{marginRight: '6px', fontSize: '1.1em'}}>🎮</span>Mapúa Gaming Society</li>
            <li style={{display: 'flex', alignItems: 'center', marginBottom: '.18rem', background: 'transparent', color: '#fff', padding: '0.08rem 0.18rem', borderRadius: '12px', fontWeight: 500, fontSize: '0.85rem', boxShadow: 'none', letterSpacing: '0.05em'}}><span style={{marginRight: '6px', fontSize: '1.1em'}}>🏆</span>AcadArena</li>
            <li style={{display: 'flex', alignItems: 'center', marginBottom: '.18rem', background: 'transparent', color: '#fff', padding: '0.08rem 0.18rem', borderRadius: '12px', fontWeight: 500, fontSize: '0.85rem', boxShadow: 'none', letterSpacing: '0.05em'}}><span style={{marginRight: '6px', fontSize: '1.1em'}}>🕹️</span>Mapúa Gaming Concencus</li>
            <li style={{display: 'flex', alignItems: 'center', marginBottom: '.18rem', background: 'transparent', color: '#fff', padding: '0.08rem 0.18rem', borderRadius: '12px', fontWeight: 500, fontSize: '0.85rem', boxShadow: 'none', letterSpacing: '0.05em'}}><span style={{marginRight: '6px', fontSize: '1.1em'}}>🔧</span>Pambansang Samahan ng Inhenyero Mekanikal</li>
            <li style={{display: 'flex', alignItems: 'center', marginBottom: '.18rem', background: 'transparent', color: '#fff', padding: '0.08rem 0.18rem', borderRadius: '12px', fontWeight: 500, fontSize: '0.85rem', boxShadow: 'none', letterSpacing: '0.05em'}}><span style={{marginRight: '6px', fontSize: '1.1em'}}>🚗</span>Mapúa University Collegiate Chapter of the SAE International</li>
            <li style={{display: 'flex', alignItems: 'center', marginBottom: '.18rem', background: 'transparent', color: '#fff', padding: '0.08rem 0.18rem', borderRadius: '12px', fontWeight: 500, fontSize: '0.85rem', boxShadow: 'none', letterSpacing: '0.05em'}}><span style={{marginRight: '6px', fontSize: '1.1em'}}>🤖</span>ARISE MAPÚA</li>
            <li style={{display: 'flex', alignItems: 'center', background: 'transparent', color: '#fff', padding: '0.08rem 0.18rem', borderRadius: '12px', fontWeight: 500, fontSize: '0.85rem', boxShadow: 'none', letterSpacing: '0.05em'}}><span style={{marginRight: '6px', fontSize: '1.1em'}}>🧬</span>BioLOGIC</li>
          </ul>
        </section>

        {/* Bento Block 4: Contact Info */}
        <section className="about-bento contact">
          <h2 className="galaxy-header">Contact</h2>
          <ul className="actions prettier-actions">
            <li>
              <a href="https://ko-fi.com/ceyla13" className="button scrolly prettier-btn ko-fi" target="_blank">
                <span role="img" aria-label="Ko-Fi" style={{marginRight: '8px'}}>☕</span>Ko-Fi
              </a>
            </li>
            <li>
              <a href="#one" className="button scrolly prettier-btn paypal" target="_blank">
                <span role="img" aria-label="Paypal" style={{marginRight: '8px'}}>💸</span>Paypal
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/arabelle-l-406911222/" className="button scrolly prettier-btn linkedin" target="_blank">
                <span role="img" aria-label="LinkedIn" style={{marginRight: '8px'}}>💼</span>LinkedIn
              </a>
            </li>
            <li>
              <a href="https://open.spotify.com/user/31obpbuz7oxvsrhwn6ijquvmejtq" className="button scrolly prettier-btn spotify" target="_blank">
                <span role="img" aria-label="Spotify" style={{marginRight: '8px'}}>🎵</span>Spotify
              </a>
            </li>
            <li>
              <a href="https://aziee13.uwu.ai/" className="button scrolly prettier-btn carrd" target="_blank">
                <span role="img" aria-label="Carrd.io" style={{marginRight: '8px'}}>🪐</span>Carrd.io
              </a>
            </li>
          </ul>
        </section>


        {/* Bento Block 6: Edit Guide */}
        <section className="about-bento extra">
          <h2 className="galaxy-header">Education</h2>
          <p>
            Mapúa University - Bachelor's degree, Mechanical Engineering</p>
            <br></br>
        </section>
      </main>
      {/* Folders Section below bentos */}
      <FoldersSection />
      {showCards && (
        <div className="card-grid">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className={`galaxy-card ${card.color}`}
              onClick={() => handleCardClick(card)}
              style={{ cursor: 'pointer' }}
            >
              <h2>{card.title}</h2>
              <p>{card.description}</p>
            </div>
          ))}
        </div>
      )}

      {popupCard && (
        <div className="card-popup-overlay" onClick={closePopup}>
          <div className={`card-popup ${popupCard.color}`} onClick={e => e.stopPropagation()}>
            <button className="card-popup-close" onClick={closePopup}>&times;</button>
            <h2>{popupCard.title}</h2>
            <p>{popupCard.description}</p>
            {popupCard.image && (
              <img src={popupCard.image} alt={popupCard.title} style={{maxWidth: '100%', borderRadius: '8px', margin: '18px 0'}} />
            )}
            {popupCard.extra && (
              <div style={{marginTop: '10px', fontSize: '1.08rem', color: '#e0e0ff'}}>
                {popupCard.extra}
              </div>
            )}
          </div>
        </div>
      )}
      <footer className="galaxy-footer">
        <p>© 2025 Arabelle. All rights reserved.</p>
      </footer>
    </div>
    </div>
  );
}

export default App;

