import { useEffect, useState } from 'react';
import '../assets/Homepage.scss';
import clsx from 'clsx';
import AnimatedTitle, { WORD } from './AnimatedTitle';

const Homepage = () => {
  const [pageLoaded, setPageLoeaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setPageLoeaded(true);
    }, 0);
  }, []);

  const [hasScrolled, setHasScrolled] = useState(false);

  window.addEventListener('wheel', () => {
    if (!hasScrolled) {
      setHasScrolled(true);
    }
  });

  return (
    <div className={clsx({
      wrapper_headings: true,
      is_loaded: pageLoaded,
      has_scrolled: hasScrolled,
    })}
    >
      <div className="headings">
        <div className="gradient_bottom" />
        <div className="gradient_top" />
        <div className="header">
          <h3><AnimatedTitle text="web & software engineer student" pageLoaded={pageLoaded} separation={WORD} /></h3>
          <button type="button">
            get my resume
            <img src="arrow.svg" alt="arrow icon" />
          </button>
        </div>
      </div>
      <div className="footer">
        <button type="button"><img src="arrow_bottom_orange.svg" alt="arrow icon" /></button>
        <div className="main_title">
          <h4>2025</h4>
          <h1><AnimatedTitle text="portfolio" pageLoaded={pageLoaded} hasScrolled={hasScrolled} /></h1>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
