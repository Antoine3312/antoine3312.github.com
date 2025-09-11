import clsx from 'clsx';
import '../assets/Nav.scss';
import { useNavigation } from './NavigationProvider';

export const NAV_HEIGHT = 100;
export const CONTENT_TO_NAV_GAP = 20;

export const VARIANT_PRIMARY = 'primary';
export const VARIANT_SECONDARY = 'secondary';

const NavBar = ({ scrollPos, variant = VARIANT_PRIMARY }) => {
  const navigateTo = useNavigation();

  const handleResume = e => {
    e.currentTarget.blur();
    window.open('/cv.pdf', '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className={clsx({
        navbar: true,
        secondary: variant === VARIANT_SECONDARY,
      })}
      style={{ top: scrollPos, height: `${NAV_HEIGHT}px` }}
    >
      <div className="content">
        <button
          type="button"
          onClick={() => navigateTo('')}
          tabIndex={scrollPos === -100 ? '-1' : '0'}
        >
          <img src="arrow_left-white.svg" alt="arrow icon" />
          <img src="arrow_left-white.svg" alt="arrow icon" className="to-translate to-translate-left" />
          HOME
        </button>
        <button
          type="button"
          onClick={handleResume}
          tabIndex={scrollPos === -100 ? '-1' : '0'}
        >
          get my resume
          <img src="arrow.svg" alt="arrow icon" />
          <img src="arrow.svg" alt="arrow icon" className="to-translate" />
        </button>
      </div>
    </div>
  );
};

export default NavBar;
