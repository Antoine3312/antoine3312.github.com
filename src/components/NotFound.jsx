import '../assets/NotFound.scss';
import NavBar, { VARIANT_SECONDARY } from './Nav';
import AnimatedTitle from './AnimatedTitle';

const NotFound = () => (
  <div className="wrapper-not-found">
    <NavBar variant={VARIANT_SECONDARY} />
    <div className="content-not-found">
      <div className="circle circle-top" />
      <div className="circle circle-bottom" />

      <div className="error-msg">
        <h5>404</h5>
        <h2><AnimatedTitle text="Page Not Found" /></h2>
        <p>The page you are looking for could not be found</p>
      </div>
      <div className="who-am-i">
        <h4>Portfolio</h4>
        <h1>Antoine Mazeau</h1>
      </div>
    </div>
  </div>
);

export default NotFound;
