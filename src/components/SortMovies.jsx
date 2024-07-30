import { FaArrowUp, FaArrowDown } from "react-icons/fa";

function SortMovies({ onSort }) {
  return (
    <div className="flex ">
      <span
        className="cursor-pointer  pr-5 flex flex-col items-center text-xl"
        onClick={() => onSort("top")}
      >
        <FaArrowUp className="w-6 h-6 text-green-400" />
        Les mieux notés
      </span>
      <span
        className="cursor-pointer flex flex-col items-center text-xl"
        onClick={() => onSort("bot")}
      >
        <FaArrowDown className="w-6 h-6 text-red-400" />
        Les moins bien notés
      </span>
    </div>
  );
}
export default SortMovies;
