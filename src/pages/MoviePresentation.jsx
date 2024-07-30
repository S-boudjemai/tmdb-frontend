import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import spinner from "../assets/spinner.svg";

function MoviePresentation() {
  const { id } = useParams();
  // récupérer l'id du film depuis l'URL
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=f2aacbaffec6c04e80ab5fdf983b982d`
      );
      const data = await response.json();
      setMovie(data);
    };
    fetchMovie();
  }, [id]);

  if (!movie) return <img src={spinner} alt="icone de chargement" />;

  return <div>{movie.title}</div>;
}
export default MoviePresentation;
