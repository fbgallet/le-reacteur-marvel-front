import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import FormatedImage from "../components/FormatedImage";
import ComicCard from "../components/ComicCard";

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
          `http://localhost:3000/character/${characterId}`
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
  });

  return isLoading ? (
    <>Is loading...</>
  ) : (
    <div className="character-page">
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
              <ComicCard
                key={comic._id}
                _id={comic._id}
                title={comic.title}
                thumbnail={comic.thumbnail}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CharacterPage;
