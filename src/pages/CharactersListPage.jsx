import ItemsList from "../components/ItemsList";

const CharactersListPage = ({ favorites, setFavorites, token }) => {
  return (
    <ItemsList
      itemType="character"
      favorites={favorites}
      setFavorites={setFavorites}
      token={token}
    />
  );
};

export default CharactersListPage;
