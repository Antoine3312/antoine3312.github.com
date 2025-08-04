// import ReactLenis from 'lenis/react';
import { useParams } from 'react-router-dom';
import '../assets/Project.scss';
import NavBar from './Nav';

import projects from '../projects.json';
import { slugify } from './Homepage';

const Project = () => {
  const { projectSlug } = useParams();
  const { title, description, tags, url, images } = projects
    .find(({ title: projectTitle }) => slugify(projectTitle) === projectSlug);

  return (
    <>
      {/* <ReactLenis root /> */}
      <NavBar />
      <div className="wrapper-project">
        <div className="wrapper-description">
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
              <div className="dot" />
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
                <div className="row">{img.map(actuelImg => (
                  <img
                    src={actuelImg}
                    alt={actuelImg}
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
