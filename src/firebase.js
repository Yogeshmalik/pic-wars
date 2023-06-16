// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import firebase from "firebase/compat/app";

import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBr1yDLO65DdLExcKjOm-aoCKydPkAoSj4",
  authDomain: "picture-wars.firebaseapp.com",
  projectId: "picture-wars",
  storageBucket: "picture-wars.appspot.com",
  messagingSenderId: "260018464078",
  appId: "1:260018464078:web:04a767ae13954494936a1f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default app;
export { app, auth };