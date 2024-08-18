import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import React from "react";

function MoviesCardSlider({ movie, className }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div className="p-3">
      <div
        className={`relative group w-72 h-96 rounded-xl overflow-hidden shadow-lg bg-gray-800 text-white cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl ${className}`}
        onClick={handleClick}
      >
        <img
          className="absolute inset-0 w-full h-full object-cover"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
        <div className="absolute bottom-0 p-4 z-10 w-full bg-gradient-to-t from-black to-transparent">
          <h1 className="text-xl lg:text-2xl font-semibold mb-2">
            {movie.title}
          </h1>
          <p className="text-lg flex items-center justify-center">
            {movie.vote_average.toFixed(1)}/10
            <FaStar className="ml-1 text-yellow-500" />
          </p>
        </div>
      </div>
    </div>
  );
}
export default MoviesCardSlider;
