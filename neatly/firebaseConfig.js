// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import "firebase/auth";
// import { getAuth } from "firebase/auth";
// import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsGpeh8F0JXia0YdXOzN6GcQ96HKO2ltU",
  authDomain: "neatly-c2182.firebaseapp.com",
  databaseURL: "https://neatly-c2182-default-rtdb.firebaseio.com",
  projectId: "neatly-c2182",
  storageBucket: "neatly-c2182.firebasestorage.app",
  messagingSenderId: "985151291666",
  appId: "1:985151291666:web:8eafe307023306cb8f73cb",
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
