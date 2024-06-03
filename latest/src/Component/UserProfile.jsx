import React, { useState, useEffect } from 'react';
import { ref, get, update } from 'firebase/database';
import { db } from '../firebase';
import '../Styles/Profile.css';
import editIcon from '../icons/edit.png';

import walletIcon from '../icons/Wallet.png';

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
        <form className='holder' onSubmit={handleUpdate}>
          <input className='input-field' type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
          <input className='input-field' type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input className='input-field' type="text" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} required />
          <input className='input-field' type="text" name="armbandSerialNumber" placeholder="Armband Serial Number" value={formData.armbandSerialNumber} onChange={handleChange} required />
          <button className='add-button edit' type="submit">Save</button>
          <button className='add-button edit' type="button" onClick={() => setEditing(false)}>Cancel</button>
        </form>
      ) : (
        <div>
          <h2>Velkommen {userData.name}</h2>
          <div className='section font'>
            <p>Email: {userData.email}</p>
            <p>Phone Number: {userData.phoneNumber}</p>
            <p>Armband Serial Number: {userData.armbandSerialNumber}</p>
            <button onClick={() => setEditing(true)} className="icon-button">
              <img src={editIcon} alt="Edit" className="icon-image" />
            </button>
            <div className="wallet-container">
              <img src={walletIcon} alt="Wallet Icon" className="wallet-icon" />
              <h1>{userData.wallet} DKK</h1>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default UserProfile;
