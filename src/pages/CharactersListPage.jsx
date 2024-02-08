import axios from "axios";
import { useState, useEffect } from "react";
import CharacterCard from "../components/CharacterCard";

const CharactersListPage = ({ favorites, setFavorites }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const body = {};
        const { data } = await axios.get(
          "http://localhost:3000/characters",
          body
        );
        console.log("response :>> ", data);
        setData(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  return (
    <main>
      {isLoading ? (
        <div>"Data loading..."</div>
      ) : (
        data.results.map((character) => (
          <CharacterCard
            key={character._id}
            {...character}
            isInFavorites={favorites.characters.includes(character._id)}
            setFavorites={setFavorites}
          />
        ))
      )}
    </main>
  );
};

export default CharactersListPage;
