import { useNavigate } from "react-router-dom";
import FormatedImage from "./FormatedImage";
import FavoriteButton from "./FavoriteButton";
import { useEffect, useRef, useState } from "react";
import getUpdatedFavorites from "../utils/favorites";

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
  ratio,
}) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(isInFavorites);
  const isFirstRender = useRef(true);
  const defaultRatio = "xlarge";

  useEffect(() => {
    // Empêcher l'appel de SetFavorites au premier render (qui réinitialiserait les favoris)
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setFavorites((prev) =>
      getUpdatedFavorites(prev, _id, itemType, isFavorite, token)
    );
  }, [isFavorite]);

  const handleClick = () => {
    navigate(`/${itemType}/${_id}`);
  };

  return (
    <div className={itemType + "-card"} onClick={handleClick}>
      <h3>{itemType === "comic" ? title : name}</h3>
      {description && <div className="description">{description}</div>}
      <FormatedImage
        thumbnail={thumbnail}
        format={`standard_${ratio || defaultRatio}`}
      />
      <FavoriteButton isFavorite={isFavorite} setIsFavorite={setIsFavorite} />
    </div>
  );
};

export default ItemCard;
