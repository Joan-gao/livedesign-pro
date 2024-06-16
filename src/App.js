import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';

import Index from './pages/Index'
import ChatPage from './pages/ChatPage';
import FrontPage from './pages/FrontPage';

// This array holds information about different videos
function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route index element={<Index />} />
          <Route path="FrontPage" element={<FrontPage />} />
          <Route path="ChatPage" element={<ChatPage />} />
          {/* <Route path="DesignPage" element={<DesignPage />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
