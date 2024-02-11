import RandomItem from "../components/RandomItem";
import CharactersListPage from "./CharactersListPage";
import FavoritesPage from "./FavoritesPage";

const HomePage = ({ token, favorites, setFavorites }) => {
  return (
    <div className="home-page">
      <h1>Welcome to the fantastic world of Marvel!</h1>
      <RandomItem
        itemType="character"
        token={token}
        favorites={favorites}
        setFavorites={setFavorites}
      />
      <RandomItem
        itemType="comic"
        token={token}
        favorites={favorites}
        setFavorites={setFavorites}
      />
      {token && (
        <FavoritesPage
          token={token}
          favorites={favorites}
          setFavorites={setFavorites}
        />
      )}
    </div>
  );
};

export default HomePage;
