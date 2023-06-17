import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { auth, firestore } from "../firebase";

function Shows() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch TV show data from TV Show API
    axios
      .get("https://api.tvmaze.com/search/shows?q=all")
      .then((response) => {
        const shows = response.data;
        setCharacters(shows.slice(0, 8));
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching TV show data:", error);
      });

    // Check if user is logged in
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("User is logged in:", user);
        // Fetch user data from Firestore
        firestore
          .collection("users")
          .doc(user.uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              setUser({ ...user, displayName: doc.data().displayName });
            }
          });
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
    <div>
      <header className="flex items-center justify-between bg-gradient-to-br from-blue-500 to-red-500 
      bg-opacity-75 bg-fixed bg-cover p-4">
        <h2 className="text-white text-2xl font-bold">Shows Gallery</h2>
        {user && <div className="text-white">Welcome, {user.displayName} </div>}

        <Link
          to="/home"
          className="px-6 py-3 text-lg font-semibold 
          bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          HOME
        </Link>
      </header>

      <div className="container mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4">TV Shows</h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div
            className="grid grid-cols-2 sm:grid-col-1 md:grid-cols-3 
          lg:grid-cols-4 gap-4 p-2"
          >
            {characters.map((character) => (
              <Link
                to={`/details/${character.show.id}`}
                key={character.show.id}
                className="block bg-gray-200 p-4 rounded cursor-pointer 
             hover:scale-105 transition-transform duration-300 hover:bg-blue-300"
              >
                {character.show.image && character.show.image.medium && (
                  <img
                    src={character.show.image.medium}
                    alt={character.show.name}
                    className="w-auto mb-2 rounded h-80 mx-auto"
                  />
                )}
                <p className="text-lg font-medium">{character.show.name}</p>
                <p>{character.show.genres.join(", ")}</p>
                <p>Rating: {character.show.rating.average}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
      <footer className="mt-4 bg-gray-700 py-4 w-full flex flex-col justify-center">
        <button
          onClick={handleLogout}
          className="px-6 py-3 text-lg font-semibold bg-red-500 
          text-white rounded-lg hover:bg-red-600 mx-auto"
        >
          Logout
        </button>
        <h1 className=" text-yellow-50 mx-auto font-semibold pt-5 ">
          MADE BY
          <a
            className="inline-block pl-2 ease-out font-bold hover:scale-150 
            hover:text-[#fD5B61] transition duration-150 "
            href="https://yogeshmalikportfolio.netlify.app/"
          >
            {" "}
            YSM
          </a>
        </h1>
      </footer>
    </div>
  );
}

export default Shows;
