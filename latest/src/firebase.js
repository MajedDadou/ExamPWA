import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCPGWo0VuJM2tsYkWVRxdL3ZNriLvuK1vU",
    authDomain: "zooapp-4a17f.firebaseapp.com",
    projectId: "zooapp-4a17f",
    storageBucket: "zooapp-4a17f.appspot.com",
    messagingSenderId: "964430689726",
    appId: "1:964430689726:web:e3cb1dc2e62e91170ab5ef",
    measurementId: "G-WYJCJG14V8"
  };
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  
  export { auth, db };