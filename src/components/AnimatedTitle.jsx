import clsx from 'clsx';
import '../assets/AnimatedTitle.scss';
import { useEffect, useRef, useState } from 'react';

export const WORD = 'word';
export const LETTER = 'letter';

const AnimatedTitle = ({ text, pageLoaded, separation = LETTER }) => {
  const wrapperRef = useRef(null);
  const [baseHeight, setBaseHeight] = useState(0);

  const segments = separation === LETTER ? [...text] : text.split(' ');

  useEffect(() => {
    if (wrapperRef.current) {
      const { height } = wrapperRef.current.getBoundingClientRect();
      setBaseHeight(height);
    }
  }, []);

  return (

    <div className="animated-title" ref={wrapperRef}>
      {segments.map((segment, index) => {
        const displayChar = separation === WORD ? `${segment}\u00A0` : segment;
        return (
          <span
            key={`${segment}-${index}`}
            style={{ transform: `translateY(${baseHeight + index * 30}px)` }}
            className={clsx({
              loaded: pageLoaded,
            })}
          >
            {displayChar === ' ' ? '\u00A0' : displayChar}
          </span>
        );
      })}
    </div>
  );
};

export default AnimatedTitle;
