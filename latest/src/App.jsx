import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import React from 'react';
import Home from './pages/Home';


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />

        </Routes>
      </div>
    </Router>
  );
}


export default App
