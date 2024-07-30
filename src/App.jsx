import { BrowserRouter, Routes, Route } from "react-router-dom";

import Contact from "./pages/Contact";
import Category from "./pages/Category";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import MoviePresentation from "./pages/MoviePresentation";
import { useEffect, useState } from "react";
import SignIn from "./pages/SignIn";

function App() {
  const [data, setData] = useState({ results: [] });
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/discover/movie?api_key=f2aacbaffec6c04e80ab5fdf983b982d"
    )
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        setData(data);
      });
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                movie={data.results}
                isLogged={isLogged}
                setIsLogged={setIsLogged}
              />
            }
          />
          <Route path="/category" element={<Category />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/sign-in"
            element={<SignIn isLogged={isLogged} setIsLogged={setIsLogged} />}
          />
          {/* addfavorite */}
          <Route path="/movie/:id" element={<MoviePresentation />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
