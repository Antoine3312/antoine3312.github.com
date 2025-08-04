import clsx from 'clsx';
import ReactLenis from 'lenis/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../assets/Project.scss';
import projects from '../projects.json';
import { slugify } from './Homepage';
import NavBar, { CONTENT_TO_NAV_GAP, NAV_HEIGHT } from './Nav';

const Project = () => {
  const { projectSlug } = useParams();
  const { title, description, tags, url, images } = projects
    .find(({ title: projectTitle }) => slugify(projectTitle) === projectSlug);

  const [isScrolledTop, setIsScrolledTop] = useState(true);

  const [scrollPosition, setScrollPosition] = useState(0);
  const [lastScrollTop, setLastScrollTop] = useState(0);

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
      <ReactLenis root />
      <NavBar
        scrollPos={scrollPosition}
      />
      <div
        className={clsx({
          'wrapper-project': true,
          'wrapper-project-scrolled': !isScrolledTop,
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
            {url && (
            <a href={url} target="_blank" rel="noreferrer">
              <div className="left">
                <div className="dot" />
                <p>visit site</p>
              </div>
              <img src="arrow_right.svg" alt="arrow right icon" />
            </a>
            )}
          </div>
          <div className="description-scroll">
            <h1>{title}</h1>
            {url && (
            <a href={url} target="_blank" rel="noreferrer">
              <p>visit site</p>
              <img src="arrow_right.svg" alt="arrow right icon" />
            </a>
            )}
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
              />
            );
          })}
        </div>
      </div>
      {/* <h1>Test</h1> */}
    </>
  );
};

export default Project;
