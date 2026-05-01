import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD7Eog5F8yxNlJVlypFk934NMRIc744Fug",
  authDomain: "gangaresort.firebaseapp.com",
  projectId: "gangaresort",
  storageBucket: "gangaresort.firebasestorage.app",
  messagingSenderId: "201988415505",
  appId: "1:201988415505:web:7c2d6ab4f8273f934151b0",
  measurementId: "G-S246T0M9BH"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
