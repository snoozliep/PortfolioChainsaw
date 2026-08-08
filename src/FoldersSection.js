import React, { useEffect, useState } from 'react';
import './FoldersSection.css';

const folders = [
  { name: 'Projects', color: '#7b9acc' },
  { name: 'Designs', color: '#e67cae' },
  { name: 'Notes', color: '#f7c873' },
  { name: 'Resources', color: '#7be6c7' },
  { name: 'Gallery', color: '#ffb347' },
  { name: 'Archive', color: '#b7b7b7' },
];

const projects = [
  {
    img: 'matlab.jpg',
    alt: 'Mathworks',
    fit: 'cover',
    meta: '2022 | Mathworks',
    title: 'Weather and Date App',
    about:
      'Shows weather for a chosen date, and counts how many days have passed or remain until that date.',
  },
  {
    img: 'firebase.png',
    alt: 'Firebase',
    fit: 'contain',
    meta: '2025 | Thesis',
    title: 'IoT First Aid Kit',
    about:
      'Internet of Things first aid kit, rapid-manufactured on 3D printers and modeled in Fusion 360. Dispenses pills on an RFID tap, backed by Firebase.',
  },
];

const designItems = [
  { img: 'GTHB.png', title: 'GitHub Rebrand Concept', tags: ['UI/UX', 'Figma'], date: '2025' },
  { img: 'website.png', title: 'Retro Portfolio V2', tags: ['Web', 'CSS Art'], date: '2026' },
  { img: 'electronics.png', title: 'PCB Layout Visuals', tags: ['CAD', '3D'], date: '2024' },
];

const resourceCategories = [
  {
    category: '🛠️ Dev Tools',
    items: [
      { name: 'React Documentation', desc: 'Official guides & hook references', url: 'https://react.dev' },
      { name: 'CSS-Tricks', desc: 'Flexbox, Grid & animation guides', url: 'https://css-tricks.com' },
    ],
  },
  {
    category: '🎨 Retro Assets',
    items: [
      { name: 'Lospec Palette List', desc: 'Pixel art palettes and specs', url: 'https://lospec.com' },
      { name: 'Itch.io Game Assets', desc: 'Free 2D sprites & sound effects', url: 'https://itch.io/game-assets' },
    ],
  },
];

const galleryImages = [
  { img: 'GTHB.png', alt: 'GitHub' },
  { img: 'website.png', alt: 'Website' },
  { img: 'electronics.png', alt: 'Electronics' },
];

const archiveItems = [
  { img: 'tomato.png', title: 'Pomodoro Timer', tag: 'Tool', href: 'https://snoozliep.github.io/PomodoroTimer/index.html' },
  { img: 'turbo.png', title: 'Turbo Granny', tag: 'Game', href: 'https://snoozliep.github.io/Turbo-Granny/index.html' },
  { img: 'tictac.png', title: 'Tic Tac Toe', tag: 'Game', href: 'https://snoozliep.github.io/tic-tac-toe/tic-tac-toe.html' },
  { img: 'guess.png', title: 'Guessing Game', tag: 'Mini Game', href: 'https://snoozliep.github.io/guessing-game/guess.html' },
  { img: 'fortune.png', title: 'Fortune Cookie', tag: 'Interactive', href: 'https://snoozliep.github.io/fortune-cookie/cookie.html' },
  { img: 'popup.png', title: 'Popup Demo', tag: 'UI Demo', href: 'https://snoozliep.github.io/practise/popup/popup.html' },
  {
    img: 'astrto.png',
    title: 'Astro Parallax',
    tag: 'Web Art',
    href: 'https://snoozliep.github.io/practise/practise/formats/websites/parallax/parallax.html',
  },
];

const asset = (file) => process.env.PUBLIC_URL + '/' + file;

