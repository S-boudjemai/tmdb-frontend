import { FaArrowUp, FaArrowDown } from "react-icons/fa";

function SortMovies({ onSort }) {
  return (
    <div className="flex ">
      <span
        className="cursor-pointer  pr-5 flex flex-col items-center text-xl text-white"
        onClick={() => onSort("top")}
      >
        <FaArrowUp className="w-6 h-6 text-green-400" />
      </span>
      <span
        className="cursor-pointer  pr-5 flex flex-col items-center text-xl text-white"
        onClick={() => onSort("bot")}
      >
        <FaArrowDown className="w-6 h-6 text-red-400" />
      </span>
    </div>
  );
}
export default SortMovies;
