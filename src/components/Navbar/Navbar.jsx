import loup from "../../assets/icon-loup.svg";
import { useState } from "react";
import NavIsLogged from "./NavIsLogged";
import NavNotLogged from "./NavNotLogged";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";

export default function Navbar({ isLogged, setIsLogged }) {
  const [isClicked, setIsClicked] = useState(false);
  const [selectedLi, setSelectedLi] = useState([]);

  const { userLoggedIn } = useAuth();

  // entrer le user à la co dans le local storage, et islogged change en fonction du local storage, test les fav dans le db par user ça peut être bien

  function handleSelectedLi(index) {
    setSelectedLi(selectedLi === index ? null : index);
  }

  const list = [
    {
      id: 1,
      content: "Films",
      SubCategories: [
        "Les mieux notés",
        "Les tops du moment",
        "Par genre",
        "A la une",
      ],
    },
    {
      id: 2,
      content: "Séries télévisées",
      SubCategories: [
        "Les mieux notés",
        "Les tops du moment",
        "Par genre",
        "A la une",
      ],
    },
    {
      id: 3,
      content: "Acteurs",
      SubCategories: [
        "Les mieux notés",
        "Les tops du moment",
        "Par genre",
        "A la une",
      ],
    },
  ];
  return (
    <div className="w-full">
      <nav className="flex justify-between w-[100vw] p-4 bg-slate-700 ">
        <ul className="flex items-center justify-between w-[20%] ml-4">
          {list.map((item, index) => (
            <li
              key={item.id}
              className="cursor-pointer text-white"
              onClick={() => handleSelectedLi(index)}
            >
              {item.content}
              {selectedLi === index && item.SubCategories?.length > 0 && (
                // si selected li = index et que item.subcategories existe et s'il existe que sa longueur est supérieur à 0 alors tu affiche le dessous
                <ul className="absolute bg-white shadow-lg mt-5">
                  {item.SubCategories.map((subItem, subIndex) => (
                    <li key={subIndex} className="p-2 text-black">
                      {subItem}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
          {userLoggedIn ? (
            <NavLink to="/favorites" className="text-white">
              Mes favoris
            </NavLink>
          ) : null}
        </ul>

        <div className="w-[30%] text-center flex items-center justify-end mr-4 z-10">
          {userLoggedIn ? (
            <NavIsLogged isLogged={isLogged} setIsLogged={setIsLogged} />
          ) : (
            <NavNotLogged isClicked={isClicked} setIsClicked={setIsClicked} />
          )}

          <input
            type="text"
            placeholder="Cherchez un film ...."
            className={`p-1 rounded transition-all duration-300 ${
              isClicked ? `w-40 opacity-100` : `w-0 opacity-0`
            } overflow-hidden`}
          />

          <img
            onClick={() => setIsClicked(!isClicked)}
            src={loup}
            alt="loup image"
            className="w-6 cursor-pointer ml-2 "
          />
        </div>
      </nav>
    </div>
  );
}
