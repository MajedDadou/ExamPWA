// UserProfile.jsx
import React, { useState, useEffect } from 'react';
import { ref, get, update } from 'firebase/database';
import { db } from '../firebase';

const UserProfile = ({ user, onSignOut }) => {
  const [userData, setUserData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    armbandSerialNumber: '',
    wallet: 0
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userSnapshot = await get(ref(db, `users/${user.uid}`));
        if (userSnapshot.exists()) {
          const data = userSnapshot.val();
          setUserData(data);
          setFormData(data);
        } else {
          console.error('User data not found.');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [user]);

  const validateArmbandSerialNumber = (serialNumber) => {
    const regex = /^[12]\d{5}$/;
    return regex.test(serialNumber);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!validateArmbandSerialNumber(formData.armbandSerialNumber)) {
      console.error('Invalid armband serial number.');
      return;
    }

    try {
      await update(ref(db, `users/${user.uid}`), formData);
      setUserData(formData);
      setEditing(false);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {editing ? (
        <form onSubmit={handleUpdate}>
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input type="text" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} required />
          <input type="text" name="armbandSerialNumber" placeholder="Armband Serial Number" value={formData.armbandSerialNumber} onChange={handleChange} required />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setEditing(false)}>Cancel</button>
        </form>
      ) : (
        <div>
          <h2>Welcome, {userData.name}</h2>
          <p>Email: {userData.email}</p>
          <p>Phone Number: {userData.phoneNumber}</p>
          <p>Armband Serial Number: {userData.armbandSerialNumber}</p>
          <p>Wallet Balance: {userData.wallet} DKK</p>
          <button onClick={() => setEditing(true)}>Edit</button>
          <button onClick={onSignOut}>Sign Out</button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
