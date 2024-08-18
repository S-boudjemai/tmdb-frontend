import { useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { useAuth } from "../../../contexts/authContext";
import React from "react";

function UpdateUsername({}) {
  const [newUsername, setNewUsername] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { setUsername } = useAuth();
  const handleUpdateUsername = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      updateProfile(user, {
        displayName: newUsername,
      })
        .then(() => {
          setSuccessMessage("Le pseudo a été mis à jour avec succès.");
          setUsername(newUsername);
        })
        .catch((error) => {
          setErrorMessage(
            `Erreur lors de la mise à jour du pseudo : ${error.message}`
          );
        });
    } else {
      setErrorMessage("Aucun utilisateur n'est connecté.");
    }
  };

  return (
    <div className="flex flex-col items-center ">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mt-6">
        <input
          type="text"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          placeholder="Nouveau pseudo"
          className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleUpdateUsername}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Mettre à jour
        </button>
        {successMessage && (
          <p className="mt-4 text-green-500">{successMessage}</p>
        )}
        {errorMessage && <p className="mt-4 text-red-500">{errorMessage}</p>}
      </div>
    </div>
  );
}

export default UpdateUsername;
