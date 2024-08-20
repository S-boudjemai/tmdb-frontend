import React from "react";
import Login from "../components/auth/login/Login.js";
import { NavLink } from "react-router-dom";

function SignIn() {
  return (
    <div className="w-full h-screen flex  justify-center items-center flex-col">
      <div>
        <Login />
        <p className="pt-5">
          Pas encore inscrit ?{" "}
          <NavLink to={"/sign-up"}>
            <span className="cursor-pointer text-lg  font-semibold  hover:underline">
              Cliquez-ici
            </span>{" "}
          </NavLink>
          pour créer un compte
        </p>
      </div>
    </div>
  );
}
export default SignIn;
