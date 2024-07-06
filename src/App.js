import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
// import { API_URL } from './config';

import Index from './pages/Index';
import GenerationPage from './pages/GenerationPage';
import ChatPage from './pages/ChatPage';
import FrontPage from './pages/FrontPage';
import DesignPage from './pages/DesignPage';

// This array holds information about different videos
function App() {
  // const [data, setData] = useState(null);

  // useEffect(() => {
  //   fetch(`${API_URL}/api/your-endpoint`)
  //     .then((response) => response.json())
  //     .then((data) => setData(data.message))
  //     .catch((error) => console.error('Error fetching data:', error));
  // }, []);
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route index element={<Index />} />
          <Route path="FrontPage" element={<FrontPage />} />
          <Route path="GenerationPage" element={<GenerationPage />} />
          <Route path="ChatPage" element={<ChatPage />} />
          <Route path="DesignPage" element={<DesignPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
