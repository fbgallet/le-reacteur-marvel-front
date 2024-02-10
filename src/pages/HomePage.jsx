import CharactersListPage from "./CharactersListPage";
import FavoritesPage from "./FavoritesPage";

const HomePage = ({ token, favorites, setFavorites }) => {
  return (
    <div className="home-page">
      <h1>Welcome to the fantastic world of Marvel!</h1>
      {token ? (
        <FavoritesPage
          token={token}
          favorites={favorites}
          setFavorites={setFavorites}
        />
      ) : (
        <CharactersListPage favorites={favorites} setFavorites={setFavorites} />
      )}
    </div>
  );
};

export default HomePage;
