import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import FormatedImage from "../components/FormatedImage";
import { server } from "../App";
import FavoriteButton from "../components/FavoriteButton";

const ComicPage = ({ token, favorites, setFavorites, setActiveSection }) => {
  const { comicId } = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(
    favorites.comics.includes(comicId)
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log("comicId :>> ", comicId);
        const { data } = await axios.get(
          `${server[server.current]}/comic/${comicId}`
        );
        // console.log("response :>> ", data);
        setData(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
    setActiveSection("Comics");
  }, []);

  return isLoading ? (
    <>Is loading...</>
  ) : (
    <main className="comic-page">
      <div className="container">
        <div className="comic-detail">
          <h2>{data.title}</h2>
          <FormatedImage thumbnail={data.thumbnail} format="portrait_uncanny" />
          <p>{data.description}</p>
          <FavoriteButton
            token={token}
            isFavorite={isFavorite}
            setIsFavorite={setIsFavorite}
            setFavorites={setFavorites}
            id={data._id}
            itemType={"comic"}
          />
        </div>
      </div>
    </main>
  );
};

export default ComicPage;
