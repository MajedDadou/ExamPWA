// Section.jsx
import React from 'react';
import '../Styles/Section.css';

const Section = ({ id, title, children, customStyles }) => {
  return (
    <div id={id} className="section" style={customStyles}>
      <h2>{title}</h2>
      {children}
    </div>
  );
};

export default Section;
