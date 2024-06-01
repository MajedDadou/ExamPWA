// src/components/Section.jsx
import React from 'react';
import '../Styles/Section.css';

const Section = ({ id, title, children, customStyles, content }) => {
  return (
    <div id={id} className="section" style={customStyles}>
      <h2>{title}</h2>
      {content ? (
        <ul className="content-list">
          {content.map((item, index) => (
            <li key={index}>
              <span className="left">{item.left}</span>
              <span className="right">{item.right}</span>
            </li>
          ))}
        </ul>
      ) : (
        children
      )}
    </div>
  );
};

export default Section;
