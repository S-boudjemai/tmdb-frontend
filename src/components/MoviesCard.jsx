import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar, FaHeart, FaRegHeart } from "react-icons/fa";
import image from "../assets/image.jpg";
import axios from "axios";

function MoviesCard({ movie }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const movieId = movie.id;

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    const newFavoriteStatus = !isFavorite;
    setIsFavorite(!isFavorite);

    if (newFavoriteStatus) {
      addFavorite(movie.id);
    } else {
      removeFavorite(movie.id);
    }
  };

  const addFavorite = (movieId) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("userId is not found");
      return;
    }
    axios
      .post(`http://localhost:3000/favorites`, { movieId, userId })
      .then((response) => {
        console.log("movie id successfully posted");
        console.log(userId);
      })
      .catch((error) => {
        console.error("error posting movie id", error);
      });
  };

  const removeFavorite = (id) => {
    const userId = localStorage.getItem("userId");
    axios
      .delete(`http://localhost:3000/favorites`, { movieId, userId })
      .then((response) => {
        console.log("movie id successfully removed");
      })
      .catch((error) => {
        console.error("error removing movie id", error);
      });
  };

  return (
    <div
      className="relative max-w-sm max-h-[600px] rounded-lg overflow-hidden shadow-lg bg-gray-800 text-white transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer "
      onClick={handleClick}
    >
      <img
        className="w-full h-60 object-cover"
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : image
        }
        alt={movie.title}
      />

      <div
        className="absolute top-2 right-2 bg-gray-900 p-2 rounded-full hover:bg-gray-700 transition-colors duration-300 cursor-pointer"
        onClick={handleFavoriteClick}
      >
        {isFavorite ? (
          <FaHeart className="text-red-500" />
        ) : (
          <FaRegHeart className="text-white" />
        )}
      </div>

      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
        <p className="text-gray-400 mb-2">
          <span className="font-semibold">Release Date:</span>{" "}
          {movie.release_date}
        </p>
        <p className="text-gray-400 mb-2">
          <span className="font-semibold">Rating:</span>{" "}
          {movie.vote_average.toFixed(1)}
        </p>
        <p className="text-gray-300 max-h-24 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
          {movie.overview}
        </p>
      </div>
    </div>
  );
}

export default MoviesCard;
