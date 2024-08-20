import { useState } from "react";
import FormChangePassword from "../components/auth/ResetPassword/FormChangePassword";
import UpdateUsername from "../components/auth/UpdateUserName/UpdateUsername";
import ImageUpload from "../components/ImageUpload";
import { NavLink } from "react-router-dom";

function AccountParams() {
  const [activeOption, setActiveOption] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black py-6">
      <div>
        {activeOption ? (
          <>
            {activeOption === "password" && (
              <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4 text-center">
                  Réinitialisation du mot de passe
                </h2>
                <FormChangePassword />
              </div>
            )}
            {activeOption === "username" && (
              <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4 text-center">
                  Modifier votre pseudo
                </h2>
                <UpdateUsername />
              </div>
            )}
            {activeOption === "image" && (
              <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4 text-center">
                  Modifier l'image de profil
                </h2>
                <ImageUpload />
              </div>
            )}
          </>
        ) : (
          <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Paramètres du compte
            </h2>
            <ul className="space-y-4">
              <li
                onClick={() => setActiveOption("password")}
                className="cursor-pointer text-lg font-medium text-gray-700 hover:text-blue-500 transition duration-300 text-center"
              >
                Réinitialiser le mot de passe
              </li>
              <li
                onClick={() => setActiveOption("username")}
                className="cursor-pointer text-lg font-medium text-gray-700 hover:text-blue-500 transition duration-300 text-center"
              >
                Modifier votre pseudo
              </li>
              <li
                onClick={() => setActiveOption("image")}
                className="cursor-pointer text-lg font-medium text-gray-700 hover:text-blue-500 transition duration-300 text-center"
              >
                Modifier l'image de profil
              </li>
            </ul>
            <NavLink to="/">
              <button className=" rounded p-2 m-6 bg-gray-500 hover:scale-105 transform duration-300 text-white ">
                Retour à la page principale
              </button>
            </NavLink>
          </div>
        )}
      </div>
      {activeOption && (
        <button
          className="cursor-pointer p-3 bg-white rounded text-center text-black w-[100px] mt-6"
          onClick={() => setActiveOption(null)}
        >
          Retour
        </button>
      )}
    </div>
  );
}
export default AccountParams;
