import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, firestore, storage } from "../firebase";

function Photos() {
  const [user, setUser] = useState(null);
  const [photos, setPhotos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("User is logged in:", user);
        setUser(user);
        fetchPhotos();
      } else {
        setUser(null);
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate("/login");
    });
  };

  const fetchPhotos = () => {
    firestore
      .collection("photos")
      .orderBy("timestamp", "desc")
      .get()
      .then((snapshot) => {
        const fetchedPhotos = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPhotos(fetchedPhotos);
      })
      .catch((error) => {
        console.log("Error getting photos:", error);
      });
  };

  const handleDeletePhoto = (photoId) => {
    // Delete photo document from Firestore
    firestore
      .collection("photos")
      .doc(photoId)
      .delete()
      .then(() => {
        // Delete corresponding image file from Firebase Cloud Storage
        storage
          .ref()
          .child(`photos/${photoId}`)
          .delete()
          .then(() => {
            console.log("Photo deleted successfully.");
            fetchPhotos(); // Refresh photo gallery
          })
          .catch((error) => {
            console.log("Error deleting image file:", error);
          });
      })
      .catch((error) => {
        console.log("Error deleting photo:", error);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <header
        className="flex items-center justify-between bg-gradient-to-br from-blue-500 to-red-500 
      bg-opacity-75 bg-fixed bg-cover p-4 w-full"
      >
        <h2 className="text-white text-2xl font-bold">YOGFLIX Photo Gallery</h2>
        <Link
          to="/home"
          className="px-6 py-3 text-lg font-semibold 
          bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          HOME
        </Link>
      </header>

      <main className="container mx-auto mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <div key={photo.id} className="p-4 bg-white shadow-md">
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full h-48 object-cover mb-2"
              />
              <h3 className="text-lg font-semibold">{photo.caption}</h3>
              <p className="text-gray-500 text-sm">{photo.timestamp}</p>
              <div className="flex justify-end mt-2">
                <button
                  onClick={() => handleDeletePhoto(photo.id)}
                  className="px-4 py-2 text-sm font-semibold text-red-500 hover:text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="mt-auto bg-gray-200 py-4 w-full">
        <button
          onClick={handleLogout}
          className="px-6 py-3 text-lg mx-auto flex font-semibold bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </footer>
    </div>
  );
}

export default Photos;
