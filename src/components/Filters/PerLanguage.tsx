import axios from "axios";
import { useEffect, useState } from "react";

interface Language {
  iso_639_1: string;
  english_name: string;
}

function PerLanguage({ selectedLanguages, setSelectedLanguages }) {
  const [languages, setLanguages] = useState<Language[]>([]);
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

  const handleLanguageChange = (languageCode: string) => {
    if (selectedLanguages.includes(languageCode)) {
      setSelectedLanguages([]); // Désélectionne tout si la même langue est cliquée
    } else {
      setSelectedLanguages([languageCode]); // Sélectionne la nouvelle langue et désélectionne les autres
    }
  };

  return (
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
            <span className="text-gray-300">{language.english_name}</span>
          </label>
        ))}
      </div>
    </li>
  );
}
export default PerLanguage;
