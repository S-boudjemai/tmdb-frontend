import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Movie } from "@types";

function InputSearchNav({ isClicked, setIsClicked }) {
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [movie, setMovie] = useState<Movie[]>([]);
  const [query, setQuery] = useState<string>("");
  const navigate = useNavigate();

  const handleClick = (movie: Movie) => {
    navigate(`/movie/${movie.id}`);
  };

  useEffect(() => {
    if (query.length >= 2) {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=f2aacbaffec6c04e80ab5fdf983b982d&query=${query}&language=fr-FR`
      )
        .then((res) => {
          if (!res.ok) throw new Error();
          return res.json();
        })
        .then((data) => {
          setMovie(data.results);
        });

      const topResults = movie
        .sort(
          (a: { popularity: number }, b: { popularity: number }) =>
            b.popularity - a.popularity
        )
        .slice(0, 5);

      setMovieList(topResults);
    } else {
      setMovieList([]);
    }
  }, [query]);
  return (
    <div>
      <input
        type="text"
        placeholder="Cherchez un film ...."
        className={`p-2 pl-10 rounded-full border border-gray-500 bg-gray-700 text-white transition-all duration-300 focus:outline-none ${
          isClicked ? `w-64 opacity-100` : `w-0 opacity-0`
        }`}
        onChange={(e) => setQuery(e.target.value)}
      />
      {movieList.length > 0 && (
        <ul className="absolute bg-gray-700 border border-gray-500 text-white mt-2 rounded-lg shadow-lg w-full max-h-60 overflow-y-auto scrollbar-hide">
          {movieList.map((movie) => (
            <li
              key={movie.id}
              className="p-2 hover:bg-gray-600 cursor-pointer"
              onClick={() => handleClick(movie)}
            >
              {movie.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default InputSearchNav;
