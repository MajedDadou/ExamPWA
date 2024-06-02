// ParkMap.jsx
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../Styles/ParkMap.css';

const ParkMap = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    // Coordinates for Jyllands Park Zoo and other points
    const zooCoordinates = [56.096230383524095, 8.807160560485007];
    const barnCoordinates = [56.097166258522066, 8.80605692527381]; // Example coordinates for "Barn 1"
    const youCoordinates = [56.09604889431721, 8.807855908345914]; // Example coordinates for "You"

    
    if (mapRef.current === null) {
      mapRef.current = L.map('map').setView(zooCoordinates, 15);

      // Add tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapRef.current);

      // Add markers
      L.marker(zooCoordinates).addTo(mapRef.current)
        .bindPopup('Jyllands Park Zoo')
        .openPopup();

      L.marker(barnCoordinates).addTo(mapRef.current)
        .bindPopup('Barn 1');

      L.marker(youCoordinates).addTo(mapRef.current)
        .bindPopup('You');
    }

    // Clean up the map instance when the component unmounts
    return () => {
      if (mapRef.current !== null) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return <div id="map" className="park-map" />;
};

export default ParkMap;
