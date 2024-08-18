import { BrowserRouter, Routes, Route } from "react-router-dom";
import Category from "./pages/Category.js";
import Home from "./pages/Home.js";
import NotFound from "./pages/NotFound.js";
import MoviePresentation from "./pages/MoviePresentation.js";
import SignIn from "./pages/SignIn.js";
import AccountParams from "./pages/AccountParams.js";
import UserProfil from "./pages/UserProfil.js";
import Favorites from "./pages/Favorites.js";
import { AuthProvider } from "./contexts/authContext/index.js";
import Login from "./components/auth/login/Login.js";
import Register from "./components/auth/register/Register.js";
import ActorPresentation from "./pages/ActorPresentation.js";
import React from "react";

function App() {
  return (
    <AuthProvider>
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/account-params" element={<AccountParams />} />
            <Route path="/user-profil" element={<UserProfil />} />
            <Route path="/category" element={<Category />} />

            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-in-firebase" element={<Login />} />
            <Route path="/sign-up" element={<Register />} />
            <Route path="/movie/:id" element={<MoviePresentation />} />
            <Route path="/*" element={<NotFound />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/actor/:id" element={<ActorPresentation />} />
          </Routes>
        </BrowserRouter>
      </>
    </AuthProvider>
  );
}
export default App;
