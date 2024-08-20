import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import axios from "axios";
import { useAuth } from "../contexts/authContext";
import ButtonHome from "../components/ButtonHome";
import PerYear from "../components/Filters/PerYear";
import PerAgeRating from "../components/Filters/PerAgeRating";
import PerDuration from "../components/Filters/PerDuration";
import { buildApiUrl } from "../utils/UrlFunction";
import PerGenre from "../components/Filters/PerGenre";
import PerLanguage from "../components/Filters/PerLanguage";
import MoviesCard from "../components/Cards/MoviesCard";
import { Movie } from "@types";

function Category() {
  const [data, setData] = useState<Movie[]>([]);
  const [startYear, setStartYear] = useState(1950);
  const [endYear, setEndYear] = useState(2024);
  const [query, setQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedAgeRating, setSelectedAgeRating] = useState<number>(18);
  const [minDuration, setMinDuration] = useState<number>(60); // Durée minimale par défaut (60 minutes)
  const [maxDuration, setMaxDuration] = useState<number>(180); // Durée maximale par défaut (180 minutes)
  const { userId } = useAuth();
  const [dataBaseFavorite, setDataBaseFavorite] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        if (userId) {
          const response = await axios.get(
            `http://localhost:8081/users/favorites/${userId}`
          );
          const favoritesData = response.data.favorites;

          setDataBaseFavorite(JSON.parse(favoritesData));
        } else {
          throw new Error("this should never happen");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des favoris :", error);
      }
    };
    fetchFavorites();
  }, [userId]);

  const ageMapping = {
    0: "U",
    10: "10",
    12: "12",
    16: "16",
    18: "18",
  };

  useEffect(() => {
    const fetchMovies = () => {
      const url = buildApiUrl({
        startYear,
        endYear,
        query,
        selectedGenre,
        selectedLanguages,
        selectedAgeRating,
        minDuration,
        maxDuration,
        ageMapping,
      });

      axios.get(url).then((res) => {
        setData(res.data.results);
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
        <div className="w-full lg:w-1/4 bg-gray-800 rounded-lg shadow-lg p-6 self-start">
          <h2 className="text-2xl font-bold text-white mb-6">Filtres</h2>
          <ul className="space-y-6">
            <PerYear
              startYear={startYear}
              setStartYear={setStartYear}
              endYear={endYear}
              setEndYear={setEndYear}
            />
            <PerGenre setSelectedGenre={setSelectedGenre} />
            <PerLanguage
              selectedLanguages={selectedLanguages}
              setSelectedLanguages={setSelectedLanguages}
            />
            <PerAgeRating
              selectedAgeRating={selectedAgeRating}
              setSelectedAgeRating={setSelectedAgeRating}
            />
            <PerDuration
              minDuration={minDuration}
              maxDuration={maxDuration}
              setMinDuration={setMinDuration}
              setMaxDuration={setMaxDuration}
            />
          </ul>
        </div>

        <div className="flex-1 ml-8">
          <div className="mt-10 text-white">
            <ButtonHome />
          </div>
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
