import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import spinner from "../assets/spinner.svg";
import image from "../assets/image.jpg";
import ButtonHome from "../components/ButtonHome";

const MoviePresentation = () => {
  const { id } = useParams(); // Récupérer l'id du film depuis l'URL
  const [movie, setMovie] = useState(null);
  const [actor, setActor] = useState(null);
  const [credits, setCredits] = useState(null);
  const API_KEY = "f2aacbaffec6c04e80ab5fdf983b982d";
  const navigate = useNavigate();

  const handleClick = (actor) => {
    navigate(`/actor/${actor.id}`);
  };

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=fr`
      );
      const data = await response.json();
      setMovie(data);
    };

    const fetchCredits = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=fr`
      );
      const data = await response.json();
      setCredits(data);
      setActor(data.cast);
    };

    fetchMovie();
    fetchCredits();
  }, [id]);

  if (!movie || !credits)
    return (
      <img src={spinner} alt="icone de chargement" className="mx-auto mt-20" />
    );

  return (
    <div className="relative min-h-screen bg-gray-900 text-white">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      ></div>
      <div className="relative container mx-auto p-4 flex flex-col md:flex-row items-center">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full md:w-1/3 rounded-lg shadow-lg mb-4 md:mb-0"
        />
        <div className="md:ml-6 flex flex-col justify-between">
          <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
          <p className="text-lg mb-4">{movie.overview}</p>
          <div className="flex flex-col sm:flex-row justify-between">
            <p className="mb-2 sm:mb-0">
              <strong>Date de sortie :</strong> {movie.release_date}
            </p>
            <p className="mb-2 sm:mb-0">
              <strong>Note moyenne :</strong> {movie.vote_average} / 10
            </p>
            <p>
              <strong>Durée :</strong> {movie.runtime} minutes
            </p>
          </div>
          <div className="mt-6">
            <ButtonHome />
          </div>
        </div>
      </div>
      <div className=" relative container mx-auto p-4">
        <h2 className="text-3xl font-bold mb-4">Acteurs principaux</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {credits.cast.slice(0, 12).map((actor) => (
            <div
              key={actor.id}
              className="bg-gray-800 p-4 rounded-lg shadow-lg  cursor-pointer"
              onClick={() => handleClick(actor)}
            >
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                    : image
                }
                alt={actor.name}
                className="w-full h-auto mb-2 rounded-lg"
              />

              <h3 className="text-lg font-bold">{actor.name}</h3>
              <p className="text-sm text-gray-400">{actor.character}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoviePresentation;
