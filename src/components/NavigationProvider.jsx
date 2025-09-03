import { createContext, useCallback, useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/NavigationProvider.scss';
import clsx from 'clsx';

export const slugify = str =>
  str
    .toLowerCase()
    .normalize('NFD') // accents → lettres + diacritiques
    .replace(/[\u0300-\u036f]/g, '') // supprime les diacritiques
    .replace(/[^a-z0-9]+/g, '-') // remplace tout sauf lettres/nombres par -
    .replace(/^-+|-+$/g, ''); // supprime les - au début/fin

const NavigationContext = createContext();

const NavigationProvider = ({ children }) => {
  const navigate = useNavigate();
  const transitionRef = useRef(null);

  const [active, setActive] = useState(false);
  const [title, setTitle] = useState('');

  const navigateTo = useCallback(destination => {
    setActive(true);
    setTitle(destination || 'HOME');

    const transitionFrame = transitionRef.current;
    if (!transitionFrame) return;

    const handleEnd = e => {
      if (e.animationName === 'go-down') {
        navigate(`/${slugify(destination)}`);
      }

      if (e.animationName === 'go-up') {
        setActive(false);
        transitionFrame.removeEventListener('animationend', handleEnd);
      }
    };

    transitionFrame.addEventListener('animationend', handleEnd);
  }, [navigate]);

  return (
    <NavigationContext.Provider value={navigateTo}>
      {children}
      <div
        className={clsx({
          'transition-frame': true,
          'transition-frame-active': active,
        })}
        ref={transitionRef}
      >
        <div className={clsx({
          'wrapper-title': true,
          'wrapper-title-active': active,
        })}
        >
          <h1>{title}</h1>
        </div>
      </div>
    </NavigationContext.Provider>
  );
};

export function useNavigation () {
  return useContext(NavigationContext);
}

export default NavigationProvider;
