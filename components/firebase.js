// components/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8N26PM84bARUaItShzy9D2S3UVXIOOh0",
  authDomain: "inventory-tracker-1d9fe.firebaseapp.com",
  projectId: "inventory-tracker-1d9fe",
  storageBucket: "inventory-tracker-1d9fe.appspot.com",
  messagingSenderId: "435948467533",
  appId: "1:435948467533:web:6ed6d49e6ce12bf206b304",
  measurementId: "G-XS5JDTSWG2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Initialize Firestore

// Export the db object
export { db };
