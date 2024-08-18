import React from "react";
import { NavLink } from "react-router-dom";

function NavNotLogged() {
  return (
    <>
      <NavLink
        to="/sign-in"
        className="transition-all duration-300 text-white mr-3 "
      >
        Log In{" "}
      </NavLink>
    </>
  );
}
export default NavNotLogged;
