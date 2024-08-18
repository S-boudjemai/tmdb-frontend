import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ButtonHome from "../components/ButtonHome";
import ActorsCard from "../components/Cards/ActorsCard";
import { DateFunction } from "../Functions/DateFunction";
import { Movie } from "../types";

interface Actor {
  id: number;
  name: string;
  profile_path: string | null;
  character: string;
}

interface Credits {
  cast: Actor[];
}

const MoviePresentation = () => {
  const { id } = useParams<{ id: string }>(); // Récupérer l'id du film depuis l'URL
  const [dateToFormate, setDateToFormate] = useState<string | null>(null);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [credits, setCredits] = useState<Credits | null>(null);
  const API_KEY = "f2aacbaffec6c04e80ab5fdf983b982d";
  const navigate = useNavigate();
  const spinner = require("../assets/spinner.svg").default;

  const handleClick = (actor: Actor) => {
    navigate(`/actor/${actor.id}`);
  };

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=fr`
      );
      const data: Movie = await response.json();
      setMovie(data);
    };

    const fetchCredits = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=fr`
      );
      const data: Credits = await response.json();
      setCredits(data);
    };

    fetchMovie();
    fetchCredits();
  }, [id]);

  useEffect(() => {
    if (movie?.release_date) {
      setDateToFormate(movie.release_date);
    }
  }, [movie]);

  const date = DateFunction({ dateToFormate });

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
              <strong>Date de sortie :</strong> {date}
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
      <div className="relative container mx-auto p-4">
        <h2 className="text-3xl font-bold mb-4">Acteurs principaux</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {credits.cast.slice(0, 12).map((actor) => (
            <div
              key={actor.id}
              className="bg-gray-800 p-4 rounded-lg shadow-lg cursor-pointer"
              onClick={() => handleClick(actor)}
            >
              <ActorsCard actor={actor} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoviePresentation;
