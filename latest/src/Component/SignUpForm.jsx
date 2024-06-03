// SignUpForm.jsx
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { set, ref } from 'firebase/database';
import { auth, db } from '../firebase';
import '../Styles/Profile.css';


const SignUpForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phoneNumber: '',
    armbandSerialNumber: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateArmbandSerialNumber = (serialNumber) => {
    const regex = /^[12]\d{5}$/;
    return regex.test(serialNumber);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, name, phoneNumber, armbandSerialNumber } = formData;

    if (!validateArmbandSerialNumber(armbandSerialNumber)) {
      setError('Armband serial number must start with a 1 or 2 and be 6 digits long.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await set(ref(db, `users/${userCredential.user.uid}`), {
        name,
        email,
        phoneNumber,
        armbandSerialNumber,
        wallet: 100 // Set initial wallet balance to 100 DKK
      });
      // Optionally handle success, e.g., redirect or show a message
    } catch (error) {
      console.error('Error signing up:', error);
      setError('Error signing up. Please try again.');
    }
  };

  return (
    <div className='holder'>
    <form className='holder' onSubmit={handleSubmit}>
      <input className='input-field' type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
      <input className='input-field' type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
      <input className='input-field' type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
      <input className='input-field' type="text" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} required />
      <input className='input-field' type="text" name="armbandSerialNumber" placeholder="Armband Serial Number" value={formData.armbandSerialNumber} onChange={handleChange} required />
      {error && <p>{error}</p>}
      <button className='add-button' type="submit">Sign Up</button>
    </form>
    </div>
  );
};

export default SignUpForm;
