import React from 'react';
import '../Styles/Title.css'; 

const Title = ({ TitleText }) => {
  return (
    <h1 className="title">
      {TitleText}
    </h1>
  );
};

export default Title;
