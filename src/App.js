
import React, { useState } from 'react';
import './App.css';

const cards = [
  {
    title: 'Nebula Explorer',
    description: 'Discover the mysteries of colorful nebulae.',
    color: 'green',
  },
  {
    title: 'Blue Star',
    description: 'Learn about the hottest stars in the galaxy.',
    color: 'blue',
  },
  {
    title: 'Purple Planet',
    description: 'Visit distant worlds with vibrant hues.',
    color: 'purple',
  },
  {
    title: 'Pink Comet',
    description: 'Chase comets across the cosmic sky.',
    color: 'pink',
  },
];

function App() {
  const [popupCard, setPopupCard] = useState(null);
  const [isLightMode, setIsLightMode] = useState(false);

  const handleCardClick = (card) => {
    setPopupCard(card);
  };

  const closePopup = () => {
    setPopupCard(null);
  };

  const toggleTheme = () => {
    setIsLightMode((prev) => !prev);
  };

  return (
    <div className={isLightMode ? 'light-mode' : ''}>
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
          <a href="#" className="cta-button">Learn More</a>
        </div>
      </section>
      <div className="galaxy-bg">
        <div className="header-bar">
        <div className="header-left">
          <img src="https://www.pngmart.com/files/23/Pochita-PNG.png" alt="Logo" />
        </div>
        <nav className="header-right">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>

      
      <main className="about-body">
        {/* Bento Block 1: Personal Intro */}
        <section className="about-bento about-me">
          <h2 className="galaxy-header">About Me</h2>
          <p>
            Hi, I'm Panget! I love exploring the galaxy, building creative web projects, and sharing cosmic discoveries. My goal is to inspire curiosity and wonder about the universe.
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
          <h2 className="galaxy-header">Featured Projects</h2>
          <ul>
            <li>Galaxy Card App</li>
            <li>Stargazer Blog</li>
            <li>Space Quiz Game</li>
          </ul>
        </section>

        {/* Bento Block 4: Contact Info */}
        <section className="about-bento contact">
          <h2 className="galaxy-header">Contact</h2>
          <ul>
            <li>Email: panget@spacegalaxy.com</li>
            <li>Twitter: @panget_space</li>
            <li>GitHub: github.com/panget</li>
          </ul>
        </section>


        {/* Bento Block 6: Edit Guide */}
        <section className="about-bento extra">
          <h2 className="galaxy-header">How to Edit</h2>
          <p>
            To customize this About Me section, edit the content inside each <code>about-bento</code> block in <b>App.js</b>. Change the titles, text, and lists to fit your story. For layout and colors, update <b>App.css</b> under <code>.about-body</code> and <code>.about-bento</code>. Lalalalla
          </p>
        </section>
      </main>
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

      {popupCard && (
        <div className="card-popup-overlay" onClick={closePopup}>
          <div className={`card-popup ${popupCard.color}`} onClick={e => e.stopPropagation()}>
            <button className="card-popup-close" onClick={closePopup}>&times;</button>
            <h2>{popupCard.title}</h2>
            <p>{popupCard.description}</p>
          </div>
        </div>
      )}
      <footer className="galaxy-footer">
        <p>© 2025 Space Galaxy. All rights reserved.</p>
      </footer>
    </div>
  );

    </div>
  );
}

export default App;

