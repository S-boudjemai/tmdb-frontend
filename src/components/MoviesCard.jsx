import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar, FaHeart, FaRegHeart } from "react-icons/fa";
import image from "../assets/image.jpg";
import axios from "axios";
import { useAuth } from "../contexts/authContext";

function MoviesCard({ movie, dataBaseFavorite, setDataBaseFavorite }) {
  const [favorites, setFavorites] = useState();
  const [isFavorite, setIsFavorite] = useState();
  const { userId } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (dataBaseFavorite) {
      setFavorites(dataBaseFavorite);
      setIsFavorite(dataBaseFavorite.includes(movie.id));
    }
  }, [dataBaseFavorite, movie.id]);

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  const handleFavoriteClick = async (e) => {
    e.stopPropagation();

    // Log des favoris actuels avant la mise à jour
    console.log("Favoris actuels:", favorites);
    console.log("Film actuel:", movie.id);
    let updatedFavorites;

    if (isFavorite) {
      updatedFavorites = favorites.filter((id) => id !== movie.id);
    } else {
      updatedFavorites = [...favorites, movie.id];
    }

    // Log des nouveaux favoris après la mise à jour
    console.log("Nouveaux favoris:", updatedFavorites);

    setIsFavorite(!isFavorite);
    setFavorites(updatedFavorites);

    try {
      if (userId) {
        const url = `http://localhost:8081/users/favorites/${userId}`;
        console.log("URL de la requête PUT :", url);

        await axios.put(url, {
          favorites: updatedFavorites,
        });

        const response = await axios.get(
          `http://localhost:8081/users/favorites/${userId}`
        );
        const favoritesData = response.data.favorites;
        console.log("favoritesData :", JSON.parse(favoritesData));

        setDataBaseFavorite(JSON.parse(favoritesData));
        setIsFavorite(updatedFavorites.includes(movie.id));

        console.log("Favoris mis à jour avec succès");
      } else {
        console.error("userId est indéfini");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour des favoris :", error);
    }
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
      {userId ? (
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
      ) : null}

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
