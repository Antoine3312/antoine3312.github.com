import '../assets/Nav.scss';

const NavBar = () => {
  const handleResume = () => {
    console.log('resume');
  };

  return (
    <div className="navbar">
      <div className="content">

        <button
          type="button"
          onClick={handleResume}
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
