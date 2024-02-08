import { useNavigate } from "react-router-dom";
import FormatedImage from "./FormatedImage";

const ComicCard = ({ _id, title, description, thumbnail }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/comic/${_id}`);
  };

  return (
    <div className="comic-card" onClick={handleClick}>
      <FormatedImage thumbnail={thumbnail} format="portrait_medium" />
      <h3>{title}</h3>
      <div>{description}</div>
    </div>
  );
};

export default ComicCard;
