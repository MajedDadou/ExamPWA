import { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { onSnapshot, query, where } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, doc } from 'firebase/firestore';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const [armbands, setArmbands] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        const userDocReference = doc(collection(db, 'users'), user.uid);
        onSnapshot(userDocReference, (snapshot) => {
          if (snapshot.exists()) {
            setUserInfo(snapshot.data());
          }
        });

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
        setUserInfo({});
        setArmbands([]);
      }
    });

    return () => unsubscribe();
  }, []);

  return { user, userInfo, armbands };
};