function FoldersSection(props) {
  const popupFolder = props.popupFolder !== undefined ? props.popupFolder : null;
  const setPopupFolder = props.setPopupFolder !== undefined ? props.setPopupFolder : () => {};

  const [note, setNote] = useState('');
  const [notesList, setNotesList] = useState([
    { id: 1, text: 'Remember to update the portfolio build!', date: 'Today' },
    { id: 2, text: 'Love the retro pixel aesthetic! 🕹️', date: 'Yesterday' },
  ]);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key !== 'Escape') return;
      if (lightbox) setLightbox(null);
      else if (popupFolder) setPopupFolder(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightbox, popupFolder, setPopupFolder]);

  const openLightbox = (img, alt) => setLightbox({ src: asset(img), alt });
  const closeLightbox = () => setLightbox(null);

  const handleFolderClick = (folder) => setPopupFolder(folder);
  const closePopup = () => {
    setPopupFolder(null);
    setLightbox(null);
  };

  const handleNoteSubmit = (e) => {
    e.preventDefault();
    if (note.trim()) {
      setNotesList([{ id: Date.now(), text: note.trim(), date: 'Just now' }, ...notesList]);
      setNote('');
    }
  };

  const deleteNote = (id) => {
    setNotesList(notesList.filter((n) => n.id !== id));
  };

  return (
    <section className="folders-section">
      <div className="folders-grid">
        {folders.map((folder, idx) => (
          <div className="folder-wrapper" key={idx}>
            <div
              className="folder-card"
              style={{ '--folder-color': folder.color }}
              onClick={() => handleFolderClick(folder)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleFolderClick(folder)}
            >
              <div className="folder-bolt tl" />
              <div className="folder-bolt tr" />
              <div className="folder-bolt bl" />
              <div className="folder-bolt br" />
              <div className="folder-name font-orbitron">{folder.name}</div>
            </div>
          </div>
        ))}
      </div>

      {popupFolder && (
        <div className="folder-popup-overlay" onClick={closePopup}>
          <div
            className="folder-popup retro-popup"
            style={{ '--folder-color': popupFolder.color }}
            role="dialog"
            aria-modal="true"
            aria-label={popupFolder.name}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="folder-popup-close" onClick={closePopup} aria-label="Close">
              &times;
            </button>
            <h2 className="folder-popup-title font-orbitron">{popupFolder.name}</h2>

            {popupFolder.name === 'Projects' && (
              <div className="folder-popup-desc">
                <div className="timeline-list">
                  {projects.map((p, i) => (
                    <div className="timeline-entry" key={i}>
                      <button
                        className="timeline-image"
                        onClick={() => openLightbox(p.img, p.alt)}
                        aria-label={`View larger image of ${p.title}`}
                      >
                        <img
                          src={asset(p.img)}
                          alt={p.alt}
                          loading="lazy"
                          style={{ objectFit: p.fit }}
                        />
                      </button>
                      <div className="timeline-info">
                        <div className="timeline-year">{p.meta}</div>
                        <div className="timeline-title">{p.title}</div>
                        <div className="timeline-about">{p.about}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {popupFolder.name === 'Gallery' && (
              <div className="folder-popup-desc">
                <div className="gallery">
                  <div className="f-wrap">
                    {galleryImages.map((g, i) => (
                      <button
                        className="img-tile img-tile--gallery"
                        key={i}
                        onClick={() => openLightbox(g.img, g.alt)}
                        aria-label={`View larger image of ${g.alt}`}
                      >
                        <img src={asset(g.img)} alt={g.alt} loading="lazy" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {popupFolder.name === 'Designs' && (
              <div className="folder-popup-desc">
                <div className="designs-header">
                  <p className="designs-subtext">✦ Selected UI/UX & Visual Works ✦</p>
                </div>
                <div className="designs-grid">
                  {designItems.map((item, i) => (
                    <div
                      key={i}
                      className="design-card"
                      onClick={() => openLightbox(item.img, item.title)}
                    >
                      <div className="design-card-preview">
                        <img src={asset(item.img)} alt={item.title} loading="lazy" />
                        <div className="design-card-overlay">
                          <span>Inspect ↗</span>
                        </div>
                      </div>
                      <div className="design-card-details">
                        <div className="design-card-title">{item.title}</div>
                        <div className="design-card-meta">
                          <span className="design-date">{item.date}</span>
                          <div className="design-tags">
                            {item.tags.map((tag, tIdx) => (
                              <span key={tIdx} className="design-tag">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {popupFolder.name === 'Notes' && (
              <div className="folder-popup-desc notes-corkboard">
                <form className="note-form" onSubmit={handleNoteSubmit}>
                  <div className="note-input-wrapper">
                    <textarea
                      className="note-textarea"
                      value={note}
                      maxLength={120}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Pin a thought onto the board..."
                    />
                    <span className="note-char-count">{120 - note.length} chars left</span>
                  </div>
                  <button className="note-submit" type="submit">
                    📌 Pin Note
                  </button>
                </form>

                <div className="notes-list-wrap">
                  <div className="notes-board-header">
                    <h3 className="notes-list-title">Community Corkboard</h3>
                  </div>
                  {notesList.length === 0 ? (
                    <p className="notes-empty">The board is empty. Be the first to pin a note!</p>
                  ) : (
                    <ul className="notes-list">
                      {notesList.map((n) => (
                        <li className="note-item sticky-note" key={n.id}>
                          <div className="pushpin">📌</div>
                          <p className="note-text">{n.text}</p>
                          <div className="note-footer">
                            <span className="note-timestamp">{n.date}</span>
                            <button
                              type="button"
                              className="note-delete"
                              onClick={() => deleteNote(n.id)}
                              title="Remove note"
                            >
                              ×
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}

            {popupFolder.name === 'Resources' && (
              <div className="folder-popup-desc">
                <div className="resources-container">
                  {resourceCategories.map((cat, idx) => (
                    <div key={idx} className="resource-group">
                      <h3 className="resource-cat-title">{cat.category}</h3>
                      <div className="resource-list">
                        {cat.items.map((item, iIdx) => (
                          <a
                            key={iIdx}
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="resource-card"
                          >
                            <div className="resource-info">
                              <span className="resource-name">{item.name}</span>
                              <span className="resource-desc">{item.desc}</span>
                            </div>
                            <span className="resource-arrow">↗</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {popupFolder.name === 'Archive' && (
              <div className="folder-popup-desc">
                <div className="archive-grid-redesigned">
                  {archiveItems.map((a, i) => (
                    <div className="archive-card" key={i}>
                      <div className="archive-card-header">
                        <button
                          className="archive-preview-btn"
                          onClick={() => openLightbox(a.img, a.title)}
                          aria-label={`View preview of ${a.title}`}
                        >
                          <img src={asset(a.img)} alt={a.title} loading="lazy" />
                          <div className="archive-preview-overlay">🔍 Zoom</div>
                        </button>
                      </div>
                      <div className="archive-card-body">
                        <span className="archive-badge">{a.tag}</span>
                        <h4 className="archive-title">{a.title}</h4>
                        <a
                          className="archive-launch-btn"
                          href={a.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Launch Demo ↗
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!['Notes', 'Projects', 'Designs', 'Resources', 'Gallery', 'Archive'].includes(
              popupFolder.name
            ) && (
              <div className="folder-popup-desc">
                This is the {popupFolder.name} folder. Add your retro game info or details here!
              </div>
            )}
          </div>
        </div>
      )}

      {/* FAIRY TALE MODAL IMAGE POPUP */}
      <div
        className={`modal ${lightbox ? 'active' : ''}`}
        onClick={closeLightbox}
      >
        <span
          className="modal-close"
          onClick={closeLightbox}
          aria-label="Close"
        >
          &times;
        </span>
        {lightbox && (
          <img
            className="modal-content"
            src={lightbox.src}
            alt={lightbox.alt}
            onClick={(e) => e.stopPropagation()}
          />
        )}
      </div>
    </section>
  );
}

export default FoldersSection;