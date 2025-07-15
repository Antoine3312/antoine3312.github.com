/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import '../assets/Homepage.scss';
import clsx from 'clsx';
import AnimatedTitle, { WORD } from './AnimatedTitle';

const Homepage = () => {
  const [pageLoaded, setPageLoeaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setPageLoeaded(true);
    }, 500);
  }, []);

  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleWheel = e => {
      e.preventDefault(); // bloque le scroll natif
      window.scrollTo(0, 0); // force la position
      if (!hasScrolled) {
        setHasScrolled(true); // ton animation personnalisée
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
  }, [hasScrolled]);

  return (
    <div className="homepage">

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
      </div>

      <div className={clsx({
        headings_footer: true,
        footer_loaded: pageLoaded,
        footer_scrolled: hasScrolled,
      })}
      >
        <button
          type="button"
          tabIndex={!hasScrolled ? '0' : '-1'}
          aria-hidden={!hasScrolled}
          style={{ pointerEvents: hasScrolled ? 'none' : 'auto' }}
          onClick={() => { setHasScrolled(true); }}
        >
          <img src="arrow_bottom_orange.svg" alt="arrow icon" />
        </button>
        <div className="main_title">
          <h4>2025</h4>
          <h1><AnimatedTitle text="portfolio" pageLoaded={pageLoaded} hasScrolled={hasScrolled} /></h1>
        </div>
      </div>

      <div className={clsx({
        content: true,
        content_loaded: pageLoaded,
        content_scrolled: hasScrolled,
      })}
      >
        <h1><AnimatedTitle text="main projects" pageLoaded={hasScrolled} /></h1>

        <div className="caroussel">
          <button
            type="button"
            className="card"
            tabIndex={hasScrolled ? '0' : '-1'}
            aria-hidden={hasScrolled}
            style={{ pointerEvents: !hasScrolled ? 'none' : 'auto' }}
          >
            <div className="img_container">
              <img src="presences_preview.png" alt="presences preview" />
            </div>
            <div className="titles">
              <img src="presences_preview.png" alt="presences preview" />
              <h4>Présences</h4>
              <p>A web-app made in my previous internship which goal was to organise the usage of the office’s desktop</p>
            </div>
          </button>
          <div className="card">
            <div className="img_container">
              <img src="passeportcarbone_preview.png" alt="passeportcarbone preview" />
            </div>
            <div className="titles">
              <img src="passeportcarbone_preview.png" alt="passeportcarbone preview" />
              <h4>passeport carbone</h4>
              <p>A web-app broadcasted to the student of my school to make them aware of their carbon footprint </p>
            </div>
          </div>
          <div className="card">
            <div className="img_container">
              <img src="vlock_preview.png" alt="v-lock preview" />
            </div>
            <div className="titles">
              <img src="vlock_preview.png" alt="v-lock preview" />
              <h4>v-lock</h4>
              <p>A mobile application that can be use to store and secure your own bike in town</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
