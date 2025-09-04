import clsx from 'clsx';
import { useLenis } from 'lenis/react';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import '../assets/Project.scss';
import projects from '../projects.json';
import NavBar, { CONTENT_TO_NAV_GAP, NAV_HEIGHT } from './Nav';
import { slugify, useNavigation } from './NavigationProvider';
import useIsMobile from '../hooks/useIsMobile';

const Project = () => {
  const navigateTo = useNavigation();
  const lenis = useLenis();
  const nextProjetcBtn = useRef(null);
  const isMobile = useIsMobile();

  const { projectSlug } = useParams();
  const { title, description, tags, url, images, company_url: companyUrl } = projects
    .find(({ title: projectTitle }) => slugify(projectTitle) === projectSlug);
  const projectIndex = projects
    .findIndex(({ title: projectTitle }) => slugify(projectTitle) === projectSlug);
  const nextProject = projects[(projectIndex + 1) % projects.length];

  const [isScrolledTop, setIsScrolledTop] = useState(true);

  const [scrollPosition, setScrollPosition] = useState(0);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  const location = useLocation();

  useEffect(() => {
    if (!lenis) return;
    lenis.scrollTo(0, { immediate: true });
    setScrollPosition(0);
  }, [lenis, location.pathname]);

  useEffect(() => {
    const handleWheel = () => {
      const currentScrollPos = window.scrollY;
      setIsScrolledTop(currentScrollPos <= 50);

      setScrollPosition(prevPosition => {
        if (currentScrollPos >= lastScrollTop && !isScrolledTop) {
          return Math.max(-NAV_HEIGHT, prevPosition - 5);
        }
        return Math.min(0, prevPosition + 5);
      });

      setLastScrollTop(currentScrollPos);
    };

    window.addEventListener('scroll', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('scroll', handleWheel);
    };
  }, [lastScrollTop, isScrolledTop]);

  return (
    <>
      <NavBar
        scrollPos={scrollPosition}
      />
      <div
        className={clsx({
          'wrapper-project': true,
          'wrapper-project-scrolled': !isScrolledTop && !isMobile,
        })}
        style={{
          paddingTop: `${NAV_HEIGHT + CONTENT_TO_NAV_GAP + scrollPosition}px`,
        }}
      >
        <div
          className="wrapper-description"
          style={{
            height: `calc(100vh  - ${NAV_HEIGHT + CONTENT_TO_NAV_GAP + scrollPosition}px - 20px)`,
            top: `${NAV_HEIGHT + CONTENT_TO_NAV_GAP + scrollPosition}px`,
          }}
        >
          <div className="description">
            <div className="details">
              <h1>{title}</h1>
              <div className="tags">
                {tags.map(t => <h4 key={t}>{t}</h4>)}
              </div>
              <p>{description}</p>
            </div>
            <div className="urls">
              {companyUrl && (
                <a
                  href={companyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="company"
                  tabIndex={isScrolledTop ? '0' : '-1'}
                  onClick={e => e.currentTarget.blur()}
                >
                  <div className="wrapper-translation">
                    <p>discover company</p>
                    <p className="to-translate">discover company</p>
                  </div>
                  <div className="wrapper-translation">
                    <img src="arrow_top_right.svg" alt="arrow right icon" />
                    <img src="arrow_top_right.svg" alt="arrow right icon" className="to-translate" />
                  </div>
                </a>
              )}
              {url && (
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="site"
                  tabIndex={isScrolledTop ? '0' : '-1'}
                  onClick={e => e.currentTarget.blur()}
                >
                  <div className="left">
                    <div className="dot" />
                    <div className="wrapper-translation">
                      <p>visit site</p>
                      <p className="to-translate">visit site</p>
                    </div>
                  </div>
                  <div className="wrapper-translation">
                    <img src="arrow_top_right.svg" alt="arrow right icon" />
                    <img src="arrow_top_right.svg" alt="arrow right icon" className="to-translate" />
                  </div>
                </a>
              )}
            </div>
          </div>
          <div
            className="description-scroll"
            style={{
              display: isMobile && 'none',
            }}
          >
            <h1>{title}</h1>
            <div className="urls">
              {companyUrl && (
                <a
                  href={companyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="company"
                  tabIndex={isScrolledTop ? '-1' : '0'}
                  onClick={e => e.currentTarget.blur()}
                >
                  <div className="wrapper-translation">
                    <p>company</p>
                    <p className="to-translate">company</p>
                  </div>
                  <div className="wrapper-translation">
                    <img src="arrow_top_right.svg" alt="arrow right icon" />
                    <img src="arrow_top_right.svg" alt="arrow right icon" className="to-translate" />
                  </div>
                </a>
              )}
              {url && (
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="site"
                  tabIndex={isScrolledTop ? '-1' : '0'}
                  onClick={e => e.currentTarget.blur()}
                >
                  <div className="wrapper-translation">
                    <p>visit site</p>
                    <p className="to-translate">visit site</p>
                  </div>
                  <div className="wrapper-translation">
                    <img src="arrow_top_right.svg" alt="arrow right icon" />
                    <img src="arrow_top_right.svg" alt="arrow right icon" className="to-translate" />
                  </div>
                </a>
              )}
            </div>
          </div>
        </div>
        <div className="wrapper-images">
          {images.map(img => {
            if (Array.isArray(img)) {
              return (
                <div className="row" key={img}>{img.map(actuelImg => (
                  <img
                    src={actuelImg}
                    alt={actuelImg}
                    key={actuelImg}
                    className="image"
                    loading="lazy"
                  />
                ))}
                </div>
              );
            }

            return (
              <img
                src={img}
                alt={img}
                key={img}
                className="image"
                loading="lazy"
              />
            );
          })}
        </div>
      </div>
      <div className="wrapper-next-project">
        <div className="transition">
          <h4>Interested to see more ?</h4>
        </div>
        <button
          type="button"
          onClick={e => {
            e.currentTarget.blur();
            navigateTo(nextProject.title);
          }}
          ref={nextProjetcBtn}
        >
          <div className="button-text">
            <h4>next project</h4>
            <div className="wrapper-to-move">
              <h1>{nextProject.title}</h1>
              <h1 className="to-move">{nextProject.title}</h1>
            </div>
          </div>
          <div className="wrapper-img-to-move">
            <img src="big-arrow-right.svg" alt="arrow right icon" />
            <img src="big-arrow-right.svg" alt="arrow right icon" className="img-to-move" />
          </div>
        </button>
      </div>
    </>
  );
};

export default Project;
