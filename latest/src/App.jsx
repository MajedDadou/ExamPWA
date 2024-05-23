// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Information from './pages/Information';
import Armband from './pages/Armband';
import Map from './pages/Map';
import Profile from './pages/Profile';
import BottomNav from './Component/BottomNav';

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
        <BottomNav />
      </div>
    </Router>
  );
};

export default App;
