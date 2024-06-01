// src/pages/Profile.jsx
import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import SignUpForm from '../Component/SignUpForm';
import LoginForm from '../Component/LoginForm';
import UserProfile from '../Component/UserProfile';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    auth.signOut().then(() => {
      setUser(null);
    }).catch((error) => {
      console.error('Error signing out:', error);
    });
  };

  return (
    <div>
      {user ? (
        <div>
          <button onClick={handleSignOut}>Sign Out</button>
          <UserProfile user={user} />
        </div>
      ) : (
        <div>
          <SignUpForm />
          <LoginForm />
        </div>
      )}
    </div>
  );
};

export default Profile;
