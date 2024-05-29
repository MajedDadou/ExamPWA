// src/hooks/useAuth.js
import { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { onSnapshot, query, where } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, doc, getDoc } from 'firebase/firestore';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const [armbands, setArmbands] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const userDocRef = doc(db, 'users', user.uid);
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

  return { user, userInfo, armbands };
};
