import { BrowserRouter, Routes, Route } from "react-router-dom";

import Contact from "./pages/Contact";
import Category from "./pages/Category";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import MoviePresentation from "./pages/MoviePresentation";
import { useEffect, useState } from "react";
import SignIn from "./pages/SignIn";
import AccountParams from "./pages/AccountParams";
import UserProfil from "./pages/UserProfil";
import Favorites from "./pages/Favorites";
import { AuthProvider } from "./contexts/authContext";
import Login from "./components/auth/login/Login.jsx";
import Register from "./components/auth/register/Register.jsx";

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
            <Route path="/contact" element={<Contact />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-in-firebase" element={<Login />} />
            <Route path="/sign-up" element={<Register />} />
            <Route path="/movie/:id" element={<MoviePresentation />} />
            <Route path="/*" element={<NotFound />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </BrowserRouter>
      </>
    </AuthProvider>
  );
}
export default App;
