import { useEffect, useState } from "react";
import React from "react";

interface PerYearProps {
  startYear: number;
  setStartYear: (year: number) => void;
  endYear: number;
  setEndYear: (year: number) => void;
}

function PerYear({
  startYear,
  setStartYear,
  endYear,
  setEndYear,
}: PerYearProps) {
  const years: number[] = [];
  for (let i = 1950; i <= 2024; i++) {
    years.push(i);
  }

  useEffect(() => {
    if (endYear < startYear) {
      setEndYear(startYear);
    }
  }, [startYear]);

  return (
    <li>
      <h3 className="font-semibold text-gray-400">Date de sortie :</h3>
      <div className="flex items-center space-x-3 mt-2">
        <p className="text-gray-300">Entre</p>
        <select
          className="border border-gray-600 rounded-lg p-2 bg-gray-700 text-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 no-scrollbar overflow-auto"
          value={startYear}
          onChange={(e) => setStartYear(parseInt(e.target.value))}
        >
          {years.map((year) => (
            <option key={year} value={year} className="cursor-pointer">
              {year}
            </option>
          ))}
        </select>
        <p className="text-gray-300">et</p>
        <select
          className="border border-gray-600 rounded-lg p-2 bg-gray-700 text-gray-300 shadow-sm focus:ring-2 no-scrollbar focus:ring-indigo-500"
          value={endYear}
          onChange={(e) => setEndYear(parseInt(e.target.value))}
        >
          {years
            .filter((year) => year >= startYear)
            .map((year) => (
              <option key={year} value={year} className="cursor-pointer">
                {year}
              </option>
            ))}
        </select>
      </div>
    </li>
  );
}
export default PerYear;
