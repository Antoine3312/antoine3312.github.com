import clsx from 'clsx';
import '../assets/Nav.scss';

export const NAV_HEIGHT = 100;
export const CONTENT_TO_NAV_GAP = 20;

const NavBar = ({ scrollPos }) => {
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
