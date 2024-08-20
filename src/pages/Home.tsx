import InputSearch from "../components/InputSearch";
import Navbar from "../components/Navbar/Navbar";
import SortMovies from "../components/SortMovies";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext";
import axios from "axios";
import MoviesCard from "../components/Cards/MoviesCard";
import ActiveSlider from "../components/Cards/ActiveSlider";
import { Movie } from "@types";
function Home({}) {
  const [sortedMovies, setSortedMovies] = useState<Movie[]>([]);
  const [movie, setMovie] = useState<Movie[]>([]);
  const [input, setInput] = useState<string>("a");
  const { userId } = useAuth();
  const [dataBaseFavorite, setDataBaseFavorite] = useState<Movie[]>([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=f2aacbaffec6c04e80ab5fdf983b982d&query=${input}&language=fr-FR`
    )
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        setMovie(data.results);
      });
  }, [input]);

  useEffect(() => {
    const fetchFavorites = async () => {
      // fetch les favoris
      try {
        if (userId) {
          const response = await axios.get(
            `http://localhost:8081/users/favorites/${userId}`
          );
          const favoritesData = response.data.favorites;

          setDataBaseFavorite(JSON.parse(favoritesData));
        } else {
          throw new Error("this should never happen");
          // console.error("userId est indéfini");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des favoris :", error);
      }
    };
    fetchFavorites();
  }, [userId, movie]);

  // Fetch les favoris, depuis la base de données + fonction vérifier dans moviesCard
  return (
    <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black min-h-screen flex flex-col">
      <Navbar />
      <ActiveSlider />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-center text-5xl text-white mt-8 font-bold tracking-wide">
          Recherchez votre film
        </h1>
        <div className="flex flex-col sm:flex-row items-center mt-8 w-full">
          <div className="flex justify-start sm:flex-1">
            <SortMovies
              setSortedMovies={setSortedMovies}
              movie={movie}
              sortedMovies={sortedMovies}
            />
          </div>
          <div className="flex justify-center sm:flex-1 mt-4 sm:mt-0">
            <div className="w-full sm:max-w-[1200px]">
              <InputSearch input={input} setInput={setInput} />
            </div>
          </div>
          <div className="flex-1"></div>{" "}
          {/* This ensures equal spacing on the right */}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-12">
          {sortedMovies.map((movie) => (
            <div
              key={movie.id}
              className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-transform "
            >
              <MoviesCard
                movie={movie}
                dataBaseFavorite={dataBaseFavorite}
                setDataBaseFavorite={setDataBaseFavorite}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Home;
