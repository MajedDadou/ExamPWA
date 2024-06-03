import React from 'react';
import '../Styles/Tab.css';

const Tab = ({ to, label }) => {
  const scrollToSection = (id) => {
    const section = document.querySelector(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className='TabContainer'>
      <a className="tab-link" onClick={() => scrollToSection(to)}>
        {label}
      </a>
    </div>
  );
};

export default Tab;
