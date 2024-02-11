import axios from "axios";
import { useState, useEffect } from "react";
import ItemCard from "../components/ItemCard";
import { server } from "../App";

const FavoritesPage = ({ favorites, setFavorites }) => {
  const [characters, setCharacters] = useState([]);
  const [comics, setComics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // console.log("favorites :>> ", favorites);
    const fetchData = async () => {
      try {
        let favoritesCharacters = favorites.characters.length
          ? await Promise.all(
              favorites.characters.map(async (id) => {
                const response = await axios.get(
                  `${server[server.current]}/character/${id}`
                );
                // console.log(response.data); // unordered
                return response.data;
              })
            )
          : [];
        let favoritesComics = favorites.comics.length
          ? await Promise.all(
              favorites.comics.map(async (id) => {
                const response = await axios.get(
                  `${server[server.current]}/comic/${id}`
                );
                // console.log(response.data); // unordered
                return response.data;
              })
            )
          : [];
        setCharacters(favoritesCharacters);
        setComics(favoritesComics);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="favorites-page">
      <div className="favorites-characters">
        <h2>Your favorites Characters</h2>
        {characters.length === 0 ? (
          <p>None at the moment...</p>
        ) : (
          <div className="favorites-list">
            {characters.map((character) => (
              <ItemCard
                itemType="character"
                key={character._id}
                {...character}
                isInFavorites={true}
                setFavorites={setFavorites}
              />
            ))}
          </div>
        )}
      </div>
      <div className="favorites-comics">
        <h2>Your favorites Comics</h2>
        {comics.length === 0 ? (
          <p>None at the moment...</p>
        ) : (
          <div className="favorites-list">
            {comics.map((comic) => (
              <ItemCard
                itemType="comic"
                key={comic._id}
                {...comic}
                isInFavorites={true}
                setFavorites={setFavorites}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
