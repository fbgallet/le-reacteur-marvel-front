import RandomItem from "../components/RandomItem";
import FavoritesPage from "./FavoritesPage";
import heroCharacter from "../assets/img/red-hero.png";
import heroComic from "../assets/img/Newtomu.jpg";

const HomePage = ({ token, favorites, setFavorites }) => {
  return (
    <main className="home-page">
      <div className="container">
        {/* <h1>Welcome to the fantastic world of Marvel!</h1> */}
        <div className="hero-character">
          <img src={heroCharacter} alt="" />
          <RandomItem
            itemType="character"
            token={token}
            favorites={favorites}
            setFavorites={setFavorites}
            position="right"
          />
        </div>
        <div className="hero-comic">
          <img src={heroComic} alt="" />
          <RandomItem
            itemType="comic"
            token={token}
            favorites={favorites}
            setFavorites={setFavorites}
            position="left"
          />
        </div>
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
