import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import axios from "axios";
import MoviesCard from "../components/MoviesCard";

function Favorites() {
  const [listData, setListData] = useState([]);

  useEffect(() => {
    let moviesId = window.localStorage.movies
      ? window.localStorage.movies.split(",")
      : [];

    for (let i = 0; i < moviesId.length; i++) {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${moviesId[i]}?api_key=ed82f4c18f2964e75117c2dc65e2161d&language=fr-FR`
        )
        .then((res) => setListData((listData) => [...listData, res.data]));
    }
  }, []);
  return (
    <div>
      <Navbar />
      {listData.length > 0 ? (
        listData.map((movie) => <MoviesCard movie={movie} key={movie.id} />)
      ) : (
        <h2>Aucun favori pour le moment</h2>
      )}
    </div>
  );
}
export default Favorites;
