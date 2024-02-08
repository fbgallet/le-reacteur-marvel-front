import { useNavigate } from "react-router-dom";
import FormatedImage from "./FormatedImage";
import FavoriteButton from "./FavoriteButton";
import { useEffect, useRef, useState } from "react";

const CharacterCard = ({
  _id,
  name,
  description,
  thumbnail,
  comics,
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
      if (isFavorite) prevClone.characters.push(_id);
      else {
        const favIndex = prevClone.characters.indexOf(_id);
        prevClone.characters.splice(favIndex, 1);
      }
      return prevClone;
    });
  }, [isFavorite]);

  const handleClick = () => {
    navigate(`/character/${_id}`, { state: {} });
  };

  return (
    <div className="character-card" onClick={handleClick}>
      <FormatedImage thumbnail={thumbnail} format="portrait_medium" />
      <h3>{name}</h3>
      <div>{description}</div>
      <FavoriteButton isFavorite={isFavorite} setIsFavorite={setIsFavorite} />
    </div>
  );
};

export default CharacterCard;
