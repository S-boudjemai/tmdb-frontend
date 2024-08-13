import InputSearch from "../components/InputSearch";
import MoviesCard from "../components/MoviesCard";
import Navbar from "../components/Navbar/Navbar";
import ActiveSlider from "../components/ActiveSlider";
import SortMovies from "../components/SortMovies";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext";
import axios from "axios";

function Home({ isLogged, setIsLogged }) {
  const [sortedMovies, setSortedMovies] = useState([]);
  const [movie, setMovie] = useState([]);
  const [input, setInput] = useState("a");
  const { userId } = useAuth();
  const [dataBaseFavorite, setDataBaseFavorite] = useState([]);

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
    if (movie && movie.length > 0) {
      setSortedMovies(movie);
    }
  }, [movie]);

  // j'ai ajouté ça parce que la map de sortedmovies me renvoyait rien, si je navais pas cliqué sur une card du slider et revenu en arrière

  const handleSort = (order) => {
    const sorted = [...sortedMovies].sort((a, b) => {
      if (order === "top") {
        return b.vote_average - a.vote_average;
      } else {
        return a.vote_average - b.vote_average;
      }
    });
    setSortedMovies(sorted);
  };

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
      <Navbar isLogged={isLogged} setIsLogged={setIsLogged} />
      <ActiveSlider movies={movie} key={movie.id} />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-center text-5xl text-white mt-8 font-bold tracking-wide">
          Recherchez votre film
        </h1>
        <div className="flex flex-col sm:flex-row items-center justify-between mt-8 space-y-4 sm:space-y-0 w-[full]">
          <SortMovies onSort={handleSort} />
          <div className="w-[60%] absolute left-[400px]">
            <InputSearch input={input} setInput={setInput} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-12">
          {sortedMovies.map((movie) => (
            <div
              key={movie.id}
              className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105"
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
