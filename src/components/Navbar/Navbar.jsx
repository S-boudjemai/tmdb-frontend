import loup from "../../assets/icon-loup.svg";
import { useState } from "react";
import NavIsLogged from "./NavIsLogged";
import NavNotLogged from "./NavNotLogged";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";

export default function Navbar({ isLogged, setIsLogged }) {
  const [isClicked, setIsClicked] = useState(false);

  const { userLoggedIn } = useAuth();

  // entrer le user à la co dans le local storage, et islogged change en fonction du local storage, test les fav dans le db par user ça peut être bien

  return (
    <div className="w-full bg-slate-800 shadow-lg">
      <nav className="flex justify-between w-full p-4">
        <ul className="flex items-center space-x-8 ml-4">
          <NavLink
            to="/category"
            className="text-white hover:text-gray-300 transition-colors duration-200"
          >
            Filtrer la recherche
          </NavLink>
          {userLoggedIn ? (
            <NavLink
              to="/favorites"
              className="text-white hover:text-gray-300 transition-colors duration-200"
            >
              Mes favoris
            </NavLink>
          ) : null}
        </ul>

        <div className="w-[30%] flex items-center justify-end space-x-4 mr-4 z-10">
          {userLoggedIn ? (
            <NavIsLogged isLogged={isLogged} setIsLogged={setIsLogged} />
          ) : (
            <NavNotLogged isClicked={isClicked} setIsClicked={setIsClicked} />
          )}

          <div className="relative">
            <input
              type="text"
              placeholder="Cherchez un film ...."
              className={`p-2 pl-10 rounded-full border border-gray-500 bg-gray-700 text-white transition-all duration-300 focus:outline-none ${
                isClicked ? `w-64 opacity-100` : `w-0 opacity-0`
              }`}
            />
            <img
              onClick={() => setIsClicked(!isClicked)}
              src={loup}
              alt="loup image"
              className="w-6 cursor-pointer absolute top-2 left-2"
            />
          </div>
        </div>
      </nav>
    </div>
  );
}
