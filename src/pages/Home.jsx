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
            `http://localhost:8081/table_tmdb/favorites/${userId}`
          );
          const favoritesData = response.data.favorites;
          console.log("favoritesData :", JSON.parse(favoritesData));

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
    <div className="bg-slate-400">
      <Navbar isLogged={isLogged} setIsLogged={setIsLogged} />
      {/* <p>Hello {currentUser.email} tu es maintenant connecté </p> */}

      <ActiveSlider movies={movie} key={movie.id} />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-center text-5xl text-white">h1 à définir</h1>
        <SortMovies onSort={handleSort} />
        <InputSearch input={input} setInput={setInput} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10 ">
          {sortedMovies.map((movie) => (
            <MoviesCard
              movie={movie}
              key={movie.id}
              dataBaseFavorite={dataBaseFavorite}
            />
            // au fetch avoir l'info des films favoris ou non ?
          ))}
        </div>
      </div>
    </div>
  );
}
export default Home;
