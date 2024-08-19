import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import { Genre } from "../../types";

function PerGenre({ setSelectedGenre }) {
  const [genres, setGenres] = useState<Genre[]>([]);

  const handleGenreChange = (genreId: number) => {
    setSelectedGenre((prev: any[]) =>
      prev.includes(genreId)
        ? prev.filter((id: any) => id !== genreId)
        : [...prev, genreId]
    );
  };

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=ed82f4c18f2964e75117c2dc65e2161d&language=fr-FR"
      )
      .then((res) => {
        setGenres(res.data.genres);
      });
  }, []);

  return (
    <li>
      <h3 className="font-semibold text-gray-400">Genres</h3>
      <div className="flex flex-wrap gap-3 mt-2">
        {genres.map((genre) => (
          <label
            key={genre.id}
            className="inline-flex items-center space-x-3 bg-gray-700 border border-gray-600 rounded-lg p-2 cursor-pointer hover:bg-gray-600 transition duration-200"
          >
            <input
              type="checkbox"
              value={genre.id}
              onChange={() => handleGenreChange(genre.id)}
              className="form-checkbox h-5 w-5 text-indigo-500 rounded-lg focus:ring-indigo-500"
            />
            <span className="text-gray-300">{genre.name}</span>
          </label>
        ))}
      </div>
    </li>
  );
}
export default PerGenre;
