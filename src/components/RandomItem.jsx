import { useEffect, useState } from "react";
import { randomLetter, randomNumber } from "../utils/random";
import ItemCard from "./ItemCard";
import axios from "axios";
import { server } from "../App";

const RandomItem = ({ token, favorites, setFavorites, itemType }) => {
  const [item, setItem] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setItem(await handleRandom());
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const handleRandom = async () => {
    const letter = randomLetter();
    const body = itemType === "comic" ? { title: letter } : { name: letter };
    try {
      const { data } = await axios.post(
        `${server[server.current]}/${itemType}s`,
        body
      );
      return data.results[randomNumber(data.count < 100 ? data.count : 99)];
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className={"random-" + itemType}>
      {isLoading ? (
        <p>Loading data...</p>
      ) : (
        <div>
          <h2>Do you know this {itemType} ?</h2>
          <button onClick={async () => setItem(await handleRandom())}>
            🔄
          </button>
          <ItemCard
            itemType={itemType}
            token={token}
            favorites={favorites}
            setFavorites={setFavorites}
            {...item}
          />
        </div>
      )}
    </div>
  );
};

export default RandomItem;
