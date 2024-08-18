import React from "react";

function PerDuration({
  minDuration,
  maxDuration,
  setMinDuration,
  setMaxDuration,
}) {
  return (
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
  );
}
export default PerDuration;
