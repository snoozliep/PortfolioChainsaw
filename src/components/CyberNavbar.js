import React, { useState, useEffect } from 'react';

const CyberNavbar = () => {
  const [activeSection, setActiveSection] = useState('home');

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveSection('home');
  };

  useEffect(() => {
    const handleScroll = () => {
      // Force "home" active state when near the top of the page
      if (window.scrollY < 150) {
        setActiveSection('home');
        return;
      }

      const sectionIds = ['home', 'about-me', 'contact'];
      const viewportMid = window.innerHeight / 2;

      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          // Determine section boundaries either by element bounding rectangle or container height
          const rect = element.getBoundingClientRect();
          
          // If element has zero height (like empty anchor divs), check the distance to its next sibling section
          let height = rect.height;
          if (height === 0) {
            const parent = element.parentElement;
            const aboutSection = document.getElementById('about-me1') || parent;
            if (aboutSection) {
              const targetRect = aboutSection.getBoundingClientRect();
              if (targetRect.top <= viewportMid && targetRect.bottom >= viewportMid) {
                setActiveSection('about-me');
                break;
              }
            }
          } else if (rect.top <= viewportMid && rect.bottom >= viewportMid) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@700&display=swap');

        :root {
          --chip1: #10b981;
          --chip3: #facc15;
        }

        .cyber-header-bar {
          position: fixed;
          top: 16px;
          left: 50%;
          transform: translateX(-50%);
          width: calc(100% - 48px);
          max-width: 1280px;
          z-index: 9999;
          box-sizing: border-box;
        }

        .cyber-nav-border-wrapper {
          position: relative;
          padding: 1px;
        }

        .cyber-nav {
          width: 100%;
          padding: 0.75rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .cyber-header-left {
          width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cyber-header-left img {
          width: 34px;
          height: 34px;
          animation: cyberRotate360 2.5s linear infinite;
        }

        @keyframes cyberRotate360 {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .cyber-nav-links {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }

        .cyber-nav a {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.85rem;
          font-weight: 700;
          color: #e2e8f0;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          padding: 0.4rem 0.75rem;
          position: relative;
          transition: all 0.2s ease-in-out;
        }

        .cyber-nav a:hover {
          color: #ffffff;
          transform: translateY(-1px);
        }

        .cyber-nav a.active {
          color: var(--chip3);
        }

        .cyber-nav a::before {
          content: '>';
          margin-right: 6px;
          color: var(--chip1);
          opacity: 0;
          display: inline-block;
          transform: translateX(-6px);
          transition: opacity 0.25s ease, transform 0.25s ease;
        }

        .cyber-nav a.active::before {
          opacity: 1;
          transform: translateX(0);
        }
      `}</style>

      <header className="cyber-header-bar">
        <div className="cyber-nav-border-wrapper">
          <nav className="cyber-nav">
            <div
              className="cyber-header-left"
              onClick={handleLogoClick}
              style={{ cursor: 'pointer' }}
            >
              <img
                src="https://www.pngmart.com/files/23/Pochita-PNG.png"
                alt="Logo"
              />
            </div>

            <div className="cyber-nav-links">
              <a
                href="#home"
                className={activeSection === 'home' ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveSection('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                Home
              </a>
              <a
                href="#about-me"
                className={activeSection === 'about-me' ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveSection('about-me');
                  const el = document.getElementById('about-me1') || document.getElementById('about-me');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                About
              </a>
              <a
                href="#contact"
                className={activeSection === 'contact' ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveSection('contact');
                  document
                    .getElementById('contact')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Contact
              </a>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default CyberNavbar;