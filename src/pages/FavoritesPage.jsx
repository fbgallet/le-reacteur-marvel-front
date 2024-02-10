import ComicCard from "../components/ItemCard";
import axios from "axios";
import { useState, useEffect } from "react";
import CharacterCard from "../components/CharacterCard";

const FavoritesPage = ({ favorites, setFavorites }) => {
  const [characters, setCharacters] = useState([]);
  const [comics, setComics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("favorites :>> ", favorites);
    const fetchData = async () => {
      try {
        let favoritesCharacters = favorites.characters.length
          ? await Promise.all(
              favorites.characters.map(async (id) => {
                const response = await axios.get(
                  `http://localhost:3000/character/${id}`
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
                  `http://localhost:3000/comic/${id}`
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
        <h2>Vos personnages favoris</h2>
        {characters.length === 0 ? (
          <p>Aucun pour le moment...</p>
        ) : (
          <div className="favorites-list">
            {characters.map((character) => (
              <CharacterCard
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
        <h2>Vos comics favoris</h2>
        {comics.length === 0 ? (
          <p>Aucun pour le moment...</p>
        ) : (
          <div className="favorites-list">
            {comics.map((comic) => (
              <ComicCard
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
