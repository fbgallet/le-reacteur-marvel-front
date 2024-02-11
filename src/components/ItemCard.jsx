import { useNavigate } from "react-router-dom";
import FormatedImage from "./FormatedImage";
import FavoriteButton from "./FavoriteButton";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { server } from "../App";

const ItemCard = ({
  itemType,
  _id,
  name,
  title,
  description,
  thumbnail,
  isInFavorites,
  setFavorites,
  token,
}) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(isInFavorites);
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Empêcher l'appel de SetFavorites au premier render (qui réinitialiserait les favoris)
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setFavorites((prev) => {
      const prevClone = { ...prev };
      if (isFavorite) {
        prevClone[itemType + "s"].push(_id);
        updateFavoritesInDb("add");
      } else {
        const favIndex = prevClone[itemType + "s"].indexOf(_id);
        prevClone[itemType + "s"].splice(favIndex, 1);
        updateFavoritesInDb("remove");
      }
      return prevClone;
    });
  }, [isFavorite]);

  const handleClick = () => {
    navigate(`/${itemType}/${_id}`);
  };

  const updateFavoritesInDb = (action) => {
    if (token)
      try {
        axios.post(`${server[server.current]}/user/favorite`, {
          token: token,
          type: itemType,
          id: _id,
          action: action,
        });
      } catch (error) {
        console.log(error.response);
      }
  };

  return (
    <div className={itemType + "-card"} onClick={handleClick}>
      <h3>{itemType === "comic" ? title : name}</h3>
      {description && <div className="description">{description}</div>}
      <FormatedImage thumbnail={thumbnail} format="standard_xlarge" />
      <FavoriteButton isFavorite={isFavorite} setIsFavorite={setIsFavorite} />
    </div>
  );
};

export default ItemCard;
