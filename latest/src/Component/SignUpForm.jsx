// SignUpForm.jsx
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { set, ref } from 'firebase/database';
import { auth, db } from '../firebase';

const SignUpForm = ({ onSignUp }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phoneNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const userData = {
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
      };
      await set(ref(db, `users/${userCredential.user.uid}`), userData);
      onSignUp(userCredential.user);
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
        <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Phone Number" />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
