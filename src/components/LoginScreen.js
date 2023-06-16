import React, { useState, useRef } from "react";
import { auth } from "../firebase"; // Import the app and auth objects from firebase.js
import { useNavigate } from "react-router-dom";

const LoginScreen = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSignup = (e) => {
    e.preventDefault();
    setLoading(true);

    auth
      .createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )

      .then((authUser) => {
        console.log(authUser);
        setLoading(false);
      })

      .catch((error) => {
        setLoading(false);
        alert("Signup Error YSM: " + error.message);
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    auth
      .signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((authUser) => {
        console.log(authUser);
        setLoading(false);
        navigate("/home");
      })
      .catch((error) => alert("Login Error YSM: " + error.message));
  };

  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await firebase.auth().signInWithEmailAndPassword(email, password);
  //     // Redirect to the desired page after successful login
  //   } catch (error) {
  //     console.error('Login error:', error);
  //   }
  // };

  // const handleSignup = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await auth.createUserWithEmailAndPassword( email, password);
  //     // Redirect to the desired page after successful signup
  //   } catch (error) {
  //     console.error('Signup error:', error);
  //   }
  // };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Login / Signup</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="border border-gray-300 p-2 rounded"
            required
          />
          <input
            type="email"
            placeholder="Email"
            //   value={email}
            //   onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 p-2 rounded"
            ref={emailRef}
            required
          />
          <input
            type="password"
            placeholder="Password"
            //   value={password}
            //   onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 p-2 rounded"
            ref={passwordRef}
            required
          />
          <button
            onClick={handleLogin}
            className="bg-green-500 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <button
            onClick={handleSignup}
            className="bg-blue-500 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Signup"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
