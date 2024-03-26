import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getDatabase } from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxyc1MCxXrFyBUkTKsIzOJwZxN-rkqZ3w",
  authDomain: "health-e2c57.firebaseapp.com",
  databaseURL: "https://health-e2c57-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "health-e2c57",
  storageBucket: "health-e2c57.appspot.com",
  messagingSenderId: "1013384133485",
  appId: "1:1013384133485:web:d247aed664e7cef4e93864"
};

const app = initializeApp(firebaseConfig);


 const db = getDatabase(app);
 const auth = getAuth();
 const provider = new GoogleAuthProvider();

 export { db, auth, provider };