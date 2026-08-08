import React, { useState, useEffect, useRef } from 'react';
import { Pin, X, ZoomIn } from 'lucide-react';

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Courier+Prime:ital,wght@0,400;0,700;1,400&family=Oswald:wght@500;600;700&display=swap');

.evidence-board-section {
  position: relative;
  width: 100%;
  max-width: 1352px;
  margin: 40px auto;
  background-color: #1a1512;
  background-image: 
    radial-gradient(circle at 50% 50%, rgba(35, 28, 23, 0.5) 0%, rgba(10, 8, 7, 0.95) 100%),
    repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px);
  border: 12px solid #f7f3f1;
  border-radius: 4px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.9), inset 0 0 80px rgba(0,0,0,0.8);
  font-family: 'Courier Prime', monospace;
  color: #f7f3f0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.board-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 2px dashed #423228;
  background-color: rgba(15, 12, 10, 0.6);
  z-index: 10;
}

.board-title-group {
  display: flex;
  align-items: center;
  gap: 12px;
}

.stamp-badge {
  font-family: 'Oswald', sans-serif;
  color: #a82424;
  border: 2px solid #a82424;
  padding: 2px 8px;
  font-size: 0.85rem;
  letter-spacing: 2px;
  transform: rotate(-3deg);
  font-weight: 700;
  text-transform: uppercase;
}

.board-title {
  font-family: 'Oswald', sans-serif;
  font-size: 1.75rem;
  color: #ffffff;
  letter-spacing: 1.5px;
  margin: 0;
}

.board-canvas {
  position: relative;
  flex: 1;
  min-height: 550px;
  padding: 24px;
  overflow: hidden;
  touch-action: none;
}

.string-overlay {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.polaroid-card {
  position: absolute;
  background-color: #f2ebd9;
  padding: 10px 10px 16px 10px;
  border-radius: 2px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.6);
  cursor: grab;
  user-select: none;
  z-index: 2;
  color: #1a1a1a;
  width: 220px;
  transition: box-shadow 0.2s ease, border-color 0.2s ease;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.polaroid-card:active {
  cursor: grabbing;
}

.polaroid-card:hover {
  z-index: 5;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.8);
  border-color: rgba(250, 12, 47, 0.8);
}

.polaroid-card.selected {
  outline: 2px solid #a82424;
  box-shadow: 0 0 15px rgba(168, 36, 36, 0.6);
}

.push-pin {
  position: absolute;
  top: -8px;
  left: 50%;
  transform: translateX(-50%);
  color: #c42b2b;
  filter: drop-shadow(2px 4px 2px rgba(0,0,0,0.5));
  z-index: 3;
}

.polaroid-image-wrapper {
  position: relative;
  width: 100%;
  height: 160px;
  background-color: #0d0d0d;
  overflow: hidden;
  border: 1px solid #d4c8b0;
  cursor: pointer;
}

.polaroid-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: sepia(0.25) contrast(1.1);
  pointer-events: none;
}

