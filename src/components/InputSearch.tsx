import React from "react";

function InputSearch({ input, setInput }) {
  function handleSearch(e) {
    if (input.length === 0) {
      setInput("fast");
    } else {
      setInput(e.target.value);
      console.log(input);
    }
  }

  return (
    <div className="w-full flex justify-center items-center h-20">
      <input
        onChange={handleSearch}
        type="text"
        placeholder="Rechercher un film, une série, un acteur..."
        className="w-full p-2 text-lg text-black rounded-lg sm:max-w-[1200px]"
      />
    </div>
  );
}
export default InputSearch;
