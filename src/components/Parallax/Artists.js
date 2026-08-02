import React from 'react';

const artists = [
  { initials: 'MG', name: 'Marlowe Grey', genre: 'Ambient / Dub' },
  { initials: 'FC', name: 'Faye Corvin', genre: 'Downtempo' },
  { initials: 'TW', name: 'The Wire Choir', genre: 'Post-Rock' },
  { initials: 'OD', name: 'Odele', genre: 'Neo-Soul' },
  { initials: 'RS', name: 'Rowan Says', genre: 'Folktronica' },
  { initials: 'KL', name: 'Kite Lines', genre: 'Slowcore' }
];

export default function Artists() {
  return (
    <section className="artists" id="artists">
      <div className="artists__head">
        <p className="eyebrow">Roster</p>
        <h2 className="h-display" data-reveal>The artists</h2>
        <p data-reveal>Six acts, one shared instinct for restraint.</p>
      </div>
      <div className="artists__grid">
        {artists.map((artist) => (
          <div className="artist-card" data-reveal key={artist.name}>
            <div className="artist-card__mono">{artist.initials}</div>
            <div>
              <h3 className="artist-card__name">{artist.name}</h3>
              <p className="artist-card__genre">{artist.genre}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
