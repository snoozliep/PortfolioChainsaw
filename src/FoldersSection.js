
import React, { useState } from 'react';
import './FoldersSection.css';

const folders = [
  { name: 'Projects', color: '#7b9acc' },
  { name: 'Designs', color: '#e67cae' },
  { name: 'Notes', color: '#f7c873' },
  { name: 'Resources', color: '#7be6c7' },
  { name: 'Gallery', color: '#ffb347' },
  { name: 'Archive', color: '#b7b7b7' }
];

function FoldersSection() {
  // Use popupFolder and setPopupFolder from props if provided
  const props = arguments[0] || {};
  const popupFolder = props.popupFolder !== undefined ? props.popupFolder : null;
  const setPopupFolder = props.setPopupFolder !== undefined ? props.setPopupFolder : () => {};
  const [note, setNote] = useState("");
  const [notesList, setNotesList] = useState([]);
  const [viewImage, setViewImage] = useState(null);
  const [viewImageFolder, setViewImageFolder] = useState(null);
  const handleImageClick = (imgSrc) => {
    setViewImage(imgSrc);
    setViewImageFolder(popupFolder?.name);
  };
  const closeImageView = () => {
    setViewImage(null);
    setViewImageFolder(null);
  };
  const handleFolderClick = (folder) => {
    setPopupFolder(folder);
  };
  const closePopup = () => {
    setPopupFolder(null);
  };
  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };
  const handleNoteSubmit = (e) => {
    e.preventDefault();
    if (note.trim()) {
      setNotesList([...notesList, note.trim()]);
      setNote("");
    }
  };
  return (
    <section className="folders-section">
      <div className="folders-grid">
        {folders.map((folder, idx) => (
          <div className="folder-wrapper" key={idx}>
            <div className="folder-bg" />
            <div
              className="folder-card"
              style={{ background: folder.color }}
              onClick={() => handleFolderClick(folder)}
            >
              {/* Four bolts/circles in corners */}
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
          <div className="folder-popup retro-popup" style={{ background: popupFolder.color }} onClick={e => e.stopPropagation()}>
            {/* Removed folder icon emoji */}
            <h2 className="folder-popup-title font-orbitron">{popupFolder.name}</h2>
            {viewImage && viewImageFolder === popupFolder.name && (
              <div className="folder-popup-overlay" onClick={closeImageView}>
                <div style={{ background: '#fff', borderRadius: '12px', padding: '24px', maxWidth: '600px', width: '90vw', textAlign: 'center', boxShadow: '0 8px 32px #222', position: 'relative' }} onClick={e => e.stopPropagation()}>
                  <img src={viewImage} alt="Project" style={{ maxWidth: '100%', maxHeight: '60vh', borderRadius: '8px', marginBottom: '12px' }} />
                </div>
              </div>
            )}
            {popupFolder.name === 'Notes' ? (
              <div className="folder-popup-desc">
                <form onSubmit={handleNoteSubmit} style={{ marginBottom: '1.2rem' }}>
                  <textarea
                    value={note}
                    onChange={handleNoteChange}
                    placeholder="Leave a note..."
                    style={{ width: '100%', minHeight: '60px', fontFamily: 'Press Start 2P, Courier New, monospace', fontSize: '1rem', borderRadius: '8px', border: '2px solid #e67cae', padding: '8px', marginBottom: '8px', resize: 'vertical' }}
                  />
                  <button type="submit" style={{ fontFamily: 'Press Start 2P, Courier New, monospace', background: '#ffe066', color: '#e63900', border: '2px solid #e63900', borderRadius: '8px', padding: '8px 18px', fontSize: '1rem', cursor: 'pointer', marginTop: '6px' }}>Add Note</button>
                </form>
                <div style={{ textAlign: 'left', marginTop: '1rem' }}>
                  <h3 style={{ fontFamily: 'Press Start 2P, Courier New, monospace', color: '#e63900', fontSize: '1.1rem', marginBottom: '8px' }}>Visitor Notes:</h3>
                  <ul style={{ paddingLeft: '0', listStyle: 'none' }}>
                    {notesList.map((n, i) => (
                      <li key={i} style={{ background: '#fffbe6', color: '#3a2f00', borderRadius: '12px', padding: '16px 18px 12px 18px', fontFamily: 'Press Start 2P, Courier New, monospace', fontSize: '1.08rem', boxShadow: '2px 4px 18px #ffe066, 0 2px 8px #ffe066', border: '2px solid #ffe066', minWidth: '120px', maxWidth: '220px', wordBreak: 'break-word', transform: i % 2 === 0 ? 'rotate(-2deg)' : 'rotate(2deg)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span>{n}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : popupFolder.name === 'Projects' ? (
              <div className="folder-popup-desc">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', alignItems: 'center', margin: '24px 0' }}>
                  {/* Timeline Entry 1 */}
                  <div className="timeline-entry">
                    <div className="timeline-image" style={{ cursor: 'pointer', width: '120px', height: '120px', background: 'transparent', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa', fontSize: '1.1rem', fontWeight: 'bold', border: '1.5px solid #e0e0e0', position: 'relative' }} onClick={() => handleImageClick(process.env.PUBLIC_URL + '/matlab.jpg')}>
                      <img src={process.env.PUBLIC_URL + '/matlab.jpg'} alt="Mathworks" style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '16px', boxShadow: 'none', background: 'transparent' }} />
                    </div>
                    <div className="timeline-info">
                      <div className="timeline-year">2022 | Mathworks</div>
                      <div className="timeline-title">Weather and Date App</div>
                      <div className="timeline-about">About this project: Shows weather for date placed, as well as count how many days it passed or will it be until said date.</div>
                    </div>
                  </div>
                  {/* Timeline Entry 2 */}
                  <div className="timeline-entry">
                    <div className="timeline-image" style={{ cursor: 'pointer', width: '120px', height: '120px', background: 'transparent', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa', fontSize: '1.1rem', fontWeight: 'bold', border: '1.5px solid #e0e0e0', position: 'relative' }} onClick={() => handleImageClick(process.env.PUBLIC_URL + '/firebase.png')}>
                      <img src={process.env.PUBLIC_URL + '/firebase.png'} alt="Firebase" style={{ width: '120px', height: '120px', objectFit: 'contain', borderRadius: '16px', boxShadow: 'none', background: 'transparent' }} />
                    </div>
                    <div className="timeline-info">
                      <div className="timeline-year">2025 | Thesis </div>
                      <div className="timeline-title">IoT First Aid Kit</div>
                      <div className="timeline-about">Interet of Things, Rapid Manufacturing using 3D Printers, and Modelled using Fusion360. First Aid Kit that dispenses pills on tap of RFID using Firebase as Databae,</div>
                    </div>
                  </div>
                      {viewImage && (
                        <div className="folder-popup-overlay" onClick={closeImageView}>
                          <div style={{ background: 'transparent', borderRadius: '12px', padding: '24px', maxWidth: '600px', width: '90vw', textAlign: 'center', boxShadow: 'none', position: 'relative' }} onClick={e => e.stopPropagation()}>
                            <img src={viewImage} alt="Project" style={{ maxWidth: '100%', maxHeight: '60vh', borderRadius: '8px', marginBottom: '12px' }} />
                            <div style={{ color: '#222', fontSize: '1.08rem' }}>Click outside to close</div>
                          </div>
                        </div>
                      )}
                </div>
                  </div>
                ) : popupFolder.name === 'Designs' || popupFolder.name === 'Gallery' ? (
                  <div className="folder-popup-desc">
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '18px', justifyContent: 'center', alignItems: 'center', minHeight: '180px', padding: '24px' }}>
                    <div className="gallery-img-hover-wrapper">
                    <img
                      src={process.env.PUBLIC_URL + '/GTHB.png'}
                      alt="Github"
                      className="gallery-img-thumb"
                      style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '8px', border: '2px dashed #e67cae', cursor: 'pointer' }}
                      onClick={() => handleImageClick(process.env.PUBLIC_URL + '/GTHB.png')}
                    />
                    <img
                      src={process.env.PUBLIC_URL + '/GTHB.png'}
                      alt="GTHB Full"
                      className="gallery-img-full"
                      style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', zIndex: 10, maxWidth: '320px', maxHeight: '320px', borderRadius: '12px', boxShadow: '0 8px 32px #222', display: 'none' }}
                    />
                    </div>
                    <div className="gallery-img-hover-wrapper">
                    <img
                      src={process.env.PUBLIC_URL + '/website.png'}
                      alt="Website"
                      className="gallery-img-thumb"
                      style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '8px', border: '2px dashed #e67cae', cursor: 'pointer' }}
                      onClick={() => handleImageClick(process.env.PUBLIC_URL + '/website.png')}
                    />
                    <img
                      src={process.env.PUBLIC_URL + '/website.png'}
                      alt="Website Full"
                      className="gallery-img-full"
                      style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', zIndex: 10, maxWidth: '320px', maxHeight: '320px', borderRadius: '12px', boxShadow: '0 8px 32px #222', display: 'none' }}
                    />
                    </div>
                    <div className="gallery-img-hover-wrapper">
                    <img
                      src={process.env.PUBLIC_URL + '/electronics.png'}
                      alt="Electronics"
                      className="gallery-img-thumb"
                      style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '8px', border: '2px dashed #e67cae', cursor: 'pointer' }}
                      onClick={() => handleImageClick(process.env.PUBLIC_URL + '/electronics.png')}
                    />
                    <img
                      src={process.env.PUBLIC_URL + '/electronics.png'}
                      alt="Electronics Full"
                      className="gallery-img-full"
                      style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', zIndex: 10, maxWidth: '320px', maxHeight: '320px', borderRadius: '12px', boxShadow: '0 8px 32px #222', display: 'none' }}
                    />
                    </div>
                  </div>
                  </div>
                ) : popupFolder.name === 'Archive' ? (
                  <div className="folder-popup-desc">
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '18px', justifyContent: 'center', alignItems: 'center', minHeight: '180px', padding: '24px' }}>
                    <a href="https://snoozliep.github.io/PomodoroTimer/index.html" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                      <div className="archive-img-hover-wrapper">
                        <img
                          src={process.env.PUBLIC_URL + '/tomato.png'}
                          alt="Pomodoro Timer"
                          className="archive-img-thumb archive-hover"
                          style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '8px', border: '2px dashed #b7b7b7', cursor: 'pointer', background: '#eee' }}
                        />
                        <img
                          src={process.env.PUBLIC_URL + '/tomato.png'}
                          alt="Pomodoro Timer Full"
                          className="archive-img-full"
                          style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', zIndex: 10, maxWidth: '400px', maxHeight: '400px', borderRadius: '18px', boxShadow: '0 8px 32px #222', display: 'none' }}
                        />
                        <div style={{ textAlign: 'center', color: '#222', fontWeight: 'bold', marginTop: '8px' }}>Pomodoro Timer</div>
                      </div>
                    </a>
                    {/* Turbo Granny */}
                    <a href="https://snoozliep.github.io/Turbo-Granny/index.html" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                      <div className="archive-img-hover-wrapper">
                        <img
                          src={process.env.PUBLIC_URL + '/turbo.png'}
                          alt="Turbo Granny"
                          className="archive-img-thumb archive-hover"
                          style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '8px', border: '2px dashed #b7b7b7', cursor: 'pointer' }}
                        />
                        <img
                          src={process.env.PUBLIC_URL + '/turbo.png'}
                          alt="Turbo Granny Full"
                          className="archive-img-full"
                          style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', zIndex: 10, maxWidth: '240px', maxHeight: '240px', borderRadius: '18px', boxShadow: '0 8px 32px #222', display: 'none' }}
                        />
                        <div style={{ textAlign: 'center', color: '#222', fontWeight: 'bold', marginTop: '8px' }}>Turbo Granny</div>
                      </div>
                    </a>
                    {/* Tic Tac Toe */}
                    <a href="https://snoozliep.github.io/tic-tac-toe/tic-tac-toe.html" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                      <div className="archive-img-hover-wrapper">
                        <img
                          src={process.env.PUBLIC_URL + '/tictac.png'}
                          alt="Tic Tac Toe"
                          className="archive-img-thumb archive-hover"
                          style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '8px', border: '2px dashed #b7b7b7', cursor: 'pointer' }}
                        />
                        <img
                          src={process.env.PUBLIC_URL + '/tictac.png'}
                          alt="Tic Tac Toe Full"
                          className="archive-img-full"
                          style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', zIndex: 10, maxWidth: '240px', maxHeight: '240px', borderRadius: '18px', boxShadow: '0 8px 32px #222', display: 'none' }}
                        />
                        <div style={{ textAlign: 'center', color: '#222', fontWeight: 'bold', marginTop: '8px' }}>Tic Tac Toe</div>
                      </div>
                    </a>
                    {/* Guessing Game */}
                    <a href="https://snoozliep.github.io/guessing-game/guess.html" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                      <div className="archive-img-hover-wrapper">
                        <img
                          src={process.env.PUBLIC_URL + '/guess.png'}
                          alt="Guessing Game"
                          className="archive-img-thumb archive-hover"
                          style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '8px', border: '2px dashed #b7b7b7', cursor: 'pointer' }}
                        />
                        <img
                          src={process.env.PUBLIC_URL + '/guess.png'}
                          alt="Guessing Game Full"
                          className="archive-img-full"
                          style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', zIndex: 10, maxWidth: '240px', maxHeight: '240px', borderRadius: '18px', boxShadow: '0 8px 32px #222', display: 'none' }}
                        />
                        <div style={{ textAlign: 'center', color: '#222', fontWeight: 'bold', marginTop: '8px' }}>Guessing Game</div>
                      </div>
                    </a>
                    {/* Fortune Cookie */}
                    <a href="https://snoozliep.github.io/fortune-cookie/cookie.html" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                      <div className="archive-img-hover-wrapper">
                        <img
                          src={process.env.PUBLIC_URL + '/fortune.png'}
                          alt="Fortune Cookie"
                          className="archive-img-thumb archive-hover"
                          style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '8px', border: '2px dashed #b7b7b7', cursor: 'pointer' }}
                        />
                        <img
                          src={process.env.PUBLIC_URL + '/fortune.png'}
                          alt="Fortune Cookie Full"
                          className="archive-img-full"
                          style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', zIndex: 10, maxWidth: '240px', maxHeight: '240px', borderRadius: '18px', boxShadow: '0 8px 32px #222', display: 'none' }}
                        />
                        <div style={{ textAlign: 'center', color: '#222', fontWeight: 'bold', marginTop: '8px' }}>Fortune Cookie</div>
                      </div>
                    </a>
                    {/* Popup Demo */}
                    <a href="https://snoozliep.github.io/practise/popup/popup.html" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                      <div className="archive-img-hover-wrapper">
                        <img
                          src={process.env.PUBLIC_URL + '/popup.png'}
                          alt="Popup Demo"
                          className="archive-img-thumb archive-hover"
                          style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '8px', border: '2px dashed #b7b7b7', cursor: 'pointer' }}
                        />
                        <img
                          src={process.env.PUBLIC_URL + '/popup.png'}
                          alt="Popup Demo Full"
                          className="archive-img-full"
                          style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', zIndex: 10, maxWidth: '240px', maxHeight: '240px', borderRadius: '18px', boxShadow: '0 8px 32px #222', display: 'none' }}
                        />
                        <div style={{ textAlign: 'center', color: '#222', fontWeight: 'bold', marginTop: '8px' }}>Popup Demo</div>
                      </div>
                    </a>
                    {/* Astro Parallax */}
                    <a href="https://snoozliep.github.io/practise/practise/formats/websites/parallax/parallax.html" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                      <div className="archive-img-hover-wrapper">
                        <img
                          src={process.env.PUBLIC_URL + '/astrto.png'}
                          alt="Astro Parallax"
                          className="archive-img-thumb archive-hover"
                          style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '8px', border: '2px dashed #b7b7b7', cursor: 'pointer' }}
                        />
                        <img
                          src={process.env.PUBLIC_URL + '/astrto.png'}
                          alt="Astro Parallax Full"
                          className="archive-img-full"
                          style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', zIndex: 10, maxWidth: '240px', maxHeight: '240px', borderRadius: '18px', boxShadow: '0 8px 32px #222', display: 'none' }}
                        />
                        <div style={{ textAlign: 'center', color: '#222', fontWeight: 'bold', marginTop: '8px' }}>Astro Parallax</div>
                      </div>
                    </a>
                  </div>
                </div>
            ) : (
              <div className="folder-popup-desc">This is the {popupFolder.name} folder. Add your retro game info or details here!</div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default FoldersSection;
