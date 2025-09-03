/* eslint-disable max-len */
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import '../assets/Homepage.scss';
import { BlurGradientBg } from '../lib/BlurGradientBg.module';
import projects from '../projects.json';
import AnimatedTitle, { WORD } from './AnimatedTitle';
import { useNavigation } from './NavigationProvider';
import useIsMobile from '../hooks/useIsMobile';

const Homepage = () => {
  const navigateTo = useNavigation();
  const isMobile = useIsMobile();

  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    const colorbg = new BlurGradientBg({
      dom: 'box',
      colors: ['#ff6601', '#ffae00', '#ff2e2e', '#cb000a'],
      loop: true,
    });
    setPageLoaded(true);
    return () => colorbg;
  }, []);

  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleWheel = e => {
      if (!isMobile) {
        e.preventDefault();
        window.scrollTo(0, 0);
        if (!hasScrolled) {
          setHasScrolled(true);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    // les returns dans un useEffect sont des fonctions appelées au démontage du composant (lorsque le comosant est retiré du DOM)
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [hasScrolled, isMobile]);

  const wrapperRef = useRef(null);
  const carousselRef = useRef(null);
  const [carousselSlideIndex, setCarousselSlideIndex] = useState(0);
  const [scrollAmount, setScrollAmount] = useState(0);
  const [isEnd, setIsEnd] = useState(false);

  const scrollCaroussel = toLeft => {
    if (isEnd && !toLeft) return;
    setCarousselSlideIndex(prev => (toLeft ? prev - 1 : prev + 1));
  };

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const caroussel = carousselRef.current;
    if (!wrapper || !caroussel) return;
    const { clientWidth } = wrapper;
    const { scrollWidth } = caroussel;

    const carousselStyle = window.getComputedStyle(caroussel);
    const gapValue = parseInt(carousselStyle.gap, 10) || 0;

    const cards = wrapper.querySelectorAll('.card');
    const cardWidth = cards[0].offsetWidth;

    setScrollAmount(() => {
      const scrollWanted = Math.floor(clientWidth / cardWidth) * (cardWidth + gapValue);

      setIsEnd(scrollWanted * carousselSlideIndex >= scrollWidth - clientWidth);

      return Math.min(scrollWanted * carousselSlideIndex, scrollWidth - clientWidth);
    });
  }, [carousselSlideIndex]);

  const onTabFocus = cardIndex => {
    const wrapper = wrapperRef.current;
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
              <h3><AnimatedTitle text="software engineer student" pageLoaded={pageLoaded} separation={WORD} /></h3>
              <button
                type="button"
                tabIndex={hasScrolled ? '-1' : '0'}
                style={{ pointerEvents: hasScrolled ? 'none' : 'auto' }}
                onClick={() => console.log('test')}
              >
                get my resume
                <img src="arrow.svg" alt="arrow icon" />
                <img src="arrow.svg" alt="arrow icon" className="to-translate" />
              </button>
            </div>
            <div className="header header_scroll">
              <h3><AnimatedTitle text="software engineer student" pageLoaded={pageLoaded} separation={WORD} /></h3>
              <button
                type="button"
                tabIndex={!hasScrolled ? '-1' : '0'}
                style={{ pointerEvents: !hasScrolled ? 'none' : 'auto' }}
                onClick={() => console.log('test 2')}
              >
                get my resume
                <img src="arrow.svg" alt="arrow icon" />
                <img src="arrow.svg" alt="arrow icon" className="to-translate" />
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
        <div className="wrapper_button">
          <button
            type="button"
            tabIndex={!hasScrolled ? '0' : '-1'}
            style={{ pointerEvents: hasScrolled ? 'none' : 'auto' }}
            onClick={() => { if (!isMobile) setHasScrolled(true); }}
          >
            <img src="arrow_bottom_orange.svg" alt="arrow icon" />
            <img src="arrow_bottom_orange.svg" alt="arrow icon" className="to-slide" />
          </button>
        </div>
        <div className="main_title">
          <h4>2025</h4>
          <h1><AnimatedTitle text="portfolio" pageLoaded={pageLoaded} hasScrolled={hasScrolled} /></h1>
        </div>
      </div>

      <div
        className={clsx({
          content: true,
          content_loaded: pageLoaded || isMobile,
          content_scrolled: hasScrolled || isMobile,
        })}
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex="-1"
      >
        <div className="header">
          <h1><AnimatedTitle text="main projects" pageLoaded={hasScrolled || isMobile} /></h1>
          <div className="caroussel_nav">
            <button
              type="button"
              className="arrow left"
              tabIndex={hasScrolled ? '0' : '-1'}
              style={{ pointerEvents: !hasScrolled ? 'none' : 'auto' }}
              disabled={carousselSlideIndex === 0}
              onClick={() => scrollCaroussel(true)}
            >
              <img src="arrow_left.svg" alt="arrow left icon" className="left-arrow" />
              <img src="arrow_left.svg" alt="arrow left icon" className="toSlide toSlide-left" />
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
              <img src="arrow_right.svg" alt="arrow right icon" className="toSlide" />
            </button>
          </div>
        </div>

        <div className="caroussel_wrapper" ref={wrapperRef} tabIndex="-1">
          <div
            ref={carousselRef}
            className="caroussel"
            style={{
              transition: '1s all ',
              transform: `translateX(-${scrollAmount}px)`,
            }}
          >
            {projects.map(({ title, desc_preview: description, preview }, index) => (
              <button
                type="button"
                className="card"
                key={title}
                tabIndex={hasScrolled || isMobile ? '0' : '-1'}
                aria-hidden={hasScrolled || isMobile}
                style={{ pointerEvents: hasScrolled || isMobile ? 'auto' : 'none' }}
                onFocus={() => onTabFocus(index)}
                onClick={() => navigateTo(title)}
                onMouseDown={e => e.preventDefault()}
                onMouseMove={e => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const image = e.currentTarget.querySelector('img');

                  const centerX = rect.width / 2;
                  const centerY = rect.height / 2;

                  const x = e.clientX - rect.left - centerX;
                  const y = e.clientY - rect.top - centerY;

                  image.style.transform = `translate(${x / 25}px, ${y / 25}px)`;
                }}
                onMouseLeave={e => { e.currentTarget.querySelector('img').style.transform = 'translate3d(0px, 0px, 0px)'; }}
              >
                <div className="img_container">
                  <img src={preview} alt={preview.split('.')[0]} />
                </div>
                <div className="titles">
                  <img src={preview} alt={preview.split('.')[0]} />
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
