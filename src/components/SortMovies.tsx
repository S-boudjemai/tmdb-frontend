import { useEffect } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

function SortMovies({ movie, setSortedMovies, sortedMovies }) {
  useEffect(() => {
    if (movie && movie.length > 0) {
      setSortedMovies(movie);
    }
  }, [movie]);

  const onSort = (order) => {
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
    <div className="flex ">
      <span
        className="cursor-pointer  pr-5 flex flex-col items-center text-xl text-white"
        onClick={() => onSort("top")}
      >
        <FaArrowUp className="w-6 h-6 text-green-400" />
      </span>
      <span
        className="cursor-pointer  pr-5 flex flex-col items-center text-xl text-white"
        onClick={() => onSort("bot")}
      >
        <FaArrowDown className="w-6 h-6 text-red-400" />
      </span>
    </div>
  );
}
export default SortMovies;
