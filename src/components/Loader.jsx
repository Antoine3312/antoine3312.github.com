import clsx from 'clsx';
import { useEffect, useState } from 'react';
import '../assets/Loader.scss';

const Loader = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  console.log('isLoading');

  useEffect(() => {
    const handler = () => {
      console.log('load complete');

      setIsLoading(false);
    };
    window.addEventListener('load', handler);
  }, []);

  return (
    <>
      <div className={clsx({
        'loading-screen': true,
        // 'page-loaded': !isLoading,
      })}
      >
        <h1>loading</h1>
      </div>
      {/* {!isLoading && (children)} */}
    </>
  );
};

export default Loader;
