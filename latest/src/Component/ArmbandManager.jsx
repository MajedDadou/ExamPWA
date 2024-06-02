// src/Component/ArmbandManager.jsx
import React, { useState } from 'react';
import { addDoc, collection, deleteDoc, doc, updateDoc, runTransaction } from 'firebase/firestore';
import { db } from '../firebase';
import '../Styles/Armband.css';

const ArmbandManager = ({ user, armbands, userInfo }) => {
  const [newArmband, setNewArmband] = useState('');

  const handleAddArmband = async () => {
    if (newArmband) {
      try {
        await addDoc(collection(db, 'armbands'), {
          userId: user.uid,
          serial: newArmband,
          type: newArmband.startsWith('1') ? 'adult' : 'child',
          wallet: 100,
        });
        setNewArmband('');
      } catch (error) {
        console.error('Error adding document: ', error);
      }
    }
  };

  const handleDeleteArmband = async (id) => {
    try {
      await deleteDoc(doc(db, 'armbands', id));
    } catch (error) {
      console.error('Error removing document: ', error);
    }
  };

  const handleTransferMoney = async (id, amount) => {
    const armbandRef = doc(db, 'armbands', id);
    const userRef = doc(db, 'users', user.uid);

    try {
      await runTransaction(db, async (transaction) => {
        const armbandDoc = await transaction.get(armbandRef);
        const userDoc = await transaction.get(userRef);

        if (!armbandDoc.exists() || !userDoc.exists()) {
          throw 'Document does not exist!';
        }

        const newArmbandBalance = armbandDoc.data().wallet + amount;
        const newUserWallet = userDoc.data().wallet - amount;

        transaction.update(armbandRef, { wallet: newArmbandBalance });
        transaction.update(userRef, { wallet: newUserWallet });
      });
    } catch (error) {
      console.error('Transaction failed: ', error);
    }
  };

  return (
    <div>
      <h3>Armbands</h3>
      {armbands.length === 0 && <button onClick={handleAddArmband}>+ Add Armband</button>}
      <ul>
        {armbands.map((armband) => (
          <li key={armband.id}>
            {armband.serial} - {armband.type} - Wallet: {armband.wallet}
            <button onClick={() => handleTransferMoney(armband.id, 10)}>+10</button>
            <button onClick={() => handleTransferMoney(armband.id, -10)}>-10</button>
            <button onClick={() => handleDeleteArmband(armband.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        id="newArmband"
        name="newArmband"
        value={newArmband}
        onChange={(e) => setNewArmband(e.target.value)}
        placeholder="Enter Armband Serial"
      />
      <button onClick={handleAddArmband}>Add Armband</button>
    </div>
  );
};

export default ArmbandManager;
