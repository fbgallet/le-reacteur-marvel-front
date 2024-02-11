import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import FormatedImage from "../components/FormatedImage";
import { server } from "../App";

const ComicPage = () => {
  const { comicId } = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("comicId :>> ", comicId);
        const { data } = await axios.get(
          `${server[server.current]}/comic/${comicId}`
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

  return isLoading ? (
    <>Is loading...</>
  ) : (
    <div className="comic-page">
      <h2>{data.title}</h2>
      <FormatedImage thumbnail={data.thumbnail} format="portrait_uncanny" />
      <p>{data.description}</p>
    </div>
  );
};

export default ComicPage;
