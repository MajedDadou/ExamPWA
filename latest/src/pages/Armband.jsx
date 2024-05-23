// src/pages/ArmbandPage.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import ArmbandManager from '../Component/ArmbandManager';
import { useAuth } from '../hooks/useAuth';

const Armband = () => {
  const { user, armbands, userInfo } = useAuth(); // Use your custom hook

  if (!user) {
    return <Navigate to="/profile" />;
  }

  return (
    <div>
      <h2>Manage Armbands</h2>
      <ArmbandManager user={user} armbands={armbands} userInfo={userInfo} />
    </div>
  );
};

export default Armband;
