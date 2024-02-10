import axios from "axios";
import { useState, useEffect } from "react";
import CharacterCard from "../components/CharacterCard";
import PageNavigation from "../components/PageNavigation";

const CharactersListPage = ({ favorites, setFavorites }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const body = { page: currentPage };
        const { data } = await axios.post(
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
  }, [currentPage]);

  return (
    <main>
      {isLoading ? (
        <div>"Data loading..."</div>
      ) : (
        <>
          <PageNavigation
            count={data.count}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          <div className="comics-list">
            {data.results.map((character) => (
              <CharacterCard
                key={character._id}
                {...character}
                isInFavorites={favorites.characters.includes(character._id)}
                setFavorites={setFavorites}
              />
            ))}
          </div>
          <PageNavigation
            count={data.count}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </main>
  );
};

export default CharactersListPage;
