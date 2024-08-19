import React from "react";
import loup from "../../assets/icon-loup.svg";
import { useState } from "react";
import NavIsLogged from "./NavIsLogged";
import NavNotLogged from "./NavNotLogged";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import InputSearchNav from "./InputSearchNav";

export default function Navbar({}) {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const { userLoggedIn } = useAuth();

  return (
    <div className="w-full bg-slate-800 shadow-lg">
      <nav className="flex justify-between w-full p-4">
        <ul className="flex items-center space-x-8 ml-4">
          <NavLink
            to="/category"
            className="text-white hover:text-gray-300 transition-colors duration-200"
          >
            Rechercher par filtre
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
          {userLoggedIn ? <NavIsLogged /> : <NavNotLogged />}

          <div className="relative">
            <InputSearchNav isClicked={isClicked} setIsClicked={setIsClicked} />

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
