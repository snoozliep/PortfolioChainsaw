import React from 'react';
import './NocturneSections.css';

function NavSection() {
  return (
    <nav className="nav" id="nav">
      <button type="button" className="nav__mark">NOCT<span>URNE</span></button>
      <div className="nav__links">
        <a href="#releases">Releases</a>
        <a href="#artists">Artists</a>
        <a href="#studio">Studio</a>
        <a href="#tour">Tour</a>
      </div>
      <button type="button" className="nav__cta">Listen</button>
      <button className="nav__burger" aria-label="Menu">&#9776;</button>
    </nav>
  );
}

export default NavSection;
