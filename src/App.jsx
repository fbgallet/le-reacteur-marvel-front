import "./css/App.scss";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";

import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import ComicPage from "./pages/ComicPage";
import CharacterPage from "./pages/CharacterPage";
import CharactersListPage from "./pages/CharactersListPage";
import ComicsListPage from "./pages/ComicsListPage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";

export const server = {
  distant: "https://site--marvel-back--2bhrm4wg9nqn.code.run",
  local: "http://localhost:3000",
  current: "distant",
};

function App() {
  const [token, setToken] = useState(Cookies.get("userToken" || ""));
  const [favorites, setFavorites] = useState({ characters: [], comics: [] });
  const [activeSection, setActiveSection] = useState("Home");

  return (
    <Router>
      <Header
        token={token}
        setToken={setToken}
        setFavorites={setFavorites}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <Routes>
        <Route
          path="/signup"
          element={<Signup setToken={setToken} setFavorites={setFavorites} />}
        />
        <Route
          path="/login"
          element={<Login setToken={setToken} setFavorites={setFavorites} />}
        />
        <Route
          path="/"
          element={
            <HomePage
              token={token}
              favorites={favorites}
              setFavorites={setFavorites}
            />
          }
        />
        <Route
          path="/characters"
          element={
            <CharactersListPage
              favorites={favorites}
              setFavorites={setFavorites}
              token={token}
            />
          }
        />
        <Route
          path="/comics"
          element={
            <ComicsListPage
              favorites={favorites}
              setFavorites={setFavorites}
              token={token}
            />
          }
        />
        <Route
          path="/comic/:comicId"
          element={
            <ComicPage
              token={token}
              setToken={setToken}
              favorites={favorites}
              setFavorites={setFavorites}
              activeSection={activeSection}
              setActiveSection={setActiveSection}
            />
          }
        />
        <Route
          path="/character/:characterId"
          element={
            <CharacterPage
              token={token}
              setToken={setToken}
              favorites={favorites}
              setFavorites={setFavorites}
              activeSection={activeSection}
              setActiveSection={setActiveSection}
            />
          }
        />
        <Route
          path="/favorites"
          element={
            <FavoritesPage
              token={token}
              setToken={setToken}
              favorites={favorites}
              setFavorites={setFavorites}
              activeSection={activeSection}
              setActiveSection={setActiveSection}
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
