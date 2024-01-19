// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "realvista-dec1d.firebaseapp.com",
  projectId: "realvista-dec1d",
  storageBucket: "realvista-dec1d.appspot.com",
  messagingSenderId: "752806362009",
  appId: "1:752806362009:web:07a7b8d7cf06fd01283108"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);