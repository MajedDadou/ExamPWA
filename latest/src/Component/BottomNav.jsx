// BottomNav.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaInfoCircle, FaMapMarkedAlt, FaUserAlt, FaLifeRing } from 'react-icons/fa';
import '../Styles/BottomNav.css';

const BottomNav = () => {
  return (
    <div className="bottom-nav">
      <Link to="/information" className="nav-link">
        <FaInfoCircle />
      </Link>
      <Link to="/armband" className="nav-link">
        <FaLifeRing />
      </Link>
      <Link to="/map" className="nav-link">
        <FaMapMarkedAlt />
      </Link>
      <Link to="/profile" className="nav-link">
        <FaUserAlt />
      </Link>
    </div>
  );
};

export default BottomNav;
