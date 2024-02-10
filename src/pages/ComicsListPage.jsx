import ItemsList from "../components/ItemsList";

const ComicsListPage = ({ favorites, setFavorites, token }) => {
  return (
    <ItemsList
      itemType="comic"
      favorites={favorites}
      setFavorites={setFavorites}
      token={token}
    />
  );
};

export default ComicsListPage;
