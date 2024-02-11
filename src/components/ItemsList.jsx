import axios from "axios";
import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import PageNavigation from "./PageNavigation";
import ItemCard from "./ItemCard";
import { server } from "../App";

const ItemsList = ({ itemType, favorites, setFavorites, token }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let body = { page: currentPage };
        itemType === "character"
          ? (body.name = searchString)
          : (body.title = searchString);
        const { data } = await axios.post(
          `${server[server.current]}/${itemType}s`,
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
  }, [currentPage, searchString]);

  return (
    <main>
      <SearchBar
        itemType={itemType}
        searchString={searchString}
        setSearchString={setSearchString}
        namesList={data?.results || []}
        setIsLoading={setIsLoading}
      />
      {isLoading ? (
        <div className="loading-msg">Data loading...</div>
      ) : (
        <>
          <PageNavigation
            count={data.count}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          <div className={itemType + "s-list"}>
            {data.results.map((item) => (
              <ItemCard
                itemType={itemType}
                key={item._id}
                {...item}
                isInFavorites={favorites[itemType + "s"].includes(item._id)}
                setFavorites={setFavorites}
                token={token}
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

export default ItemsList;
