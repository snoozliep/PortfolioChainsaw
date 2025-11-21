import React, { useState } from 'react';
import './BookSection.css';

const pages = [
  {
    title: 'Welcome',
    content: 'This is the first page of your interactive book!'
  },
  {
    title: 'About',
    content: 'You can add any content you want to each page. Try flipping!'
  },
  {
    title: 'Projects',
    content: 'Showcase your projects, stories, or anything else here.'
  },
  {
    title: 'Contact',
    content: 'Add your contact info or links on this page.'
  }
];

function BookSection() {
  const [page, setPage] = useState(0);

  const nextPage = () => setPage((p) => (p < pages.length - 1 ? p + 1 : p));
  const prevPage = () => setPage((p) => (p > 0 ? p - 1 : p));

  return (
    <section className="book-section">
      <div className="book">
        <div className="book-page">
          <h2>{pages[page].title}</h2>
          <p>{pages[page].content}</p>
        </div>
        <div className="book-controls">
          <button onClick={prevPage} disabled={page === 0}>&lt; Prev</button>
          <span>Page {page + 1} / {pages.length}</span>
          <button onClick={nextPage} disabled={page === pages.length - 1}>Next &gt;</button>
        </div>
      </div>
    </section>
  );
}

export default BookSection;
