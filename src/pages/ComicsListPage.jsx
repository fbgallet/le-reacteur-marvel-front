import ItemsList from "../components/ItemsList";

const ComicsListPage = ({ favorites, setFavorites, token }) => {
  return (
    <main>
      <ItemsList
        itemType="comic"
        favorites={favorites}
        setFavorites={setFavorites}
        token={token}
      />
    </main>
  );
};

export default ComicsListPage;
