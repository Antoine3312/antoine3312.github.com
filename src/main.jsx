import ReactLenis from 'lenis/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import NavigationProvider from './components/NavigationProvider';
import Project from './components/Project';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ReactLenis root />
    <BrowserRouter>
      <NavigationProvider>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/:projectSlug" element={<Project />} />
        </Routes>
      </NavigationProvider>
    </BrowserRouter>
  </StrictMode>,
);
