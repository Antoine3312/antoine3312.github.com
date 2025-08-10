import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import Project from './components/Project';
import NavigationProvider from './components/NavigationProvider';

createRoot(document.getElementById('root')).render(
  <StrictMode>
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
