import React, { useState, useEffect } from 'react';
import { ref, get, set, push, update, remove, child } from 'firebase/database';
import { db } from '../firebase';
import QrScanner from 'react-qr-scanner';
import '../Styles/Armband.css';
import walletIcon from '../icons/Wallet.png';
import userIcon from '../icons/user.png';
import deleteIcon from '../icons/Sletdeletebig.png';


const Armband = ({ user }) => {
  const [armbands, setArmbands] = useState([]);
  const [newArmband, setNewArmband] = useState({ name: '', serialNumber: '' });
  const [wallet, setWallet] = useState(0);
  const [scanning, setScanning] = useState(false);

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

  const handleScan = (data) => {
    if (data && typeof data === 'object' && data.text) {
      const scannedText = data.text;
      setNewArmband({ ...newArmband, serialNumber: scannedText });
      setScanning(false);
    } else {
      console.error('Invalid scanned data:', data);
    }
  };

  const handleError = (err) => {
    console.error(err);
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

  const handleBalanceChange = (id, delta) => {
    const armbandRef = ref(db, `users/${user.uid}/armbands/${id}`);
    const newArmbands = armbands.map(armband => {
      if (armband.id === id) {
        const newBalance = armband.balance + delta;
        if (newBalance >= 0 && wallet >= delta) {
          update(armbandRef, { balance: newBalance });
          setWallet(wallet - delta);
          return { ...armband, balance: newBalance };
        }
      }
      return armband;
    });
    setArmbands(newArmbands);
    set(ref(db, `users/${user.uid}/wallet`), wallet - delta);
  };

  const handleBalanceInputChange = (id, value) => {
    const armbandRef = ref(db, `users/${user.uid}/armbands/${id}`);
    const newBalance = parseInt(value, 10);
    if (!isNaN(newBalance) && newBalance >= 0 && wallet + armbands.find(a => a.id === id).balance >= newBalance) {
      const oldBalance = armbands.find(a => a.id === id).balance;
      update(armbandRef, { balance: newBalance });
      setWallet(wallet + oldBalance - newBalance);
      setArmbands(armbands.map(armband => armband.id === id ? { ...armband, balance: newBalance } : armband));
    }
  };

  return (
    <div className="armband-container">
      <h1>Armbånd</h1>
      <p>Her kan du scanne dit armbånd med kamera eller indtaste armbåndets serienummer manuelt <br />
        <br />Husk at logge ind først
      </p>
      <div className="holder">
        <input
          type="text"
          name="name"
          value={newArmband.name}
          onChange={handleInputChange}
          placeholder="Armbånd Navn"
          className="input-field"
        />
        <input
          type="text"
          name="serialNumber"
          value={newArmband.serialNumber}
          onChange={handleInputChange}
          placeholder="Serialnummer"
          className="input-field"
        />
        <button onClick={handleAddArmband} className="add-button">Tilføj Armbånd</button>
        <button onClick={() => setScanning(!scanning)} className="scan-button">
          {scanning ? 'Stop Scan' : 'Scan QR Code'}
        </button>
      </div>
      {scanning && (
        <QrScanner
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: '100%' }}
        />
      )}
      <div className="wallet-container">
        <img src={walletIcon} alt="Wallet Icon" className="wallet-icon" />
        <h2>{wallet} DKK</h2>
      </div>
      <ul>
        {armbands.map((armband) => (
          <li key={armband.id} className="armband-item">
            <img src={userIcon} alt="User Icon" className="user-icon" />
            <input
              type="text"
              value={armband.name}
              onChange={(e) => handleEditArmband(armband.id, e.target.value)}
              className="input-field"
            />
            <button onClick={() => handleBalanceChange(armband.id, -10)} className="balance-button">-</button>
            <input
              type="number"
              value={armband.balance}
              onChange={(e) => handleBalanceInputChange(armband.id, e.target.value)}
              className="balance-input"
            />
            <button onClick={() => handleBalanceChange(armband.id, 10)} className="balance-button">+</button>
            <button onClick={() => handleDeleteArmband(armband.id, armband.serialNumber)} className="delete-button">
              <img src={deleteIcon} alt="Delete Icon" className="delete-icon" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Armband;
