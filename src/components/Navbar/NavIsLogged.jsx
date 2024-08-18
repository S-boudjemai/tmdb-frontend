import { NavLink, useNavigate } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { doSignOut } from "../../firebase/auth";
import { useAuth } from "../../contexts/authContext";
import { useState } from "react";
import GetImageProfil from "../GetImageProfil";

function NavIsLogged() {
  const { userLoggedIn, username, imageURL } = useAuth();
  const [profilList, setProfilList] = useState(false);

  const navigate = useNavigate();

  return (
    <div className="relative">
      <div className="flex items-center ">
        <div
          onClick={() => setProfilList(!profilList)}
          className="flex justify-center flex-row-reverse"
        >
          {username && imageURL ? (
            <>
              <GetImageProfil className="w-[50px] h-[50px]  rounded-full cursor-pointer" />
              <p className="text-xl text-white mr-4 text-center mt-2 cursor-pointer">
                {username}
              </p>
            </>
          ) : (
            <CiUser className="text-white cursor-pointer" size={27} />
          )}
        </div>

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
