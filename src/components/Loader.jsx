import clsx from 'clsx';
import '../assets/Loader.scss';
import { Suspense, useEffect, useState } from 'react';

const Loader = ({ children, delay = 1000 }) => {
  const [keepLoader, setKeepShowLoader] = useState(true);
  const [showTransition, setShowTransition] = useState(false);

  const onLoaded = () => {
    setShowTransition(true);
    setTimeout(() => {
      setKeepShowLoader(false);
    }, delay);
  };

  const fallback = (
    <div className={clsx({
      'loading-screen': true,
      'transition-disapear': showTransition,
    })}
    >
      <h1>loading</h1>
    </div>
  );

  return (
    <Suspense fallback={fallback}>
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
