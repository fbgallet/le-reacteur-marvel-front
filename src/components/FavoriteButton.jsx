import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";

const FavoriteButton = ({ isFavorite, setIsFavorite }) => {
  const handleClick = (e) => {
    e.stopPropagation();
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
