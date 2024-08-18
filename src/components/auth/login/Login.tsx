import React, { useState } from "react";

import { doSignInWithEmailAndPassword } from "../../../firebase/auth";
import { useAuth } from "../../../contexts/authContext";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const { userLoggedIn, setUserLoggedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        const userCredential = await doSignInWithEmailAndPassword(
          email,
          password
        );
        const user = userCredential.user;
        console.log(`requête reu pour vérifier l'user : ${user.uid}`);

        // verifier si l'user existe dans la database
        const response = await axios.get(
          `http://localhost:8081/users/checkUser/${user.uid}`
        );
        if (response.data.exists) {
          setUserLoggedIn(true);
          navigate("/");
        } else {
          // si l'user n'existe pas dans la database
          setUserLoggedIn(false);
        }
      } catch (error) {
        console.error("Erreur de connexion", error);
      } finally {
        setIsSigningIn(false);
      }
    }
  };

  return (
    <div>
      {userLoggedIn && <Navigate to={"/"} replace={true} />}
      <div className="container mx-auto mt-10">
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
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}
export default Login;
