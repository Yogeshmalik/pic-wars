import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { auth, firestore } from "../firebase";

function HomeScreen() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch character data from Star Wars API
    axios
      .get("https://swapi.dev/api/people/")
      .then((response) => {
        const { results } = response.data;
        setCharacters(results.slice(0, 6));
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching character data:", error);
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
      <header className="flex items-center justify-between bg-blue-500 p-4">
        <h2 className="text-white text-2xl font-bold">Photo Gallery</h2>
        {user && (
          <div className="text-white">
            Welcome, {user?.displayName}
            <button className="ml-4 text-yellow-500" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </header>

      <div className="container mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4">Star Wars Characters</h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {characters.map((character) => (
              <Link
                to={`/details/${character.name}`}
                key={character.name}
                className="block bg-gray-200 p-4 rounded cursor-pointer"
              >
                <img
                  src={`https://starwars-visualguide.com/assets/img/characters/${character.name
                    .toLowerCase()
                    .replace(/ /g, "-")}.jpg`}
                  alt={character.name}
                  className="w-full mb-2 rounded"
                />
                <p className="text-lg font-medium">{character.name}</p>
                <p>{character.films.join(", ")}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomeScreen;
