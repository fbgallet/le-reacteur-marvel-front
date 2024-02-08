import { useNavigate } from "react-router-dom";
import FormatedImage from "./FormatedImage";
import FavoriteButton from "./FavoriteButton";
import { useEffect, useRef, useState } from "react";

const ComicCard = ({
  _id,
  title,
  description,
  thumbnail,
  isInFavorites,
  setFavorites,
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
      if (isFavorite) prevClone.comics.push(_id);
      else {
        const favIndex = prevClone.comics.indexOf(_id);
        prevClone.comics.splice(favIndex, 1);
      }
      return prevClone;
    });
  }, [isFavorite]);

  const handleClick = () => {
    navigate(`/comic/${_id}`);
  };

  return (
    <div className="comic-card" onClick={handleClick}>
      <FormatedImage thumbnail={thumbnail} format="portrait_medium" />
      <h3>{title}</h3>
      {description && <div>{description}</div>}
      <FavoriteButton isFavorite={isFavorite} setIsFavorite={setIsFavorite} />
    </div>
  );
};

export default ComicCard;
