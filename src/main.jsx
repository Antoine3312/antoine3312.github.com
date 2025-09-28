import { inject } from '@vercel/analytics';
import ReactLenis from 'lenis/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Loader from './components/Loader';
import NavigationProvider from './components/NavigationProvider';
import lazyWithDelay from './helpers';

inject();

const ANIMATION_ENTRANCE_DELAY = 1000;

const Homepage = lazyWithDelay(() => import('./components/Homepage'), ANIMATION_ENTRANCE_DELAY);
const Project = lazyWithDelay(() => import('./components/Project'), ANIMATION_ENTRANCE_DELAY);
const NotFound = lazyWithDelay(() => import('./components/NotFound'), ANIMATION_ENTRANCE_DELAY);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ReactLenis root>
      <BrowserRouter>
        <NavigationProvider>
          <Loader delayLeaving={ANIMATION_ENTRANCE_DELAY + 500}>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/:projectSlug" element={<Project />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Loader>
        </NavigationProvider>
      </BrowserRouter>
    </ReactLenis>
  </StrictMode>,
);
