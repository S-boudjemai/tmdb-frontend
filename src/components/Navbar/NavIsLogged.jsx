import { CiUser } from "react-icons/ci";
import { NavLink, useNavigate } from "react-router-dom";
import { doSignOut } from "../../firebase/auth";
import { useAuth } from "../../contexts/authContext";
import { useState } from "react";

function NavIsLogged() {
  const { userLoggedIn } = useAuth();
  const [profilList, setProfilList] = useState(false);

  const navigate = useNavigate();

  return (
    <div className="relative">
      <div className="flex items-center">
        <CiUser
          onClick={() => setProfilList(!profilList)}
          className="cursor-pointer text-white mr-3"
          size={27}
        />

        {userLoggedIn && profilList ? (
          <div className="absolute top-full right-0 mt-2 w-48 bg-white text-black shadow-lg border border-gray-300 rounded-lg">
            <NavLink
              to="/user-profil"
              className="block p-2 hover:bg-gray-200 cursor-pointer rounded-lg"
            >
              Mon Profil
            </NavLink>
            <NavLink
              to="/account-params"
              className="block p-2 hover:bg-gray-200 cursor-pointer rounded-lg"
            >
              Paramètres du compte
            </NavLink>

            <p
              className="block p-2 hover:bg-gray-200 cursor-pointer rounded-lg"
              onClick={() => {
                doSignOut().then(() => {
                  navigate("/");
                });
              }}
            >
              Se déconnecter
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default NavIsLogged;
