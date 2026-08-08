import React from 'react';

const defaultItems = [
  'PRODUCT DESIGN',
  'DESIGN SYSTEMS',
  'FRONTEND ENGINEERING',
  'PROTOTYPING',
  '3D PRINTING',
  '3D MODELLING',
  'EMBEDDED SYSTEMS',
];

export const MarqueeBanner = ({
  items = defaultItems,
  speedDuration = '25s',
  pauseOnHover = true,
}) => {
  const renderTrack = (isDuplicate = false) => (
    <div 
      className="flex flex-row shrink-0 items-center whitespace-nowrap"
      style={{ display: 'flex', flexDirection: 'row', flexShrink: 0, alignItems: 'center', whiteSpace: 'nowrap' }}
      aria-hidden={isDuplicate}
    >
      {items.map((item, idx) => (
        <span 
          key={`${item}-${idx}`}
          style={{ 
            color: '#000000', 
            fontFamily: '"Arial Black", "Impact", sans-serif', 
            fontSize: '14px', 
            letterSpacing: '0.12em', 
            fontWeight: '600',
            textTransform: 'uppercase',
            paddingLeft: '32px',
            paddingRight: '32px',
          }}
        >
          {item}
        </span>
      ))}
    </div>
  );

  return (
    <>
      <style>{`
        @keyframes marquee-exact-horizontal {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.333333%); }
        }
        .marquee-container-flex {
          display: flex !important;
          flex-direction: row !important;
          align-items: center !important;
          width: max-content !important;
          animation: marquee-exact-horizontal linear infinite;
        }
        .marquee-container-flex:hover {
          ${pauseOnHover ? 'animation-play-state: paused;' : ''}
        }
      `}</style>

      <div
        style={{
          backgroundColor: '#ffcc00',
          width: '100%',
          overflow: 'hidden',
          paddingTop: '6px',
          paddingBottom: '6px',
          marginTop: '32px',
          marginBottom: '32px',
          userSelect: 'none',
          borderTop: '2px solid #000000',
          borderBottom: '2px solid #000000',
          boxShadow: '0px 4px 12px rgba(0,0,0,0.3)',
          transform: 'rotate(-1deg)',
          display: 'flex',
          alignItems: 'center',
        }}
        role="region"
        aria-label="Police tape marquee banner"
      >
        <div 
          className="marquee-container-flex"
          style={{ animationDuration: speedDuration }}
        >
          {renderTrack(false)}
          {renderTrack(true)}
          {renderTrack(true)}
        </div>
      </div>
    </>
  );
};

export default MarqueeBanner;