// MapPage.jsx
import React from 'react';
import ParkMap from '../Component/ParkMap';
import '../Styles/ParkMap.css';

const Map = () => {
  return (
    <div className='parkmap-page'>
      {/* <h1>Park Map</h1> */}
      <ParkMap />
    </div>
  );
};

export default Map;
