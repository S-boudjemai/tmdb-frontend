import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/authContext";
import { doCreateUserWithEmailAndPassword } from "../../../firebase/auth";
import axios from "axios";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { userLoggedIn } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate(); // Utilisez cette fonction pour la navigation.

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      setErrorMessage("Les mots de passe ne correspondent pas.");
      return;
    }
    if (!isRegistering) {
      setIsRegistering(true);
      try {
        const userCredential = await doCreateUserWithEmailAndPassword(
          email,
          password
        );
        const user = userCredential.user;
        console.log("user registered", user);

        // j'envoie l'id a mon serveur back
        const response = await axios.post(
          "http://localhost:8081/users/addUser",
          {
            id_firebase: user.uid,
          }
        );

        setIsRegistering(false); // Reset après réussite ou échec
        setEmail("");
        setPassword("");
        setPasswordConfirmation("");
        navigate("/"); // Redirection après inscription
      } catch (error) {
        setIsRegistering(false);
        setErrorMessage(error.message);
      }
    }
  };

  if (userLoggedIn) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <div className="container mx-auto mt-10 h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto">
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Mot de passe
          </label>
          <input
            disabled={isRegistering}
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="passwordConfirmation"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Confirmation du mot de passe
          </label>
          <input
            disabled={isRegistering}
            type="password"
            id="passwordConfirmation"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {errorMessage && (
          <p className="text-red-500 text-xs italic mb-4">{errorMessage}</p>
        )}
        <button
          disabled={isRegistering}
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          S'inscrire
        </button>
      </form>
    </div>
  );
}

export default Register;
