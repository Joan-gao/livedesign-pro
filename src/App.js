import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';

import Index from './pages/Index'
import GenerationPage from './pages/GenerationPage';
import FrontPage from './pages/FrontPage';
import DesignPage from './pages/DesignPage';

// This array holds information about different videos
function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route index element={<Index />} />
          <Route path="FrontPage" element={<FrontPage />} />
          <Route path="GenerationPage" element={<GenerationPage />} />
          <Route path="DesignPage" element={<DesignPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
