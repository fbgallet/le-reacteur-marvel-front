import ComicCard from "../components/ComicCard";
import axios from "axios";
import { useState, useEffect } from "react";
import CharacterCard from "../components/CharacterCard";

const CharactersListPage = () => {
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
        data.results.map((comic) => (
          <CharacterCard key={comic._id} {...comic} />
        ))
      )}
    </main>
  );
};

export default CharactersListPage;
