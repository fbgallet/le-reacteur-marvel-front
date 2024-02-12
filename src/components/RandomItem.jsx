import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShuffle } from "@fortawesome/free-solid-svg-icons";
import { randomLetter, randomNumber } from "../utils/random";
import ItemCard from "./ItemCard";
import axios from "axios";
import { server } from "../App";

const RandomItem = ({ token, favorites, setFavorites, itemType, position }) => {
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
      let path = "";
      let randomItem;
      let requestNb = 0;
      while (
        requestNb < 10 &&
        (!path || path.includes("image_not_available"))
      ) {
        const { data } = await axios.post(
          `${server[server.current]}/${itemType}s`,
          body
        );
        randomItem =
          data.results[randomNumber(data.count < 100 ? data.count : 99)];
        path = randomItem.thumbnail.path;
        requestNb++;
      }
      return randomItem;
    } catch (error) {
      console.log("Error!", error.response);
    }
  };

  const jsxQuestion = () => {
    return (
      <div>
        <h2>Do you know this {itemType} ?</h2>
        <div
          onClick={async () => {
            setIsLoading(true);
            setItem(await handleRandom());
            setIsLoading(false);
          }}
        >
          <FontAwesomeIcon icon={faShuffle} className="icon" size="lg" />
          Discover another {itemType}
        </div>
      </div>
    );
  };

  return (
    <div className={"random-" + itemType}>
      <div>
        {position === "right" && jsxQuestion()}
        {isLoading ? (
          <div className="comic-card">Loading {itemType}...</div>
        ) : (
          <ItemCard
            itemType={itemType}
            token={token}
            favorites={favorites}
            setFavorites={setFavorites}
            {...item}
            ratio="fantastic"
            position="before"
          />
        )}
        {position === "left" && jsxQuestion()}
      </div>
    </div>
  );
};

export default RandomItem;
