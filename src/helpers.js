import { lazy } from 'react';

function wait (ms) {
  return new Promise(resolve => {
    setTimeout(() => resolve(), ms);
  });
}

// const lazyWithDelay = (factory, delay) => lazy(() =>
//   Promise.all([factory(), wait(delay)]));

const lazyWithDelay = (factory, delay) => lazy(async () => {
  await wait(delay);
  return factory();
});

export default lazyWithDelay;
