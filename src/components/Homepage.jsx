/* eslint-disable max-len */
import { useEffect, useRef, useState } from 'react';
import '../assets/Homepage.scss';
import clsx from 'clsx';
import { BlurGradientBg } from '../lib/BlurGradientBg.module';
import AnimatedTitle, { WORD } from './AnimatedTitle';

const Homepage = () => {
  const [pageLoaded, setPageLoeaded] = useState(false);

  useEffect(() => {
    const colorbg = new BlurGradientBg({
      dom: 'box',
      colors: ['#ff6601', '#ffae00', '#ff2e2e', '#cb000a'],
      loop: true,
    });
    setTimeout(() => {
      setPageLoeaded(true);
    }, 500);
    return () => colorbg;
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

  const projects = [
    {
      title: 'Présences',
      description: 'A web-app made in my previous internship which goal was to organise the usage of the office’s desktop',
      src: 'presences_preview.png',
    },
    {
      title: 'passeport carbone',
      description: 'A web-app broadcasted to the student of my school to make them aware of their carbon footprint',
      src: 'passeportcarbone_preview.png',
    },
    {
      title: 'v-lock',
      description: 'A mobile application that can be use to store and secure your own bike in town',
      src: 'vlock_preview.png',
    },
  ];

  const carousselRef = useRef(null);
  const [carousselSlideIndex, setCarousselSlideIndex] = useState(0);
  const [scrollAmount, setScrollAmount] = useState(0);
  const [isEnd, setIsEnd] = useState(false);

  const scrollCaroussel = toLeft => {
    if (isEnd && !toLeft) return;
    setCarousselSlideIndex(prev => (toLeft ? prev - 1 : prev + 1));
  };

  useEffect(() => {
    const wrapper = carousselRef.current;
    if (!wrapper) return;
    const { clientWidth } = wrapper;

    const carousselEl = wrapper.querySelector('.caroussel');
    const carousselStyle = window.getComputedStyle(carousselEl);
    const gapValue = parseInt(carousselStyle.gap, 10) || 0;

    const cards = wrapper.querySelectorAll('.card');
    const cardWidth = cards[0].offsetWidth;

    setScrollAmount(() => {
      const scrollWanted = Math.floor(clientWidth / cardWidth) * (cardWidth + gapValue);

      setIsEnd(scrollWanted * carousselSlideIndex >= carousselEl.scrollWidth - clientWidth);

      return Math.min(scrollWanted * carousselSlideIndex, carousselEl.scrollWidth - clientWidth);
    });
  }, [carousselSlideIndex]);

  const onTabFocus = cardIndex => {
    const wrapper = carousselRef.current;
    if (!wrapper) return;
    const { clientWidth } = wrapper;

    const carousselEl = wrapper.querySelector('.caroussel');
    const carousselStyle = window.getComputedStyle(carousselEl);
    const gapValue = parseInt(carousselStyle.gap, 10) || 0;

    const cards = wrapper.querySelectorAll('.card');
    const cardWidth = cards[0].offsetWidth;

    if ((cardIndex + 1) * cardWidth + cardIndex * gapValue >= clientWidth) {
      scrollCaroussel(false);
    }
  };

  const boxRef = useRef(null);

  return (
    <div className="homepage">

      <div className={clsx({
        wrapper_headings: true,
        is_loaded: pageLoaded,
        has_scrolled: hasScrolled,
      })}
      >
        <div className="headings" id="box">
          <div className="gradient_bottom" />
          <div className="gradient_top" />
          <div className="wrapper_header">
            <div className="header">
              <h3><AnimatedTitle text="web & software engineer student" pageLoaded={pageLoaded} separation={WORD} /></h3>
              <button
                type="button"
                tabIndex={!hasScrolled ? '0' : '-1'}
                style={{ pointerEvents: !hasScrolled ? 'none' : 'auto' }}
              >
                get my resume
                <img src="arrow.svg" alt="arrow icon" />
              </button>
            </div>
            <div className="header header_scroll">
              <h3><AnimatedTitle text="web & software engineer student" pageLoaded={pageLoaded} separation={WORD} /></h3>
              <button
                type="button"
                tabIndex={hasScrolled ? '0' : '-1'}
                style={{ pointerEvents: hasScrolled ? 'none' : 'auto' }}
              >
                get my resume
                <img src="arrow.svg" alt="arrow icon" />
              </button>
            </div>
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

      <div
        className={clsx({
          content: true,
          content_loaded: pageLoaded,
          content_scrolled: hasScrolled,
        })}
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex="-1"
      >
        <div className="header">
          <h1><AnimatedTitle text="main projects" pageLoaded={hasScrolled} /></h1>
          <div className="caroussel_nav">
            <button
              type="button"
              className="arrow left"
              tabIndex={hasScrolled ? '0' : '-1'}
              style={{ pointerEvents: !hasScrolled ? 'none' : 'auto' }}
              disabled={carousselSlideIndex === 0}
              onClick={() => scrollCaroussel(true)}
            >
              <img src="arrow_left.svg" alt="arrow left icon" />
            </button>
            <button
              type="button"
              className="arrow right"
              tabIndex={hasScrolled ? '0' : '-1'}
              style={{ pointerEvents: !hasScrolled ? 'none' : 'auto' }}
              disabled={isEnd}
              onClick={() => scrollCaroussel(false)}
            >
              <img src="arrow_right.svg" alt="arrow right icon" />
            </button>
          </div>
        </div>

        <div className="caroussel_wrapper" ref={carousselRef} tabIndex="-1">
          <div
            className="caroussel"
            style={{
              transition: '1s all ',
              transform: `translateX(-${scrollAmount}px)`,
            }}
          >
            {projects.map(({ title, description, src }, index) => (
              <button
                type="button"
                className="card"
                key={title}
                tabIndex={hasScrolled ? '0' : '-1'}
                aria-hidden={hasScrolled}
                style={{ pointerEvents: !hasScrolled ? 'none' : 'auto' }}
                onFocus={() => onTabFocus(index)}
                onClick={() => console.log('click')}
                onMouseDown={e => e.preventDefault()}
              >
                <div className="img_container">
                  <img src={src} alt={src.split('.')[0]} />
                </div>
                <div className="titles">
                  <img src={src} alt={src.split('.')[0]} />
                  <h4>{title}</h4>
                  <p>{description}</p>
                </div>
              </button>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
