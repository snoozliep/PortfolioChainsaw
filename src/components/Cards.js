import React from 'react';
import './Nocturne/NocturneSections.css';

// Small self-contained data used by the component (keeps ESLint happy)
const tourDates = [
  { date: 'Sep 12', city: 'Lisbon', venue: 'Sala Escura' },
  { date: 'Sep 20', city: 'Rotterdam', venue: 'Het Depot' },
  { date: 'Oct 03', city: 'Glasgow', venue: 'The Attic Room' },
  { date: 'Oct 18', city: 'Marseille', venue: 'Quai Nord' }
];

function Cards() {
  return (
    <section className="tour" id="cards-tour">
      <div className="tour__head">
        <div>
          <p className="eyebrow">On the road</p>
          <h2 className="h-display">Upcoming dates</h2>
        </div>
      </div>
      <div className="tour__list">
        {tourDates.map((tour) => (
          <div className="tour-row" data-reveal key={tour.city + tour.date}>
            <span className="tour-row__date">{tour.date}</span>
            <span className="tour-row__city">{tour.city}</span>
            <span className="tour-row__venue">{tour.venue}</span>
            <a href="#" className="tour-row__link">Tickets →</a>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Cards;
