// ButtonLink.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/ButtonLink.css'; // Import the CSS file for styling

const ButtonLink = ({ customStyles, ButtonLink, ButtonText }) => {
  return (
    <div className="button-container" style={customStyles?.container}>
      <Link to={ButtonLink}>
        <button className="button" style={customStyles?.button}>
          {ButtonText}
        </button>
      </Link>
    </div>
  );
};

export default ButtonLink;
