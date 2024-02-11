import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import FormatedImage from "../components/FormatedImage";
import ComicCard from "../components/ItemCard";
import ItemCard from "../components/ItemCard";
import { server } from "../App";

const CharacterPage = () => {
  const { characterId } = useParams();
  const [data, setData] = useState(null);
  const [comicsList, setComicsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingComics, setIsLoadingComics] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("characterId :>> ", characterId);
        const { data } = await axios.get(
          `${server[server.current]}/character/${characterId}`
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

  useEffect(() => {
    if (isLoading) return;
    const fetchComics = async () => {
      if (!data) return;
      try {
        let comics = await Promise.all(
          data.comics.map(async (comicId) => {
            const response = await axios.get(
              `http://localhost:3000/comic/${comicId}`
            );
            console.log(response.data); // unordered
            return response.data;
          })
        );
        console.log("response :>> ", comics);
        setComicsList(comics);
        setIsLoadingComics(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchComics();
  }, [isLoading]);

  return isLoading ? (
    <>Is loading...</>
  ) : (
    <main className="character-page">
      <div className="character-details">
        <h2>{data.name}</h2>
        <FormatedImage thumbnail={data.thumbnail} format="portrait_uncanny" />
        <p>{data.description}</p>
      </div>
      <div>
        <h3>Featuring in:</h3>
        {isLoadingComics ? (
          <>Is loading...</>
        ) : (
          <div className="character-comics-list">
            {comicsList.map((comic) => (
              <ItemCard
                itemType={comic}
                key={comic._id}
                _id={comic._id}
                title={comic.title}
                thumbnail={comic.thumbnail}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default CharacterPage;
