import React from 'react';
import './FoldersSection.css';

const folders = [
  { name: 'Projects', color: '#7b9acc', icon: '📁' },
  { name: 'Designs', color: '#e67cae', icon: '🎨' },
  { name: 'Notes', color: '#f7c873', icon: '📝' },
  { name: 'Resources', color: '#7be6c7', icon: '🔗' },
  { name: 'Gallery', color: '#ffb347', icon: '🖼️' },
  { name: 'Archive', color: '#b7b7b7', icon: '📚' }
];

function FoldersSection() {
  return (
    <section className="folders-section">
      <div className="folders-grid">
        {folders.map((folder, idx) => (
          <div className="folder-wrapper" key={idx}>
            <div className="folder-bg" />
            <div
              className="folder-card"
              style={{ background: folder.color }}
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
    </section>
  );
}

export default FoldersSection;
