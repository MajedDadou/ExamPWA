// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Information from './pages/Information.jsx';
import Armband from './pages/Armband.jsx';
import Map from './pages/Map.jsx';
import Profile from './pages/Profile.jsx';
import BottomNav from './Component/BottomNav.jsx';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Information />} />
          <Route path="/information" element={<Information />} />
          <Route path="/armband" element={<Armband />} />
          <Route path="/map" element={<Map />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <BottomNav /> {/* Include the BottomNav component */}
      </div>
    </Router>
  );
};

export default App;
