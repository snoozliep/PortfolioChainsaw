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
      <h2 className="folders-title">Folders</h2>
      <div className="folders-grid">
        {folders.map((folder, idx) => (
          <div
            key={idx}
            className="folder-card"
            style={{ background: folder.color }}
          >
            <span className="folder-icon" style={{ fontSize: '2.5rem' }}>{folder.icon}</span>
            <div className="folder-name">{folder.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FoldersSection;
