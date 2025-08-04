import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import Project from './components/Project';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        {/* <Route path="/project" element={<ProjectWrapper />} /> */}
        <Route path="/:projectSlug" element={<Project />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
