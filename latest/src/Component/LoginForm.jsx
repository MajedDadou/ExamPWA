// LoginForm.jsx
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ref, get } from 'firebase/database';
import { auth, db } from '../firebase';

const LoginForm = ({ onSignIn }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      const userSnapshot = await get(ref(db, `users/${userCredential.user.uid}`));
      const userData = userSnapshot.val();
      onSignIn(userCredential.user, userData);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
