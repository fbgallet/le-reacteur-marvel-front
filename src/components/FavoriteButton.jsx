import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { getUpdatedFavorites } from "../utils/favorites";

const FavoriteButton = ({
  isFavorite,
  setIsFavorite,
  setFavorites,
  id,
  itemType,
  token,
}) => {
  const handleClick = (e) => {
    e.stopPropagation();
    setFavorites((prev) =>
      getUpdatedFavorites(prev, id, itemType, !isFavorite, token)
    );
    setIsFavorite((prev) => !prev);
  };

  return (
    <div className="favorite-button" onClick={handleClick}>
      {isFavorite ? (
        <FontAwesomeIcon icon={faHeartSolid} />
      ) : (
        <FontAwesomeIcon className="not-favorite" icon={faHeartRegular} />
      )}
    </div>
  );
};

export default FavoriteButton;
