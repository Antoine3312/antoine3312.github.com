import clsx from 'clsx';
import '../assets/Loader.scss';
import { Suspense, useEffect, useState } from 'react';

const Loader = ({ children, delayLeaving }) => {
  const [keepLoader, setKeepShowLoader] = useState(true);
  const [showTransition, setShowTransition] = useState(false);

  const animationDuration = 1000;

  const onLoaded = () => {
    setTimeout(() => {
      setShowTransition(true);
    }, delayLeaving - animationDuration);

    setTimeout(() => {
      setKeepShowLoader(false);
    }, delayLeaving);
  };

  const fallback = (
    <div
      className={clsx({
        'loading-screen': true,
        'transition-disapear': showTransition,
      })}
      style={{
        animation: showTransition && `disapear ${animationDuration / 1000}s cubic-bezier(0.3, 0.29, 0, 01) forwards`,
      }}
    >
      <div className="wrapper-title appearance">
        <h1
          style={{
            animation: showTransition && `move-up ${animationDuration / 1000}s cubic-bezier(0.3, 0.29, 0, 01) forwards`,
          }}
        >
          WELCOME
        </h1>
      </div>
    </div>
  );

  return (
    <Suspense fallback={(
      <div className="transition-appear">
        {fallback}
      </div>
    )}
    >
      <ContentWrapper onLoaded={onLoaded}>
        {children}
      </ContentWrapper>
      {keepLoader && fallback}
    </Suspense>

  );
};

const ContentWrapper = ({ children, onLoaded }) => {
  useEffect(() => {
    onLoaded();
  }, [onLoaded]);
  return children;
};

export default Loader;
