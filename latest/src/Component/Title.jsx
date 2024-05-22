// Title.js
import React from 'react';
import '../Styles/Title.css'; // Import the CSS file for styling

const Title = ({ TitleText }) => {
  return (
    <h1 className="title">
      {TitleText}
    </h1>
  );
};

export default Title;
