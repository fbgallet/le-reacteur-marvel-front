import axios from "axios";
import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import PageNavigation from "./PageNavigation";
import ItemCard from "./ItemCard";
import { server } from "../App";
import { getFavoritesFromDd } from "../utils/favorites";

const ItemsList = ({ itemType, favorites, setFavorites, token }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    const getFavorites = async () => {
      const distantFavorites = await getFavoritesFromDd(token);
      setFavorites(distantFavorites);
    };
    if (token && !favorites.comics?.length && !favorites.characters?.length)
      getFavorites();
  }, []);

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
    <div className="container">
      <SearchBar
        itemType={itemType}
        searchString={searchString}
        setSearchString={setSearchString}
        data={data}
        isLoading={isLoading}
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
    </div>
  );
};

export default ItemsList;
