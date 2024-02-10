import ComicCard from "../components/ComicCard";
import axios from "axios";
import { useState, useEffect } from "react";
import PageNavigation from "../components/PageNavigation";

const ComicsListPage = ({ favorites, setFavorites }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const body = { page: currentPage };
        const { data } = await axios.post("http://localhost:3000/comics", body);
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
            {data.results.map((comic) => (
              <ComicCard
                key={comic._id}
                {...comic}
                isInFavorites={favorites.comics.includes(comic._id)}
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

export default ComicsListPage;
