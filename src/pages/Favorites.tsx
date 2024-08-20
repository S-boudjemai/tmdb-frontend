import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import axios from "axios";
import { useAuth } from "../contexts/authContext";
import { NavLink, useNavigate } from "react-router-dom";
import MoviesCard from "../components/Cards/MoviesCard";
import { Movie } from "@types";

function Favorites() {
  const [listData, setListData] = useState<Movie[]>([]);
  const { userId } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const getFavorites = async () => {
      try {
        if (userId) {
          const response = await axios.get(
            `http://localhost:8081/users/favorites/${userId}`
          );
          const listFavorites = response.data.favorites;

          setListData(JSON.parse(listFavorites));
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("failed to fetch :", error);
      }
    };
    getFavorites();
  }, [userId]);

  return (
    <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black min-h-screen flex flex-col">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-center text-5xl text-white mt-8 font-bold tracking-wide">
          Vos Favoris
        </h1>
        <NavLink
          to="/"
          className="  mt-5 opacity-50 hover:opacity-100 hover:scale-105"
        >
          <span className="cursor-pointer p-3 bg-white rounded text-center z-10">
            Retour
          </span>
        </NavLink>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-12">
          {listData && listData.length > 0 ? (
            listData.map((movie) => (
              <div
                key={movie.id}
                className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105"
              >
                <MoviesCard
                  dataBaseFavorite={listData} // Passe la liste actuelle des favoris à MoviesCard
                  setDataBaseFavorite={setListData}
                  movie={movie}
                />
              </div>
            ))
          ) : (
            <p className="text-center text-white text-2xl mt-8">
              Aucun favori trouvé.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Favorites;
