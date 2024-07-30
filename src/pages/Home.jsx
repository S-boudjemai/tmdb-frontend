import InputSearch from "../components/InputSearch";
import MoviesCard from "../components/MoviesCard";
import Navbar from "../components/Navbar";
import ActiveSlider from "../components/ActiveSlider";
import SortMovies from "../components/SortMovies";
import { useEffect, useState } from "react";

function Home({ movie, isLogged, setIsLogged }) {
  const [sortedMovies, setSortedMovies] = useState([]);

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

  return (
    <div className="bg-slate-400">
      <Navbar isLogged={isLogged} setIsLogged={setIsLogged} />
      <InputSearch />

      <ActiveSlider movies={movie} key={movie.id} />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-center text-5xl text-white"> Les mieux notés</h1>
        <SortMovies onSort={handleSort} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
          {sortedMovies.map((movie) => (
            <MoviesCard movie={movie} key={movie.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
export default Home;
