import { useEffect, useState } from 'react';
import '../assets/Entrance.scss';
import clsx from 'clsx';

const Entrance = () => {
  const [amount, setAmount] = useState(100);
  const [isFinish, setIsFinsh] = useState(false);

  useEffect(() => {
    let current = 0;

    const interval = setInterval(() => {
      current += 1;
      setAmount(current);

      if (current >= 100) {
        clearInterval(interval);
      }
    }, 10);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const wrapper = document.querySelector('.title-container');
    if (!wrapper) return;

    const handleEnd = () => {
      setIsFinsh(true);
      wrapper.removeEventListener('animationend', handleEnd);
    };

    wrapper.addEventListener('animationend', handleEnd);
  }, []);

  return (
    <div className={clsx({
      'wrapper-entrance': true,
      'remove-from-dom': isFinish,
    })}
    >
      <div className="title-container">
        <h3>{amount}</h3>
      </div>
    </div>
  );
};

export default Entrance;
