import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import ComicPage from "./pages/ComicPage";
import CharacterPage from "./pages/CharacterPage";
import CharactersListPage from "./pages/CharactersListPage";
import ComicsListPage from "./pages/ComicsListPage";
import { useState } from "react";

function App() {
  const [favorites, setFavorites] = useState({ characters: [], comics: [] });

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/characters"
          element={
            <CharactersListPage
              favorites={favorites}
              setFavorites={setFavorites}
            />
          }
        />
        <Route
          path="/comics"
          element={
            <ComicsListPage favorites={favorites} setFavorites={setFavorites} />
          }
        />
        <Route
          path="/comic/:comicId"
          element={
            <ComicPage favorites={favorites} setFavorites={setFavorites} />
          }
        />
        <Route
          path="/character/:characterId"
          element={
            <CharacterPage favorites={favorites} setFavorites={setFavorites} />
          }
        />
        <Route
          path="/favorites"
          element={
            <FavoritesPage favorites={favorites} setFavorites={setFavorites} />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
