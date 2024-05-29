import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import SignUpForm from '../Component/SignUpForm';
import LoginForm from '../Component/LoginForm';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        setUser(user);
        // Fetch user data from the database
        getUserData(user.uid);
      } else {
        // No user is signed in
        setUser(null);
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const getUserData = async (userId) => {
    try {
      const userSnapshot = await db.ref(`users/${userId}`).get();
      if (userSnapshot.exists()) {
        setUserData(userSnapshot.val());
      } else {
        console.error('User data not found.');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleSignUp = (user, userData) => {
    setUser(user);
    setUserData(userData);
  };

  const handleSignIn = (user, userData) => {
    setUser(user);
    setUserData(userData);
  };

  const handleSignOut = () => {
    auth.signOut().then(() => {
      // User signed out successfully
      setUser(null);
      setUserData(null);
    }).catch((error) => {
      // Handle sign-out errors
      console.error('Error signing out:', error);
    });
  };

  return (
    <div>
      {user ? (
        <div>
          <h2>Welcome, {userData?.name}</h2>
          <p>Email: {userData?.email}</p>
          <p>Phone Number: {userData?.phoneNumber}</p>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <div>
          <SignUpForm onSignUp={handleSignUp} />
          <LoginForm onSignIn={handleSignIn} />
        </div>
      )}
    </div>
  );
};

export default Profile;
