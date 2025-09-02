import ReactLenis from 'lenis/react';
import { lazy, StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavigationProvider from './components/NavigationProvider';
import Loader from './components/Loader';

const Homepage = lazy(() => import('./components/Homepage'));
const Project = lazy(() => import('./components/Project'));

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ReactLenis root>
      <BrowserRouter>
        <NavigationProvider>
          {/* <Suspense fallback={<Loader />}> */}
          <Loader>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/:projectSlug" element={<Project />} />
            </Routes>
          </Loader>
          {/* </Suspense> */}
        </NavigationProvider>
      </BrowserRouter>
    </ReactLenis>
  </StrictMode>,
);