.polaroid-caption {
  margin-top: 10px;
  font-family: 'Courier Prime', monospace;
  font-size: 0.75rem;
  font-weight: 700;
  color: #2b2520;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.evidence-id {
  color: #8c2525;
  font-size: 0.7rem;
}
`;

const defaultEvidenceItems = [
  {
    id: 'EXHIBIT-01',
    title: 'Specimen One',
    url: 'https://static0.srcdn.com/wordpress/wp-content/uploads/2025/03/copy-of-untitled-design-2-1.jpg?w=1600&h=900&fit=crop',
    x: 60,
    y: 40,
    rot: -3,
  },
  {
    id: 'EXHIBIT-02',
    title: 'Anime Cinematic',
    url: 'https://www.slashfilm.com/img/gallery/the-bonkers-chainsaw-man-movie-is-somehow-also-the-best-rom-com-of-2025/l-intro-1761566089.jpg',
    x: 320,
    y: 60,
    rot: 4,
  },
  {
    id: 'EXHIBIT-03',
    title: 'Digital Concept',
    url: 'https://miro.medium.com/1*WE5HrPeyAjYp4SoPaAOt5A.jpeg',
    x: 580,
    y: 45,
    rot: -2,
  },
  {
    id: 'EXHIBIT-04',
    title: 'Specimen Four',
    url: 'https://static0.srcdn.com/wordpress/wp-content/uploads/2025/03/copy-of-untitled-design-2-1.jpg?w=1600&h=900&fit=crop',
    x: 840,
    y: 55,
    rot: 5,
  },
];

export const FairyGalleryModal = ({
  title = 'CASE FILE: FAIRY EVIDENCE BOARD',
  items = defaultEvidenceItems,
}) => {
  const [evidenceItems, setEvidenceItems] = useState(items);
  const [selectedImage, setSelectedImage] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [closeHovered, setCloseHovered] = useState(false);
  
  const [draggingId, setDraggingId] = useState(null);
  const canvasRef = useRef(null);
  const dragOffset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedImage(null);
    };
    if (selectedImage) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [selectedImage]);

  const handleMouseDown = (e, item) => {
    e.stopPropagation();
    setDraggingId(item.id);
    
    const canvasRect = canvasRef.current.getBoundingClientRect();
    dragOffset.current = {
      x: (e.clientX - canvasRect.left) - item.x,
      y: (e.clientY - canvasRect.top) - item.y
    };
  };

  const handleMouseMove = (e) => {
    if (!draggingId) return;
    const canvasRect = canvasRef.current.getBoundingClientRect();
    
    const newX = (e.clientX - canvasRect.left) - dragOffset.current.x;
    const newY = (e.clientY - canvasRect.top) - dragOffset.current.y;

    setEvidenceItems(prev =>
      prev.map(item => item.id === draggingId ? { ...item, x: newX, y: newY } : item)
    );
  };

  const handleMouseUp = () => {
    setDraggingId(null);
  };

  return (
    <>
      <style>{styles}</style>
      <section className="evidence-board-section">
        <header className="board-header">
          <div className="board-title-group">
            <span className="stamp-badge">CONFIDENTIAL</span>
            <h2 className="board-title">{title}</h2>
          </div>
        </header>

        <div 
          className="board-canvas"
          ref={canvasRef}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <svg className="string-overlay">
            <line x1="15%" y1="20%" x2="40%" y2="25%" stroke="#a82424" strokeWidth="2" strokeDasharray="4 2" />
            <line x1="40%" y1="25%" x2="65%" y2="18%" stroke="#a82424" strokeWidth="2" strokeDasharray="4 2" />
            <line x1="40%" y1="25%" x2="25%" y2="65%" stroke="#a82424" strokeWidth="2" strokeDasharray="4 2" />
            <line x1="65%" y1="18%" x2="80%" y2="60%" stroke="#a82424" strokeWidth="2" strokeDasharray="4 2" />
          </svg>

          {evidenceItems.map((item) => {
            const isHovered = hoveredId === item.id;
            const rotation = item.rot || 0;

            return (
              <div
                key={item.id}
                className="polaroid-card"
                style={{
                  transform: `translate(${item.x}px, ${item.y}px) rotate(${rotation}deg)`,
                }}
                onMouseDown={(e) => handleMouseDown(e, item)}
              >
                <Pin className="push-pin" size={18} />
                
                <div 
                  className="polaroid-image-wrapper"
                  onClick={() => setSelectedImage(item.url)}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <img
                    src={item.url}
                    alt={item.title || 'Gallery item'}
                    className="polaroid-image"
                    style={{
                      transform: isHovered ? 'scale(1.12) rotate(1deg)' : 'scale(1) rotate(0deg)',
                      filter: isHovered ? 'sepia(0.15) brightness(1.1) contrast(1.05)' : 'sepia(0.25) contrast(1.1)',
                      transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), filter 0.4s ease',
                    }}
                  />

                  <div 
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: isHovered ? '150%' : '-100%',
                      width: '90%',
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.35), transparent)',
                      transform: 'skewX(-25deg)',
                      transition: 'left 0.75s ease-in-out',
                      pointerEvents: 'none',
                    }}
                  />

                  <div 
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px',
                      background: 'linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.25) 60%, transparent 100%)',
                      opacity: isHovered ? 1 : 0,
                      transition: 'opacity 0.35s ease',
                      pointerEvents: 'none',
                    }}
                  >
                    <div />
                    <div 
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.25)',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                        borderRadius: '9999px',
                        padding: '8px',
                        border: '1px solid rgba(255, 255, 255, 0.5)',
                        transform: isHovered ? 'scale(1) rotate(0deg)' : 'scale(0.5) rotate(-15deg)',
                        transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      }}
                    >
                      <ZoomIn size={18} style={{ color: '#ffffff', display: 'block' }} />
                    </div>
                    <span 
                      style={{
                        color: '#ffffff',
                        fontSize: '10px',
                        fontWeight: '600',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        transform: isHovered ? 'translateY(0)' : 'translateY(16px)',
                        transition: 'transform 0.35s ease',
                        textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                      }}
                    >
                      {item.title || 'View Image'}
                    </span>
                  </div>
                </div>

                <div className="polaroid-caption">
                  <span>{item.title}</span>
                  <span className="evidence-id">{item.id}</span>
                </div>
              </div>
            );
          })}
        </div>

        {selectedImage && (
          <div
            onClick={() => setSelectedImage(null)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1000,
              backgroundColor: 'rgba(5, 5, 15, 0.92)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px',
            }}
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              onMouseEnter={() => setCloseHovered(true)}
              onMouseLeave={() => setCloseHovered(false)}
              style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                color: closeHovered ? '#f472b6' : '#ffffff',
                padding: '10px',
                borderRadius: '9999px',
                backgroundColor: closeHovered ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                cursor: 'pointer',
                transform: closeHovered ? 'rotate(90deg) scale(1.1)' : 'rotate(0deg) scale(1)',
                transition: 'all 0.3s ease',
              }}
              aria-label="Close image modal"
            >
              <X size={26} />
            </button>

            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'relative',
                maxWidth: '896px',
                maxHeight: '85vh',
                overflow: 'hidden',
                border: '8px solid rgba(255, 255, 255, 0.9)',
                boxShadow: '0 0 60px rgba(255, 182, 193, 0.45)',
                transform: 'translateY(12px) rotate(-1deg)',
                transition: 'transform 0.4s ease',
              }}
            >
              <img
                src={selectedImage}
                alt="Enlarged view"
                style={{
                  maxWidth: '100%',
                  maxHeight: '75vh',
                  objectFit: 'contain',
                  display: 'block',
                  userSelect: 'none',
                }}
              />
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default FairyGalleryModal;