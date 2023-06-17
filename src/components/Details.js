import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function Details() {
  const { showId } = useParams();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch details of the selected show
    axios
      .get(`https://api.tvmaze.com/shows/${showId}`)
      .then((response) => {
        setShow(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching show details:", error);
        setLoading(false);
      });
  }, [showId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!show) {
    return <p>Show details not found.</p>;
  }

  return (
    <div>
      <header
        className="flex items-center justify-between bg-gradient-to-br from-blue-500 to-red-500 
      bg-opacity-75 bg-fixed bg-cover p-4"
      >
        <h2 className="text-white text-2xl font-bold">Show Details</h2>
        <Link
          to="/home"
          className="px-6 py-3 text-lg font-semibold 
          bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          HOME
        </Link>
      </header>

      <div className="container mx-auto mt-8">
        <div className="max-w-lg mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center">{show.name}</h2>
          {show.image && show.image.original && (
            <img
              src={show.image.original}
              alt={show.name}
              className="mb-4 rounded h-96 w-auto m-auto p-3 
              hover:scale-105 transition-transform duration-300 hover:shadow-md"
            />
          )}
          <div className="flex justify-between py-3 px-2">
            <p className="text-gray-600 ">
              {show.genres && show.genres.join(", ")}
            </p>
            <p className=" inline-flex">{show.premiered}</p>
            <p className=" inline-flex">Rating: {show.rating.average}</p>
          </div>
          <p className="py-2 font-semibold">{show.summary}</p>
        </div>
      </div>
      <footer className="relative py-4 w-full flex flex-col justify-center">
        <Link
          to="/shows"
          className="mx-auto px-6 py-3 text-lg font-semibold 
          bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Back to Shows
        </Link>
        <div className=" bg-gray-200 text-center p-5 mt-4">
          <h1 className="inline-block font-semibold ">
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
        </div>
      </footer>
    </div>
  );
}

export default Details;
