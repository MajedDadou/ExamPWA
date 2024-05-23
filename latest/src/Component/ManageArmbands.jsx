// src/components/ManageArmbands.jsx
import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { collection, addDoc, onSnapshot, query, where } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const ManageArmbands = () => {
  const [user, setUser] = useState(null);
  const [armbands, setArmbands] = useState([]);
  const [newArmband, setNewArmband] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        const q = query(collection(db, 'armbands'), where('userId', '==', user.uid));
        onSnapshot(q, (querySnapshot) => {
          const armbandsData = [];
          querySnapshot.forEach((doc) => {
            armbandsData.push({ id: doc.id, ...doc.data() });
          });
          setArmbands(armbandsData);
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleAddArmband = async () => {
    if (newArmband) {
      await addDoc(collection(db, 'armbands'), {
        userId: user.uid,
        serial: newArmband,
        type: newArmband.startsWith('1') ? 'adult' : 'child',
        wallet: 0,
      });
      setNewArmband('');
    }
  };

  return (
    <div>
      <h2>Manage Armbands</h2>
      {armbands.length === 0 && <button onClick={() => handleAddArmband()}>+ Add Armband</button>}
      <ul>
        {armbands.map((armband) => (
          <li key={armband.id}>
            {armband.serial} - {armband.type} - Wallet: {armband.wallet}
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newArmband}
        onChange={(e) => setNewArmband(e.target.value)}
        placeholder="Enter Armband Serial"
      />
      <button onClick={handleAddArmband}>Add Armband</button>
    </div>
  );
};

export default ManageArmbands;
