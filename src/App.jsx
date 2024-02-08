import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import CharactersPage from "./pages/CharactersPage";
import ComicsPage from "./pages/ComicsPage";
import FavoritesPage from "./pages/FavoritesPage";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/characters" element={<CharactersPage />} />
        <Route path="/comics" element={<ComicsPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
