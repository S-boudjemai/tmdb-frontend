import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import axios from "axios";
import MoviesCard from "../components/MoviesCard";
import SortMovies from "../components/SortMovies";
import { useAuth } from "../contexts/authContext";

function Category() {
  const [data, setData] = useState([]);
  const [startYear, setStartYear] = useState(1950);
  const [endYear, setEndYear] = useState(2024);
  const [query, setQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [genres, setGenres] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedAgeRating, setSelectedAgeRating] = useState(18);
  const [minDuration, setMinDuration] = useState(60); // Durée minimale par défaut (60 minutes)
  const [maxDuration, setMaxDuration] = useState(180); // Durée maximale par défaut (180 minutes)
  const { userId } = useAuth();
  const [dataBaseFavorite, setDataBaseFavorite] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      // fetch les favoris
      try {
        if (userId) {
          const response = await axios.get(
            `http://localhost:8081/users/favorites/${userId}`
          );
          const favoritesData = response.data.favorites;

          setDataBaseFavorite(JSON.parse(favoritesData));
        } else {
          throw new Error("this should never happen");
          // console.error("userId est indéfini");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des favoris :", error);
      }
    };
    fetchFavorites();
  }, [userId]);

  const years = [];
  for (let i = 1950; i <= 2024; i++) {
    years.push(i);
  }

  const ageMapping = {
    0: "U",
    10: "10",
    12: "12",
    16: "16",
    18: "18",
  };
  const handleLanguageChange = (languageCode) => {
    if (selectedLanguages.includes(languageCode)) {
      setSelectedLanguages([]); // Désélectionne tout si la même langue est cliquée
    } else {
      setSelectedLanguages([languageCode]); // Sélectionne la nouvelle langue et désélectionne les autres
    }
  };

  const handleGenreChange = (genreId) => {
    setSelectedGenre((prev) =>
      prev.includes(genreId)
        ? prev.filter((id) => id !== genreId)
        : [...prev, genreId]
    );
  };

  useEffect(() => {
    if (endYear < startYear) {
      setEndYear(startYear);
    }
  }, [startYear]);

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=ed82f4c18f2964e75117c2dc65e2161d&language=fr-FR"
      )
      .then((res) => {
        setGenres(res.data.genres);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/configuration/languages?api_key=ed82f4c18f2964e75117c2dc65e2161d"
      )
      .then((res) => {
        console.log(res.data);

        const commonLanguages = ["en", "fr", "es", "de", "it", "ja"];
        const filteredLanguages = res.data.filter((language) =>
          commonLanguages.includes(language.iso_639_1)
        );
        setLanguages(filteredLanguages);
      })
      .catch((error) => console.error("Error fetching languages:", error));
  }, []);

  const buildApiUrl = () => {
    let baseUrl =
      "https://api.themoviedb.org/3/discover/movie?api_key=ed82f4c18f2964e75117c2dc65e2161d&language=fr-FR";

    if (query) {
      baseUrl += `&query=${query}`;
    }
    if (startYear) {
      baseUrl += `&primary_release_date.gte=${startYear}-01-01`;
    }
    if (endYear) {
      baseUrl += `&primary_release_date.lte=${endYear}-12-31`;
    }
    if (selectedGenre.length > 0) {
      baseUrl += `&with_genres=${selectedGenre.join(",")}`;
    }
    if (selectedLanguages.length > 0) {
      baseUrl += `&with_original_language=${selectedLanguages.join(",")}`;
    }
    if (selectedAgeRating) {
      const mappedAgeRating = ageMapping[selectedAgeRating];
      if (mappedAgeRating) {
        baseUrl += `&certification_country=FR&certification=${selectedAgeRating}`;
      }
    }
    if (minDuration > 0) {
      baseUrl += `&with_runtime.gte=${minDuration}`;
    }
    if (maxDuration < 300) {
      baseUrl += `&with_runtime.lte=${maxDuration}`;
    }
    return baseUrl;
  };

  useEffect(() => {
    const fetchMovies = () => {
      const url = buildApiUrl();
      axios.get(url).then((res) => {
        setData(res.data.results);

        console.log(data);
        console.log(selectedGenre);
      });
    };
    fetchMovies();
  }, [
    startYear,
    endYear,
    query,
    selectedGenre,
    selectedLanguages,
    selectedAgeRating,
    minDuration,
    maxDuration,
  ]);

  return (
    <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-12 flex">
        {/* Filtres à gauche */}
        <div className="w-full lg:w-1/4 bg-gray-800 rounded-lg shadow-lg p-6 self-start">
          <h2 className="text-2xl font-bold text-white mb-6">Filtres</h2>
          <ul className="space-y-6">
            <li>
              <h3 className="font-semibold text-gray-400">Date de sortie :</h3>
              <div className="flex items-center space-x-3 mt-2">
                <p className="text-gray-300">Entre</p>
                <select
                  className="border border-gray-600 rounded-lg p-2 bg-gray-700 text-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500"
                  value={startYear}
                  onChange={(e) => setStartYear(parseInt(e.target.value))}
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <p className="text-gray-300">et</p>
                <select
                  className="border border-gray-600 rounded-lg p-2 bg-gray-700 text-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500"
                  value={endYear}
                  onChange={(e) => setEndYear(parseInt(e.target.value))}
                >
                  {years
                    .filter((year) => year >= startYear)
                    .map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                </select>
              </div>
            </li>
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
            <li>
              <h3 className="font-semibold text-gray-400">Langues</h3>
              <div className="flex flex-wrap gap-3 mt-2">
                {languages.map((language) => (
                  <label
                    key={language.iso_639_1}
                    className={`inline-flex items-center space-x-3 bg-gray-700 border border-gray-600 rounded-lg p-2 cursor-pointer transition duration-200 
      ${
        selectedLanguages.length > 0 &&
        !selectedLanguages.includes(language.iso_639_1)
          ? "opacity-50"
          : "hover:bg-gray-600"
      }
    `}
                  >
                    <input
                      type="checkbox"
                      value={language.iso_639_1}
                      onChange={() => handleLanguageChange(language.iso_639_1)}
                      className="form-checkbox h-5 w-5 text-indigo-500 rounded-lg focus:ring-indigo-500"
                      checked={selectedLanguages.includes(language.iso_639_1)}
                    />
                    <span className="text-gray-300">
                      {language.english_name}
                    </span>
                  </label>
                ))}
              </div>
            </li>
            <li>
              <h3 className="font-semibold text-gray-400">
                Classifications d'âge
              </h3>
              <div className="flex flex-col space-y-4 mt-2">
                <input
                  type="range"
                  id="ageRatingRange"
                  name="ageRatingRange"
                  min="0"
                  max="18"
                  step="1"
                  value={selectedAgeRating}
                  onChange={(e) =>
                    setSelectedAgeRating(parseInt(e.target.value))
                  }
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <label
                  htmlFor="ageRatingRange"
                  className="text-gray-300 text-center font-semibold"
                >
                  {selectedAgeRating}+
                </label>
              </div>
            </li>
            <li>
              <h3 className="font-semibold text-gray-400">Durée (minutes)</h3>
              <div className="space-y-4 mt-2">
                <div className="flex flex-col space-y-2">
                  <label htmlFor="minDuration" className="text-gray-300">
                    Min : {minDuration}
                  </label>
                  <input
                    type="range"
                    id="minDuration"
                    name="minDuration"
                    min="0"
                    max="300"
                    step="10"
                    value={minDuration}
                    onChange={(e) => setMinDuration(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="maxDuration" className="text-gray-300">
                    Max : {maxDuration}
                  </label>
                  <input
                    type="range"
                    id="maxDuration"
                    name="maxDuration"
                    min={minDuration}
                    max="300"
                    step="10"
                    value={maxDuration}
                    onChange={(e) => setMaxDuration(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </li>
          </ul>
        </div>

        {/* Cartes de films à droite */}
        <div className="flex-1 ml-8">
          {data.length === 0 ? (
            <div className="text-white text-center mt-12">
              <p>Votre recherche n'a pas abouti, modifiez vos filtres.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-12">
              {data.map((movie) => (
                <div
                  key={movie.id}
                  className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-transform"
                >
                  <MoviesCard
                    movie={movie}
                    dataBaseFavorite={dataBaseFavorite}
                    setDataBaseFavorite={setDataBaseFavorite}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Category;
