/* eslint-disable max-len */
import clsx from 'clsx';
import { Fragment, useEffect, useRef, useState } from 'react';
import '../assets/Homepage.scss';
import { BlurGradientBg } from '../lib/BlurGradientBg.module';
import projects from '../projects.json';
import experiences from '../experiences.json';
import AnimatedTitle, { WORD } from './AnimatedTitle';
import { useNavigation } from './NavigationProvider';
import useIsMobile from '../hooks/useIsMobile';
import ImageComponent from './ImageComponent';

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
  const [blockScroll, setBlockScroll] = useState(true);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleWheel = e => {
      if (!isMobile && blockScroll) {
        e.preventDefault();
        window.scrollTo(0, 0);

        if (!hasScrolled) {
          setHasScrolled(true);
        }
        // Debounce le premier scroll pour qu'il reste bloqué
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          setBlockScroll(false);
        }, 75);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    // les returns dans un useEffect sont des fonctions appelées au démontage du composant (lorsque le comosant est retiré du DOM)
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [hasScrolled, isMobile, blockScroll]);

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

      setIsEnd(scrollWanted * carousselSlideIndex >= scrollWidth - clientWidth && carousselSlideIndex !== 0);

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

  const handleResume = e => {
    e.currentTarget.blur();
    window.open('/cv.pdf', '_blank', 'noopener,noreferrer');
  };

  const [showPopup, setShowPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [popupTranslation, setPopupTranslation] = useState({ x: 0, y: 0 });
  const targetPos = useRef({ x: 0, y: 0 });
  const [popupUrl, setPopupUrl] = useState('');

  const handlePopupEnter = e => {
    if (!showPopup) {
      setPopupTranslation({ x: 0, y: 0 });
      setShowPopup(true);
    }
    const container = e.currentTarget.getBoundingClientRect();
    const exploreButton = document.getElementById('explore');
    const { width, height } = exploreButton.getBoundingClientRect();

    const { x, y } = {
      x: e.clientX - container.x - (width / 2),
      y: e.clientY - container.y - (height / 2),
    };

    setPopupPosition({ x, y });
  };

  useEffect(() => {
    let raf;
    const animate = () => {
      setPopupTranslation(prev => {
        const dx = targetPos.current.x - prev.x;
        const dy = targetPos.current.y - prev.y;

        const easing = 0.035; // 0 -> lent

        return {
          x: prev.x + dx * easing,
          y: prev.y + dy * easing,
        };
      });
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  const handlePopupMove = e => {
    const container = e.currentTarget.getBoundingClientRect();
    const exploreButton = document.getElementById('explore').getBoundingClientRect();
    targetPos.current = {
      x: e.clientX - container.x - (exploreButton.width / 2) - popupPosition.x,
      y: e.clientY - container.y - (exploreButton.height / 2) - popupPosition.y,
    };
  };

  return (
    <div className={clsx('homepage', { 'homepage-scrolled': !blockScroll })}>
      <div className={clsx({
        wrapper_headings: true,
        is_loaded: pageLoaded,
        has_scrolled: hasScrolled,
      })}
      >
        <div className="headings" id="box">
          <div className="wrapper_header">
            <div className="header">
              <h3><AnimatedTitle text="software engineer student" pageLoaded={pageLoaded} separation={WORD} /></h3>
              <button
                type="button"
                tabIndex={hasScrolled ? '-1' : '0'}
                style={{ pointerEvents: hasScrolled ? 'none' : 'auto' }}
                onClick={handleResume}
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
                onClick={handleResume}
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
        <div className="section-caroussel">
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
                    const animate = () => {
                      image.style.transform = `translate(${x / 25}px, ${y / 25}px)`;
                    };
                    requestAnimationFrame(animate);
                  }}
                  onMouseLeave={e => { e.currentTarget.querySelector('img').style.transform = 'translate3d(0px, 0px, 0px)'; }}
                >
                  <div className="img_container">
                    <ImageComponent src={preview} alt={preview.split('.')[0]} />
                  </div>
                  <div className="titles">
                    <ImageComponent src={preview} alt={preview.split('.')[0]} />
                    <h4>{title}</h4>
                    <p>{description}</p>
                  </div>
                </button>
              ))}

            </div>
          </div>
        </div>

        <div className="section-professional">
          <div className="header">
            <h1>Work experiences</h1>
            <a href="https://www.linkedin.com/in/antoine-mazeau-153767252/" target="_blank" rel="noreferrer">
              LinkedIn
              <div className="wrapper-translation">
                <img src="arrow.svg" alt="arrow icon" />
                <img src="arrow.svg" alt="arrow icon" className="to-translate" />
              </div>
            </a>
          </div>
          <div
            className="wrapper-content"
            onMouseEnter={handlePopupEnter}
            onMouseMove={handlePopupMove}
            onWheel={handlePopupMove}
            onMouseLeave={() => setShowPopup(false)}
          >
            <a
              id="explore"
              href={popupUrl}
              target="_blank"
              className={clsx('explore')}
              tabIndex={-1}
              style={{
                top: `${popupPosition.y}px`,
                left: `${popupPosition.x}px`,
                transform: `translate3d(${popupTranslation.x}px, ${popupTranslation.y}px, 0)`,
              }}
              rel="noreferrer"
            >
              <div
                className="wrapper"
                style={{
                  transform: showPopup ? 'scale(1)' : 'scale(0)',
                  opacity: showPopup ? '1' : '0',
                }}
              >
                <div className="wrapper-translation">
                  <div className="content-explore">
                    <h5>Discover company</h5>
                    <div className="wrapper-img">
                      <img src="arrow.svg" alt="arrow" />
                    </div>
                  </div>

                  <div className="content-explore to-translate">
                    <h5>Discover company</h5>
                    <div className="wrapper-img">
                      <img src="arrow.svg" alt="arrow" />
                    </div>
                  </div>
                </div>
              </div>
            </a>

            {experiences.map(({ role, company, description, begin_month: beginMonth, begin_year: beginYear, end_month: endMonth, end_year: endYear, tags, url }, index) => (
              <Fragment key={role + company}>
                <a
                  href={url}
                  target="_blank"
                  className="line"
                  rel="noreferrer"
                  onMouseMove={() => setPopupUrl(url)}
                  onWheel={() => setPopupUrl(url)}
                >
                  <div className="dates">
                    <div className="date">
                      <p className="month">{beginMonth}</p>
                      <p>'{beginYear}</p>
                    </div>
                    <p>-</p>
                    <div className="date">
                      <p className="month">{endMonth}</p>
                      <p>'{endYear}</p>
                    </div>
                  </div>
                  <h2>{role}</h2>
                  <div className="description">
                    <div className="summary">
                      <div className="titles">
                        <h5>{company}</h5>
                        <p>{description}</p>
                      </div>
                      <div className="tags">
                        {tags.map(tag => (
                          <p key={tag}>{tag}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </a>
                {index + 1 !== experiences.length && (
                  <div className="separator" />
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
