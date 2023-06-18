import React, { useState, useRef } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const LoginScreen = () => {
  const [error, setError] = useState(null);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingSignup, setLoadingSignup] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoadingSignup(true);

    try {
      const userCredential = await auth.createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      );

      console.log(userCredential);
      setLoadingSignup(false);
      setSuccessMessage("Signup successful...");

      setTimeout(() => {
        setSuccessMessage("");
        navigate("/home");
      }, 2000);
    } catch (error) {
      setLoadingSignup(false);
      setError("Signup Error: " + error.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoadingLogin(true);

    try {
      const userCredential = await auth.signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      );

      console.log(userCredential);
      setLoadingLogin(false);
      setSuccessMessage("Login successful. Redirecting to home...");

      setTimeout(() => {
        setSuccessMessage("");
        navigate("/home");
      }, 500);
    } catch (error) {
      setError("Login Error: " + error.message);
      setLoadingLogin(false);
    }
  };

  return (
    <div className="relative flex flex-col justify-between h-screen align-bottom">
      <header className="flex items-center justify-between bg-gray-300 p-4">
        <h2 className="mx-auto items-center text-2xl font-bold hover:text-red-500">
          YOGFLIX
        </h2>
      </header>
      <div className="flex flex-col items-center justify-center">
        <div className="bg-white p-10 rounded shadow-lg min-w-[25rem]">
          <h2 className="text-2xl font-bold mb-4">Login / Signup</h2>
          {error && <p className="text-red-500">{error}</p>}
          {successMessage && <p className="text-green-500">{successMessage}</p>}
          <form className="flex flex-col space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="border border-gray-300 p-2 rounded"
              ref={emailRef}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="border border-gray-300 p-2 rounded"
              ref={passwordRef}
              required
            />
            <button
              onClick={handleLogin}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              disabled={loadingLogin}
            >
              {loadingLogin ? "Logging in..." : "Login"}
            </button>
            <button
              onClick={handleSignup}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              disabled={loadingSignup}
            >
              {loadingSignup ? "Signing up..." : "Signup"}
            </button>
          </form>
        </div>
      </div>
      <footer className="items-center bg-gray-200 text-center p-5 mt-4">
        <h1 className="inline-block font-semibold">
          MADE BY
          <a
            className="inline-block pl-2 ease-out font-bold hover:scale-150 hover:text-[#fD5B61] transition duration-150"
            href="https://yogeshmalikportfolio.netlify.app/"
          >
            YSM
          </a>
        </h1>
      </footer>
    </div>
  );
};

export default LoginScreen;
