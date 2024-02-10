import ItemsList from "../components/ItemsList";

const ComicsListPage = ({ favorites, setFavorites }) => {
  return (
    <ItemsList
      itemType="comic"
      favorites={favorites}
      setFavorites={setFavorites}
    />
  );
};

export default ComicsListPage;
