import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";

function HomeScreen() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("User is logged in:", user);
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate("/");
    });
  };

  return (
    <div
      className="bg-gradient-to-br from-blue-500 to-red-500 
      bg-opacity-75 bg-fixed bg-cover  flex flex-col 
      items-center justify-between h-screen "
    >
      <header className="text-white bg-blue-600 p-4 mb-4 w-full">
        <h2 className="text-2xl font-bold text-center">Welcome to YOGFLIX</h2>
      </header>

      <main className="mt-10 flex items-center justify-center p-4">
        <div className=" bg-white p-10 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold mb-4 pb-4 text-center">
            Welcome, {user?.email.split("@")[0]}
          </h3>

          <div className="flex justify-center space-x-4">
            <Link
              to="/photos"
              className="px-6 py-3 text-lg font-semibold bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
            >
              Photos
            </Link>
            <Link
              to="/shows"
              className="px-6 py-3 text-lg font-semibold bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Shows
            </Link>
          </div>
        </div>
      </main>

      <footer className="mt-4 mb-0 bg-gray-700 py-4 w-full inline-flex pb-auto justify-between">
        <button
          onClick={handleLogout}
          className="px-6 py-3 text-lg font-semibold bg-red-500 
          text-white rounded-lg hover:bg-red-600 mx-auto"
        >
          Logout
        </button>
        <h1 className=" text-yellow-50 mx-auto font-semibold flex items-center ">
          MADE BY
          <a
            className=" pl-2 ease-out font-bold hover:scale-150 
            hover:text-[#fD5B61] transition duration-150 "
            href="https://yogeshmalikportfolio.netlify.app/"
          >
            YSM
          </a>
        </h1>
      </footer>
    </div>
  );
}

export default HomeScreen;
