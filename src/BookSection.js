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
  const [flipDirection, setFlipDirection] = useState(null); // 'left' or 'right'

  const nextPage = () => {
    if (page < pages.length - 1) {
      setFlipDirection('right');
      setTimeout(() => {
        setPage((p) => p + 1);
        setFlipDirection(null);
      }, 400);
    }
  };
  const prevPage = () => {
    if (page > 0) {
      setFlipDirection('left');
      setTimeout(() => {
        setPage((p) => p - 1);
        setFlipDirection(null);
      }, 400);
    }
  };

  // Get left and right page content
  const leftPage = pages[page];
  const rightPage = pages[page + 1] || { title: '', content: '' };

  return (
    <section className="book-section">
      <div className="book two-page">
        <div className={`book-page left-page${flipDirection === 'left' ? ' flip-left' : ''}`}> 
          <h2>{leftPage.title}</h2>
          <p>{leftPage.content}</p>
        </div>
        <div className={`book-page right-page${flipDirection === 'right' ? ' flip-right' : ''}`}> 
          <h2>{rightPage.title}</h2>
          <p>{rightPage.content}</p>
        </div>
        <div className="book-controls">
          <button onClick={prevPage} disabled={page === 0}>&lt; Prev</button>
          <span>Page {page + 1} / {pages.length}</span>
          <button onClick={nextPage} disabled={page >= pages.length - 1}>Next &gt;</button>
        </div>
      </div>
    </section>
  );
}

export default BookSection;
