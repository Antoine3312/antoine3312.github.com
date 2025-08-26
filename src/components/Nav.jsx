import clsx from 'clsx';
import '../assets/Nav.scss';
import { useNavigation } from './NavigationProvider';

export const NAV_HEIGHT = 100;
export const CONTENT_TO_NAV_GAP = 20;

const NavBar = ({ scrollPos }) => {
  const navigateTo = useNavigation();

  const handleResume = () => {
    console.log('resume');
  };

  return (
    <div
      className={clsx({
        navbar: true,
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
