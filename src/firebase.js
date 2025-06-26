// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzwgVZ2WaAmnA_yghRcHm9MPSrHeLrP1I",
  authDomain: "jewelery-store-38c3e.firebaseapp.com",
  projectId: "jewelery-store-38c3e",
  storageBucket: "jewelery-store-38c3e.firebasestorage.app",
  messagingSenderId: "295894687885",
  appId: "1:295894687885:web:ba1c817e564fcfb46242c4"
};
const app = initializeApp(firebaseConfig);
// Initialize Firebase

export const auth = getAuth(app);
export const db = getFirestore(app);
