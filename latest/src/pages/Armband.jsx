// src/pages/Armband.jsx
import React, { useState, useEffect } from 'react';
import { ref, get, set, push, update, remove, child } from 'firebase/database';
import { db } from '../firebase';

const Armband = ({ user }) => {
  const [armbands, setArmbands] = useState([]);
  const [newArmband, setNewArmband] = useState({ name: '', serialNumber: '' });
  const [wallet, setWallet] = useState(0);

  useEffect(() => {
    if (user) {
      const userRef = ref(db, `users/${user.uid}`);
      const armbandsRef = child(userRef, 'armbands');
      const walletRef = child(userRef, 'wallet');

      get(armbandsRef).then((snapshot) => {
        if (snapshot.exists()) {
          setArmbands(Object.entries(snapshot.val()).map(([key, value]) => ({ id: key, ...value })));
        }
      });

      get(walletRef).then((snapshot) => {
        if (snapshot.exists()) {
          setWallet(snapshot.val());
        }
      });
    }
  }, [user]);

  const handleAddArmband = async () => {
    const { name, serialNumber } = newArmband;

    if (!name || !serialNumber) {
      alert('Please provide both name and serial number.');
      return;
    }

    // Check for duplicate in global list
    const globalArmbandsRef = ref(db, 'globalArmbands');
    const snapshot = await get(child(globalArmbandsRef, serialNumber));
    if (snapshot.exists()) {
      alert('This serial number is already taken.');
      return;
    }

    const armbandData = { name, serialNumber, balance: 0 };
    const userArmbandsRef = ref(db, `users/${user.uid}/armbands`);
    const newArmbandRef = push(userArmbandsRef);
    const armbandId = newArmbandRef.key;

    await set(newArmbandRef, armbandData);
    await set(child(globalArmbandsRef, serialNumber), { uid: user.uid, armbandId });

    setArmbands([...armbands, { id: armbandId, ...armbandData }]);
    setNewArmband({ name: '', serialNumber: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewArmband({ ...newArmband, [name]: value });
  };

  const handleEditArmband = (id, newName) => {
    const armbandRef = ref(db, `users/${user.uid}/armbands/${id}`);
    update(armbandRef, { name: newName }).then(() => {
      setArmbands(armbands.map(armband => armband.id === id ? { ...armband, name: newName } : armband));
    });
  };

  const handleDeleteArmband = async (id, serialNumber) => {
    const armbandRef = ref(db, `users/${user.uid}/armbands/${id}`);
    const globalArmbandRef = ref(db, `globalArmbands/${serialNumber}`);
    await remove(armbandRef);
    await remove(globalArmbandRef);
    setArmbands(armbands.filter(armband => armband.id !== id));
  };

  const handleBalanceChange = (id, amount) => {
    const armbandRef = ref(db, `users/${user.uid}/armbands/${id}`);
    const newArmbands = armbands.map(armband => {
      if (armband.id === id) {
        const newBalance = armband.balance + amount;
        if (newBalance >= 0 && wallet >= amount) {
          update(armbandRef, { balance: newBalance });
          setWallet(wallet - amount);
          return { ...armband, balance: newBalance };
        }
      }
      return armband;
    });
    setArmbands(newArmbands);
    set(ref(db, `users/${user.uid}/wallet`), wallet - amount);
  };

  return (
    <div>
      <h1>Armband Management</h1>
      <div>
        <input
          type="text"
          name="name"
          value={newArmband.name}
          onChange={handleInputChange}
          placeholder="Armband Name"
        />
        <input
          type="text"
          name="serialNumber"
          value={newArmband.serialNumber}
          onChange={handleInputChange}
          placeholder="Serial Number"
        />
        <button onClick={handleAddArmband}>Add Armband</button>
      </div>
      <h2>Your Wallet: {wallet} DKK</h2>
      <h2>Your Armbands</h2>
      <ul>
        {armbands.map((armband) => (
          <li key={armband.id}>
            <input
              type="text"
              value={armband.name}
              onChange={(e) => handleEditArmband(armband.id, e.target.value)}
            />
            - {armband.serialNumber} - Balance: {armband.balance} DKK
            <button onClick={() => handleBalanceChange(armband.id, 10)}>+10 DKK</button>
            <button onClick={() => handleBalanceChange(armband.id, -10)}>-10 DKK</button>
            <button onClick={() => handleDeleteArmband(armband.id, armband.serialNumber)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Armband;
