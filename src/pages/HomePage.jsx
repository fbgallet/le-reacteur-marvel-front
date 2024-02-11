import RandomItem from "../components/RandomItem";
import CharactersListPage from "./CharactersListPage";
import FavoritesPage from "./FavoritesPage";

const HomePage = ({ token, favorites, setFavorites }) => {
  return (
    <main className="home-page">
      <div className="container">
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
    </main>
  );
};

export default HomePage;
