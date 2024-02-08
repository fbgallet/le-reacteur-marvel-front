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

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/characters" element={<CharactersListPage />} />
        <Route path="/comics" element={<ComicsListPage />} />
        <Route path="/comic/:comicId" element={<ComicPage />} />
        <Route path="/character/:characterId" element={<CharacterPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
