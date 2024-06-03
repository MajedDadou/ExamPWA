// src/Component/BottomNav.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import infoIcon from '../icons/Infoikoninactive.png';
import infoIconActive from '../icons/Infoikonactive.png';
import armbandsIcon from '../icons/Nyarmbåndinactive.png';
import armbandsIconActive from '../icons/Nyarmbåndactive.png';
import mapIcon from '../icons/lokationinactive.png';
import mapIconActive from '../icons/lokationactive.png';
import profileIcon from '../icons/Profilikoninactive.png';
import profileIconActive from '../icons/Profilikonactive.png';
import '../Styles/BottomNav.css';

const BottomNav = () => {
  const location = useLocation();

  return (
    <div className="bottom-nav">
      <Link to="/information" className="nav-link">
        <img src={location.pathname === '/information' ? infoIconActive : infoIcon} alt="Info" />
      </Link>
      <Link to="/armbands" className="nav-link">
        <img src={location.pathname === '/armbands' ? armbandsIconActive : armbandsIcon} alt="Armbands" />
      </Link>
      <Link to="/map" className="nav-link">
        <img src={location.pathname === '/map' ? mapIconActive : mapIcon} alt="Map" />
      </Link>
      <Link to="/profile" className="nav-link">
        <img src={location.pathname === '/profile' ? profileIconActive : profileIcon} alt="Profile" />
      </Link>
    </div>
  );
};

export default BottomNav;
