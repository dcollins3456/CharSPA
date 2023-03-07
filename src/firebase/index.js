
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: 'AIzaSyCaCRE8MRhG5H5ZmORQkmFKRZmfYAkwkZM',
  authDomain: 'charspa-d1b73.firebaseapp.com',
  databaseURL: 'https://charspa-d1b73-default-rtdb.firebaseio.com',
  projectId: 'charspa-d1b73',
  storageBucket: 'charspa-d1b73.appspot.com',
  messagingSenderId: '667282196762',
  appId: '1:667282196762:web:9350a2454e70aac8dd04a3'
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage();

export {
    db,
    storage,
}