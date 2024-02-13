import { useNavigate } from "react-router-dom";
import FormatedImage from "./FormatedImage";
import FavoriteButton from "./FavoriteButton";
import { useState } from "react";

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
  const defaultRatio = "xlarge";

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
      <FavoriteButton
        isFavorite={isFavorite}
        setIsFavorite={setIsFavorite}
        setFavorites={setFavorites}
        id={_id}
        itemType={itemType}
        token={token}
      />
    </div>
  );
};

export default ItemCard;
