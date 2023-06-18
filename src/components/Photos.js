import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, firestore, storage } from "../firebase";
import firebase from "firebase/compat/app";

function Photos() {
  const [user, setUser] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [uploadMessage, setUploadMessage] = useState(null);
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
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate("/");
    });
  };

  const handleUploadPhoto = (event) => {
    event.preventDefault();
    const file = event.target.elements.photoInput.files[0];
    const caption = event.target.elements.caption.value;

    if (!file || !caption) {
      return;
    }

    const uploadTask = storage.ref(`photos/${file.name}`).put(file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Progress tracking if needed
      },
      (error) => {
        console.log("Error uploading photo:", error);
        setUploadMessage("Error uploading photo. Please try again.");
      },
      () => {
        storage
          .ref("photos")
          .child(file.name)
          .getDownloadURL()
          .then((url) => {
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();

            firestore
              .collection("photos")
              .add({
                url,
                caption,
                timestamp,
                userId: user.uid,
              })
              .then(() => {
                console.log("Photo uploaded successfully.");
                setUploadMessage("Photo uploaded successfully.");
                fetchPhotos(); // Refresh photo gallery
              })
              .catch((error) => {
                console.log("Error adding photo to Firestore:", error);
                setUploadMessage(
                  "Error adding photo to Firestore. Please try again."
                );
              });
          })
          .catch((error) => {
            console.log("Error getting photo download URL:", error);
            setUploadMessage(
              "Error getting photo download URL. Please try again."
            );
          });
      }
    );
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

  const formatTimestamp = (timestamp) => {
    const date = timestamp.toDate();
    return date.toLocaleString();
  };

  return (
    <div
      className="flex flex-col min-h-screen h-auto justify-between
    bg-gradient-to-br from-red-200 to-blue-400  bg-opacity-75 bg-fixed bg-cover "
    >
      <header
        className="sticky top-0 z-10 flex items-center justify-between bg-gradient-to-br from-blue-500 to-red-500 
      bg-opacity-75 bg-fixed bg-cover p-4"
      >
        <h2 className="text-white text-lg md:text-2xl font-bold">
          YOGFLIX Photo Gallery
        </h2>
        <Link
          to="/home"
          className="px-3 md:px-5 py-2 md:py-3 text-sm md:text-lg font-semibold 
          bg-blue-500 text-white rounded-lg hover:bg-blue-600 "
        >
          HOME
        </Link>
      </header>

      <main className="container p-4 mx-auto mt-8">
        {photos.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-xl text-gray-500">
              No Posts Available. Please Add new images to see the Posts.
            </p>
          </div>
        ) : (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
          gap-4 text-center px-4 "
          >
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="p-4 shadow-md mx-auto rounded-xl hover:shadow-2xl w-full
                bg-gradient-to-br from-red-400 to-green-200 bg-opacity-75 
                bg-fixed bg-cover hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="mx-auto h-48 object-cover mb-2 fill"
                />
                <h3 className="text-lg font-semibold">{photo.caption}</h3>
                <p className="text-gray-700 text-sm">
                  {formatTimestamp(photo.timestamp)}
                </p>
                <div className="flex justify-end mt-2">
                  <button
                    onClick={() => handleDeletePhoto(photo.id)}
                    className="px-4 py-2 border rounded-xl mx-auto text-sm font-semibold 
                    text-red-500 hover:bg-red-600 hover:text-white hover:border-none"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <form
        className=" flex justify-center mt-8 mb-5 p-10 pb-14 rounded-2xl shadow-lg 
        mx-auto hover:shadow-2xl hover:bg-blue-500 hover:text-white 
        transition duration-200"
        onSubmit={handleUploadPhoto}
      >
        <div className="flex flex-col items-left">
          <label
            htmlFor="photoInput"
            className="mt-4 mr-2 text-left inline-flex text-lg font-semibold mb-2 cursor-pointer"
          >
            Add Photo:
          </label>
          <input
            type="file"
            id="photoInput"
            name="photoInput"
            accept="image/*"
            className="flex flex-col px-4 py-2 text-sm font-semibold text-green-500 
            hover:text-green-600 border border-l-0 rounded-r-lg bg-gray-100 cursor-pointer"
          />
          <h3 className="text-lg font-semibold mb-2">Enter Caption:</h3>
          <input
            type="text"
            name="caption"
            placeholder="Caption"
            required
            className="px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none"
          />

          <button
            type="submit"
            className="px-4 py-2 mt-2 text-sm font-semibold text-green-500 
            hover:text-white hover:bg-green-500 border border-l-0 rounded-r-lg 
            bg-gray-100 hover:border-green-500"
          >
            Upload
          </button>
          {uploadMessage && (
            <p className="text-sm text-red-500 mt-2">{uploadMessage}</p>
          )}
        </div>
      </form>

      <footer className="sticky bottom-0 z-10 mt-4 mb-0 bg-gray-700 py-4 w-full inline-flex pb-auto justify-between">
        <button
          onClick={handleLogout}
          className="px-3 md:px-6 py-1 md:py-3 text-md md:text-lg font-semibold bg-red-500 
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

export default Photos;
