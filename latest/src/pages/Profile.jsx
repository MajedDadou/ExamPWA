// src/pages/Profile.jsx
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import AuthForm from '../Component/AuthForm';
import ArmbandManager from '../Component/ArmbandManager';
import { auth, db } from '../firebase';
import { getDoc, onSnapshot, query, where} from 'firebase/firestore';
import { collection, doc } from 'firebase/firestore';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const [armbands, setArmbands] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const userDocRef = doc(collection(db, 'users'), user.uid);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          setUserInfo(userDocSnapshot.data());
        }

        const q = query(collection(db, 'armbands'), where('userId', '==', user.uid));
        const unsubscribeArmbands = onSnapshot(q, (querySnapshot) => {
          const armbandsData = [];
          querySnapshot.forEach((doc) => {
            armbandsData.push({ id: doc.id, ...doc.data() });
          });
          setArmbands(armbandsData);
        });

        return () => unsubscribeArmbands();
      } else {
        setUser(null);
        setUserInfo({});
        setArmbands([]);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <h2>Welcome, {userInfo.name}</h2>
          <p>Email: {user.email}</p>
          <p>Phone: {userInfo.phone}</p>
          <p>Wallet Balance: {userInfo.wallet}</p>
          <button onClick={() => signOut(auth)}>Logout</button>
          <ArmbandManager user={user} armbands={armbands} userInfo={userInfo} />
        </div>
      ) : (
        <AuthForm onAuth={() => setUser(auth.currentUser)} />
      )}
    </div>
  );
};

export default Profile;
