// src/pages/Armband.jsx
import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import '../Styles/Armband.css';

const Armband = () => {
  const [user, setUser] = useState(null);
  const [armbands, setArmbands] = useState([]);
  const [newArmband, setNewArmband] = useState('');
  const [newName, setNewName] = useState('');

  useEffect(() => {
    const fetchUserAndArmbands = async () => {
      if (auth.currentUser) {
        const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
        if (userDoc.exists()) {
          setUser(userDoc.data());
          setArmbands([{ name: userDoc.data().name, serialNumber: userDoc.data().armbandSerialNumber, balance: userDoc.data().wallet }]);
        }
      }
    };
    fetchUserAndArmbands();
  }, []);

  const addArmband = () => {
    if (newArmband) {
      setArmbands([...armbands, { name: newName || 'Family Member', serialNumber: newArmband, balance: 0 }]);
      setNewArmband('');
      setNewName('');
    }
  };

  const updateBalance = (serialNumber, amount) => {
    const updatedArmbands = armbands.map(armband =>
      armband.serialNumber === serialNumber ? { ...armband, balance: armband.balance + amount } : armband
    );
    setArmbands(updatedArmbands);

    if (armbands[0].serialNumber === serialNumber) {
      updateDoc(doc(db, 'users', auth.currentUser.uid), {
        wallet: updatedArmbands[0].balance,
      });
    }
  };

  return (
    <div className="armband-page">
      <h1>Armband Management</h1>
      <div className="add-armband">
        <input
          type="text"
          value={newArmband}
          onChange={(e) => setNewArmband(e.target.value)}
          placeholder="Enter armband serial number"
        />
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Enter name/nickname (optional)"
        />
        <button onClick={addArmband}>Add Armband</button>
      </div>
      <div className="armband-list">
        {armbands.map(armband => (
          <div key={armband.serialNumber} className="armband-item">
            <span>{armband.name}</span>
            <span>Serial: {armband.serialNumber}</span>
            <span>Balance: {armband.balance} kr</span>
            <button onClick={() => updateBalance(armband.serialNumber, 1)}>+1</button>
            <button onClick={() => updateBalance(armband.serialNumber, -1)}>-1</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Armband;
