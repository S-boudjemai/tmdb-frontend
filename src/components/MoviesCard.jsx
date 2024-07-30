import { useNavigate } from "react-router-dom";

function MoviesCard({ movie }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div
      className="bg-gray-800 text-white p-4 rounded-md min-h-[200px] max-h-[550px] min-w-[200px] max-w-[350px]  flex flex-col mt-20 transition-transform duration-300 ease-in-out hover:scale-110 cursor-pointer"
      onClick={handleClick}
    >
      <p className="m--2 text-lg">{movie.title}</p>
      <img
        className="w-full h-70 object-cover rounded"
        src={`http://image.tmdb.org/t/p/w500/` + `${movie.poster_path}`}
        alt="image poster film"
      />

      <span className="text-white">{movie.vote_average}/10</span>
    </div>
  );
}
export default MoviesCard;
