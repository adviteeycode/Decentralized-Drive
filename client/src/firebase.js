import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCBwkSx2Vidl4pc1-6lVObNiYkzJdJdAig',
  authDomain: 'decentralized-drive-b54f8.firebaseapp.com',
  projectId: 'decentralized-drive-b54f8',
  storageBucket: 'decentralized-drive-b54f8.firebasestorage.app',
  messagingSenderId: '508301378154',
  appId: '1:508301378154:web:b302b216f1d45953214013'
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
