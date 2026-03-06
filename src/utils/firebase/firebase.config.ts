import { initializeApp, type FirebaseOptions } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyBJHSI1g5c932WJxPLLpW1Xta1iDlf5Epk",
  authDomain: "stars-fe2bb.firebaseapp.com",
  projectId: "stars-fe2bb",
  storageBucket: "stars-fe2bb.firebasestorage.app",
  messagingSenderId: "543064449584",
  appId: "1:543064449584:web:f142b758af5022fedb83f5",
  measurementId: "G-7VZ7RDPLQ4",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
