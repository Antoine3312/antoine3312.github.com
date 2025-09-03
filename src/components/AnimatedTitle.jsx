import clsx from 'clsx';
import '../assets/AnimatedTitle.scss';
import { useEffect, useRef, useState } from 'react';
import useIsMobile from '../hooks/useIsMobile';

export const WORD = 'word';
export const LETTER = 'letter';

const AnimatedTitle = ({ text, pageLoaded = true, hasScrolled = false, separation = LETTER }) => {
  const wrapperRef = useRef(null);
  const [baseHeight, setBaseHeight] = useState(0);
  const isMobile = useIsMobile();

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
            style={{
              top: `${baseHeight + index * 30}px`,
              transform: hasScrolled && `translateY(-${baseHeight + index * 30}px)`,
              transition: hasScrolled && 'transform 1s cubic-bezier(0.3, 0.29, 0, 01)',
            }}
            className={clsx({
              loaded: pageLoaded,
              mobile: isMobile,
              scrolled: hasScrolled,
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
