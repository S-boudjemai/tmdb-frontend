export function buildApiUrl({
  startYear,
  endYear,
  query,
  selectedGenre,
  selectedLanguages,
  selectedAgeRating,
  minDuration,
  maxDuration,
  ageMapping,
}) {
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
}
