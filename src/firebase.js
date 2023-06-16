import "firebase/compat/auth";
import "firebase/compat/firestore";
import firebase from "firebase/compat/app";

const firebaseConfig = {
  apiKey: "AIzaSyBr1yDLO65DdLExcKjOm-aoCKydPkAoSj4",
  authDomain: "picture-wars.firebaseapp.com",
  projectId: "picture-wars",
  storageBucket: "picture-wars.appspot.com",
  messagingSenderId: "260018464078",
  appId: "1:260018464078:web:04a767ae13954494936a1f",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const firestore = app.firestore();
const auth = firebase.auth();

export default app;
export { app, auth, firestore };
