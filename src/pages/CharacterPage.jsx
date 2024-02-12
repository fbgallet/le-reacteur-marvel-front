import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import FormatedImage from "../components/FormatedImage";
import ItemCard from "../components/ItemCard";
import { server } from "../App";
import FavoriteButton from "../components/FavoriteButton";
import { getUpdatedFavorites } from "../utils/favorites";

const CharacterPage = ({
  token,
  favorites,
  setFavorites,
  setActiveSection,
}) => {
  const { characterId } = useParams();
  const [data, setData] = useState(null);
  const [comicsList, setComicsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingComics, setIsLoadingComics] = useState(true);
  const [isFavorite, setIsFavorite] = useState(
    favorites.characters.includes(characterId)
  );

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
    setActiveSection("Characters");
  }, []);

  useEffect(() => {
    if (isLoading) return;
    const fetchComics = async () => {
      try {
        if (data.comics?.length) {
          let comics = await Promise.all(
            data.comics.map(async (comicId) => {
              const response = await axios.get(
                `${server[server.current]}/comic/${comicId}`
              );
              console.log(response.data); // unordered
              return response.data;
            })
          );
          console.log("response :>> ", comics);
          setComicsList(comics);
        }
        setIsLoadingComics(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchComics();
  }, [isLoading]);

  useEffect(() => {
    setFavorites((prev) =>
      getUpdatedFavorites(prev, characterId, "character", isFavorite, token)
    );
  }, [isFavorite]);

  return isLoading ? (
    <>Is loading...</>
  ) : (
    <main className="character-page">
      <div className="container">
        <div className="character-detail">
          <h2>{data.name}</h2>
          <FormatedImage thumbnail={data.thumbnail} format="portrait_uncanny" />
          <p>{data.description}</p>
          <FavoriteButton
            token={token}
            isFavorite={isFavorite}
            setIsFavorite={setIsFavorite}
          />
        </div>
        <div>
          {isLoadingComics ? (
            <>Is loading...</>
          ) : (
            comicsList.length > 0 && (
              <>
                <h2>{data.name} appears in the following comics:</h2>
                <div className="character-comics-list">
                  {comicsList.map((comic) => (
                    <ItemCard
                      itemType="comic"
                      key={comic._id}
                      {...comic}
                      isInFavorites={favorites["comics"].includes(comic._id)}
                      setFavorites={setFavorites}
                      token={token}
                    />
                  ))}
                </div>
              </>
            )
          )}
        </div>
      </div>
    </main>
  );
};

export default CharacterPage;
