import React from "react";

function PerAgeRating({ selectedAgeRating, setSelectedAgeRating }) {
  return (
    <li>
      <h3 className="font-semibold text-gray-400">Classifications d'âge</h3>
      <div className="flex flex-col space-y-4 mt-2">
        <input
          type="range"
          id="ageRatingRange"
          name="ageRatingRange"
          min="0"
          max="18"
          step="1"
          value={selectedAgeRating}
          onChange={(e) => setSelectedAgeRating(parseInt(e.target.value))}
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
  );
}
export default PerAgeRating;
