import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function MoviesCardSlider({ movie, className }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div
      className={`flex flex-col  gap-6 group relative shadow-lg text-white rounded-xl px-6 py-8 overflow-hidden cursor-pointer ${className}`}
      onClick={handleClick}
    >
      <div className="absolute inset-0 bg-cover bg-center">
        <div className="absolute inset-0 bg-black opacity-100 group-hover:opacity-50">
          <div className="relative flex flex-col items-center gap-3">
            <h1 className="text-xl lg:text-2xl text-center">{movie.title}</h1>
            <p className="lg:text-[18px] text-center">
              {movie.vote_average}/10
            </p>
            <img
              className="w-[50%] h-[50%]  rounded"
              src={`http://image.tmdb.org/t/p/w500/` + `${movie.poster_path}`}
              alt="image poster film"
            />

            <span className="flex">
              {movie.vote_average} <FaStar className="text-yellow-500" />
            </span>

            {/* <p className="text-center overflow-auto max-h-32 ">
              Synopsis : {movie.overview}
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
}
export default MoviesCardSlider;
