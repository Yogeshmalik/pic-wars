import React, { useState, useRef } from 'react';
import { useHistory } from "react-router-dom";
import firebase from '../firebase'; // Import your firebase.js file
import { app, auth } from "../firebase"; // Import the app and auth objects from firebase.js


const LoginScreen = () => {

    

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        // Redirect to the desired page after successful login
      } catch (error) {
        console.error('Login error:', error);
      }
    };
  
    const handleSignup = async (e) => {
      e.preventDefault();
      try {
        await auth.createUserWithEmailAndPassword( email, password);
        // Redirect to the desired page after successful signup
      } catch (error) {
        console.error('Signup error:', error);
      }
    };
  
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white p-8 rounded shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Login / Signup</h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="border border-gray-300 p-2 rounded"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 p-2 rounded"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 p-2 rounded"
            />
            <button
              onClick={handleLogin}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Login
            </button>
            <button
              onClick={handleSignup}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Signup
            </button>
          </form>
        </div>
      </div>
    );
  };
  
  export default LoginScreen;
  