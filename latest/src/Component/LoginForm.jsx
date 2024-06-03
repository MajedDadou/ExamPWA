import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import '../Styles/Profile.css';


const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Optionally handle success, e.g., redirect or show a message
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  return (
    <div className='holder'>
    <form className='holder login' onSubmit={handleSubmit}>
      <input className='input-field' type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
      <input className='input-field' type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
      <button className='scan-button' type="submit">Log ind</button>
    </form>
    </div>
  );
};

export default LoginForm;
