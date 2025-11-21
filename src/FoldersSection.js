
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
  const [popupFolder, setPopupFolder] = useState(null);
  const [note, setNote] = useState("");
  const [notesList, setNotesList] = useState([]);
  const [viewImage, setViewImage] = useState(null);
  const handleImageClick = (imgSrc) => {
    setViewImage(imgSrc);
  };
  const closeImageView = () => {
    setViewImage(null);
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
  const handleDeleteNote = (idx) => {
    setNotesList(notesList.filter((_, i) => i !== idx));
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
                    <div className="timeline-image" style={{ cursor: 'pointer', aspectRatio: '4/3', width: '120px', height: '90px', background: '#e0e0e0', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa', fontSize: '1.1rem', fontWeight: 'bold', border: '1.5px solid #e0e0e0', position: 'relative' }} onClick={() => handleImageClick('https://via.placeholder.com/480x360?text=Project+Image+1')}>Image</div>
                    <div className="timeline-info">
                      <div className="timeline-year">2022</div>
                      <div className="timeline-title">Project Title 1</div>
                      <div className="timeline-about">About this project: Add a description here for your project milestone or achievement.</div>
                    </div>
                  </div>
                  {/* Timeline Entry 2 */}
                  <div className="timeline-entry">
                    <div className="timeline-image" style={{ cursor: 'pointer', aspectRatio: '4/3', width: '120px', height: '90px', background: '#e0e0e0', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa', fontSize: '1.1rem', fontWeight: 'bold', border: '1.5px solid #e0e0e0', position: 'relative' }} onClick={() => handleImageClick('https://via.placeholder.com/480x360?text=Project+Image+2')}>Image</div>
                    <div className="timeline-info">
                      <div className="timeline-year">2023</div>
                      <div className="timeline-title">Project Title 2</div>
                      <div className="timeline-about">About this project: Add a description here for your project milestone or achievement.</div>
                    </div>
                  </div>
                      {viewImage && (
                        <div className="folder-popup-overlay" onClick={closeImageView}>
                          <div style={{ background: '#fff', borderRadius: '12px', padding: '24px', maxWidth: '600px', width: '90vw', textAlign: 'center', boxShadow: '0 8px 32px #222', position: 'relative' }} onClick={e => e.stopPropagation()}>
                            <img src={viewImage} alt="Project" style={{ maxWidth: '100%', maxHeight: '60vh', borderRadius: '8px', marginBottom: '12px' }} />
                            <div style={{ color: '#222', fontSize: '1.08rem' }}>Click outside to close</div>
                          </div>
                        </div>
                      )}
                </div>
                <div style={{ textAlign: 'center', marginTop: '18px', color: '#888', fontSize: '1rem' }}>[Timeline placeholder: Add your projects, images, years, and details here]</div>
              </div>
            ) : popupFolder.name === 'Designs' || popupFolder.name === 'Gallery' ? (
              <div className="folder-popup-desc">
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '18px', justifyContent: 'center', alignItems: 'center', minHeight: '180px', padding: '24px' }}>
                  <div style={{ width: '120px', height: '120px', background: '#e0e0e0', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa', fontSize: '1.2rem', fontWeight: 'bold', border: '2px dashed #e67cae' }}>Image 1</div>
                  <div style={{ width: '120px', height: '120px', background: '#e0e0e0', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa', fontSize: '1.2rem', fontWeight: 'bold', border: '2px dashed #e67cae' }}>Image 2</div>
                  <div style={{ width: '120px', height: '120px', background: '#e0e0e0', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa', fontSize: '1.2rem', fontWeight: 'bold', border: '2px dashed #e67cae' }}>Image 3</div>
                </div>
                <div style={{ textAlign: 'center', marginTop: '18px', color: '#888', fontSize: '1rem' }}>[Gallery placeholder: Add your images here]</div>
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
