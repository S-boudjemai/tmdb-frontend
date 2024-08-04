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
        className=" h-10 rounded p-3 w-[20%]"
      />
    </div>
  );
}
export default InputSearch;
