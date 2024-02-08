import ComicCard from "../components/ComicCard";
import axios from "axios";
import { useState, useEffect } from "react";

const ComicsPage = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const body = {};
        const { data } = await axios.get("http://localhost:3000/comics", body);
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
        data.results.map((comic) => <ComicCard key={comic._id} {...comic} />)
      )}
    </main>
  );
};

export default ComicsPage;
