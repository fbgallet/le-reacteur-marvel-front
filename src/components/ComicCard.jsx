const ComicCard = ({ _id, title, description, thumbnail }) => {
  const { path, extension } = thumbnail;
  const format = "portrait_medium";

  return (
    <div className="comic-card">
      <div>{title}</div>
      <div>{description}</div>
      <div>
        <img src={path + "/" + format + "." + extension} alt="cover" />
      </div>
    </div>
  );
};

export default ComicCard;
