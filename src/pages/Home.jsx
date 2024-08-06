import InputSearch from "../components/InputSearch";
import MoviesCard from "../components/MoviesCard";
import Navbar from "../components/Navbar/Navbar";
import ActiveSlider from "../components/ActiveSlider";
import SortMovies from "../components/SortMovies";
import { useEffect, useState } from "react";

function Home({ isLogged, setIsLogged }) {
  const [sortedMovies, setSortedMovies] = useState([]);
  const [movie, setMovie] = useState([]);
  const [input, setInput] = useState("a");

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
            <MoviesCard movie={movie} key={movie.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
export default Home;
