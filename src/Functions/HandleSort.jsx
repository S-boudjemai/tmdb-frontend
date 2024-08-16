export function HandleSort({ sortedMovies, setSortedMovies }) {
  const sorted = [...sortedMovies].sort((a, b) => {
    if (order === "top") {
      return b.vote_average - a.vote_average;
    } else {
      return a.vote_average - b.vote_average;
    }
  });
  setSortedMovies(sorted);
}
