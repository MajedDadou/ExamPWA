// src/components/ArmbandManager.jsx
import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, deleteDoc, doc } from 'firebase/firestore';

const ArmbandManager = ({ user, armbands, userInfo }) => {
  const [armbandNumber, setArmbandNumber] = useState('');

  const handleAddArmband = async () => {
    if (!armbandNumber) return;
    const type = armbandNumber.startsWith('1') ? 'adult' : 'child';
    await addDoc(collection(db, 'armbands'), {
      userId: user.uid,
      number: armbandNumber,
      type,
      balance: 0,
    });
    setArmbandNumber('');
  };

  const handleDeleteArmband = async (id) => {
    await deleteDoc(doc(db, 'armbands', id));
  };

  const handleTransferMoney = async (id, amount) => {
    const armbandRef = doc(db, 'armbands', id);
    const userRef = doc(db, 'users', user.uid);

    await db.runTransaction(async (transaction) => {
      const armbandDoc = await transaction.get(armbandRef);
      const userDoc = await transaction.get(userRef);

      if (!armbandDoc.exists() || !userDoc.exists()) {
        throw "Document does not exist!";
      }

      const newArmbandBalance = armbandDoc.data().balance + amount;
      const newUserWallet = userDoc.data().wallet - amount;

      transaction.update(armbandRef, { balance: newArmbandBalance });
      transaction.update(userRef, { wallet: newUserWallet });
    });
  };

  return (
    <div>
      <h3>Armbands</h3>
      <ul>
        {armbands.map((armband) => (
          <li key={armband.id}>
            {armband.number} ({armband.type}) - Balance: {armband.balance}
            <button onClick={() => handleTransferMoney(armband.id, 10)}>+10</button>
            <button onClick={() => handleTransferMoney(armband.id, -10)}>-10</button>
            <button onClick={() => handleDeleteArmband(armband.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={armbandNumber}
        onChange={(e) => setArmbandNumber(e.target.value)}
        placeholder="Enter Armband Number"
      />
      <button onClick={handleAddArmband}>Add Armband</button>
    </div>
  );
};

export default ArmbandManager;
